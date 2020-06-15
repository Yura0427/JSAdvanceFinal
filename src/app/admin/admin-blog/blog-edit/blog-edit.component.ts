import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/shared/services/blog.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {

  data: any;
  title:string
  description:string
  text:string

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getData()
  }

  getData(): void {
    const key = this.route.snapshot.paramMap.get('key');
    this.blogService.usersRef.doc(key).valueChanges().subscribe(
      data => {
        this.data = data
        this.title= this.data.title
        this.description= this.data.description
        this.text= this.data.text
        console.log(data)
      })
    console.log(key)
  }

  save() {
    const key = this.route.snapshot.paramMap.get('key');
    console.log(key)
    this.blogService.updateBlog(key, {
      title:this.title,
      description:this.description,
      text:this.text,
    })
  }

  back(): void {
    this.location.back();
  }
}
