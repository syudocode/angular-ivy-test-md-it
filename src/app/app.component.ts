import { Component, VERSION } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

import MarkdownIt from 'markdown-it';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  result;

  // mdIt = new MarkdownIt();
  // result = mdIt.render('# markdown-it rulezz!');

  ngOnInit(): void {
    const mdIt = new MarkdownIt();
    // const renderedMd = ;
    // result = this.sanitized.bypassSecurityTrustHtml(value);
    const renderedMd = mdIt.render('# markdown-it rulezz!');
    console.log(renderedMd);
    this.result = renderedMd as SafeHtml;
  }
}
