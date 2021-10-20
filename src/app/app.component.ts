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

  ngOnInit(): void {
    const sampleMarkdown = `## markdown-it rulezz!

::: tip
This is a test tip
:::

::: alert-note
This is another test alert-note
:::

::: note
This is another test note
:::

::: note this is a custom title
This is another test note
:::
    `;

    const mdIt = new MarkdownIt();
    mdIt.use(MardkwonItContainer, 'tip');
    mdIt.use(MardkwonItContainer, 'alert-note');
    mdIt.use(MardkwonItContainer, 'note', {
      validate: function (params) {
        const regexthing = params.trim().match(new RegExp(/^note/));
        const regexthing2 = params.trim().match(new RegExp(/^note\s+(.*)$/));
        return regexthing2?.length > 0 ? regexthing2 : regexthing;
      },

      render: function (tokens, idx) {
        const regexthing = new RegExp(/^note/);
        const regexthing2 = new RegExp(/^note\s+(.*)$/);

        let m = tokens[idx].info.trim().match(regexthing);
        let m2 = tokens[idx].info.trim().match(regexthing2);

        if (tokens[idx].nesting === 1) {
          let test = m2?.length > 0 ? m2[1] : m;
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
    this.result = renderedMd as SafeHtml;
    // console.log(renderedMd);
    // should be:
    // <h1>markdown-it rulezz!</h1>
    // <div class="tip">
    // <p>This is a test tip</p>
    // </div>
    // <div class="alert-note">
    // <p>This is another test alert-note</p>
    // </div>
    // <details><summary>note</summary>
    // <p>This is another test note</p>
    // </details>
    // <details><summary>this is a custom title</summary>
    // <p>This is another test note</p>
    // </details>
  }
}
