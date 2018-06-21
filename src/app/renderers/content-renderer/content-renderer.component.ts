import { Component, OnInit, Input } from '@angular/core';

@Component({
  /* tslint:disable */
  selector: 'content-renderer',
  /* tslint:enable */
  templateUrl: './content-renderer.component.html',
  styleUrls: ['./content-renderer.component.scss']
})
export class ContentRendererComponent implements OnInit {

  @Input() description: string;

  constructor() { }

  ngOnInit() {
  }

}
