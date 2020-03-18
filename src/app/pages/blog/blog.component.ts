import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
}
