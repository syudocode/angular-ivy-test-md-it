import { Component, VERSION } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

import MarkdownIt from 'markdown-it';
import MardkwonItContainer from 'markdown-it-container';

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
    const sampleMarkdown = `# markdown-it rulezz!

::: spoiler Click Here
This is a test note
:::

::: tip text
This is another test note
:::
    
    `;

    const mdIt = new MarkdownIt();
    // const renderedMd = ;
    // result = this.sanitized.bypassSecurityTrustHtml(value);
    mdIt.use(MardkwonItContainer, 'tip');
    mdIt.use(MardkwonItContainer, 'spoiler', {
      validate: function (params) {
        const theregex = new RegExp(/^spoiler\s+(.*)$/);
        const regexthing = params.trim().match(theregex);
        console.log('regexthing', regexthing);
        return regexthing;
      },

      render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);
        console.log('m', m);
        if (tokens[idx].nesting === 1) {
          // opening tag
          return (
            '<details><summary>' + mdIt.utils.escapeHtml(m[1]) + '</summary>\n'
          );
        } else {
          // closing tag
          return '</details>\n';
        }
      },
    });

    const renderedMd = mdIt.render(sampleMarkdown);
    console.log(renderedMd);
    this.result = renderedMd as SafeHtml;
  }
}
