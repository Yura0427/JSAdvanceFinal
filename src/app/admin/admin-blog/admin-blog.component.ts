import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from 'src/app/shared/services/blog.service';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {

  title: string;
  description: string;
  text: string;
  blogImage: string

  // Upload image variables
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  blogs: Array<any>;

  constructor(
    private modalService: NgbModal,
    private blogService: BlogService,
    private afStorage: AngularFireStorage, ) { }

  ngOnInit() {
    this.blogService.getBlogsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(blogs => {
      this.blogs = blogs;
    });
  }


  openXl(content) {
    this.modalService.open(content, { size: 'xl' });
  }

  crBlog() {
    this.blogService.createBlog({
      title: this.title,
      description: this.description,
      text: this.text,
      blogImage: this.blogImage,
      dateAdd: new Date(),
    })
    this.modalService.dismissAll()
  }

  editBlog(blog){
    console.log(blog)
  }
  
  public upload(event: any): void {
    const file = event.target.files[0];
    const filePath = `blogs/${this.createUUID()}.${file.type.split('/')[1]}`;
    this.task = this.afStorage.upload(filePath, file);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges()
      .pipe(finalize(() => this.downloadURL = this.afStorage.ref(filePath).getDownloadURL()))
      .subscribe();
    this.task.then((e) => {
      this.afStorage.ref(`blogs/${e.metadata.name}`).getDownloadURL().subscribe(data => {
        this.blogImage = data;
      });
    });
  }
  private createUUID(): string {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line:no-bitwise
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      // tslint:disable-next-line:no-bitwise
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
}
