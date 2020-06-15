import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/shared/services/blog.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-detals',
  templateUrl: './blog-detals.component.html',
  styleUrls: ['./blog-detals.component.scss']
})
export class BlogDetalsComponent implements OnInit {

  data: any;

  constructor(private route: ActivatedRoute,
    private blogService: BlogService, 
    private location: Location,) { }

  ngOnInit() {
    this.getData()
  }

  getData(): void {
    const key = this.route.snapshot.paramMap.get('key');
    this.blogService.usersRef.doc(key).valueChanges().subscribe(
      data => {
        this.data = data
        console.log(data)
      })
    console.log(key)
  }

  back(): void {
    this.location.back();
  }
}
