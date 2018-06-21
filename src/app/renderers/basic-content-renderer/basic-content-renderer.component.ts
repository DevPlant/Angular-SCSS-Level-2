import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-basic-content-renderer',
  templateUrl: './basic-content-renderer.component.html',
  styleUrls: ['./basic-content-renderer.component.scss']
})
export class BasicContentRendererComponent implements OnInit {

  @Input() rendererName: string;

  constructor() { }

  ngOnInit() {
  }

}
