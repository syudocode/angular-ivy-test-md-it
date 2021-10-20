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

::: alert-note
This is another test note
:::

::: note
This is another test note
:::

::: note text
This is another test note
:::
    
    `;

    const mdIt = new MarkdownIt();
    // const renderedMd = ;
    // result = this.sanitized.bypassSecurityTrustHtml(value);
    mdIt.use(MardkwonItContainer, 'tip');
    mdIt.use(MardkwonItContainer, 'alert-note');

    mdIt.use(MardkwonItContainer, 'note', {
      validate: function (params) {
        const regexthing = params.trim().match(new RegExp(/^note/));
        const regexthing2 = params.trim().match(new RegExp(/^note\s+(.*)/));

        console.log('regexthing2', regexthing2);
        console.log('regexthing length', regexthing2?.length > 0);

        return regexthing2?.length > 0 ? regexthing2 : regexthing;
      },

      render: function (tokens, idx) {
        const regexthing = new RegExp(/^note/);
        const regexthing2 = new RegExp(/^note\s+(.*)/);

        var m = tokens[idx].info.trim().match(regexthing);
        var m2 = tokens[idx].info.trim().match(regexthing2);

        // /^spoiler\s+(.*)$/
        // console.log('tokens', tokens[idx].nesting);
        console.log('m', m);
        console.log('m2', m2);

        if (tokens[idx].nesting === 1) {
          // console.log('nullcheckthing', nullcheckthing);
          // var test = !nullcheckthing ? m[1] : 'test2';
          // console.log('test', test);
          // opening tag
          console.log('m1', m[1]);
          var test = m2?.length > 0 ? m2[1] : m;
          return (
            '<details><summary>' + mdIt.utils.escapeHtml(test) + '</summary>\n'
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
