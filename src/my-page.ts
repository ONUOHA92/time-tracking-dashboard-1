import {
  html,
  LitElement,
  css
} from 'lit'
import {
  customElement,
  property
} from 'lit/decorators.js'

import './user-card';
import './report-card';

@customElement('my-page')
export class MyPage extends LitElement {
  static styles = css `
    .user {
      margin-bottom: 1.5rem;
      height: 100%;
      color: #fff;
      border-radius: 15px;
      background-color: #1C204B;
    }
    .user__top {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      border-radius: var(--radius);
      background-color: #5747EA;
    }
    .user__avatar {
      margin: 0;
      width: 78px;
      overflow: hidden;
      border-radius: 50%;
    }
    .user__avatar img {
      display: block;
      max-width: 100%;
      margin: 0;
      height: auto;
    }
    .text {
      font-size: 1rem;
      font-weight: 400;
      color: #BBC0FF;
    }  
    .user__name {
      // font-size: 2.6rem;
      font-size: 1.5rem;
      font-weight: 300;
    }
    .user__top {
      padding: 2rem;
    }
    .user__footer ul {
      padding: 1.5rem 0;
      display: flex;
      align-items: center;
      list-style: none;
    }
    button {
      background: transparent;
      border: 0;
    }
    .user__footer li {
      flex: 1 1 0px;
      text-align: center;
    }
    .user__footer li button {
      cursor: pointer;
      font-size: 1.125rem;
      color: var(--link);
      transition: color 400ms ease-in-out;
    }
    .user__footer li.active button,
    .user__footer li:hover button {
      color: var(--white);
    }

    .container {
      margin: 1.5rem;
    }
    @media only screen and (min-width: 720px) {
      .container {
        display: grid;
        grid-template-columns: 2fr 10fr;
        grid-template-rows: auto;
        gap: 2rem;
        max-width: 1110px;
      }
      .user {
        width: 255px;
        margin-bottom: 0;
      }
      .user__top {
        display: block;
      }
      .user__name {
        font-size: 2.6rem;
      }
      .user__intro {
        margin-top: 2.5rem;
      }
      .user__footer ul {
        padding: 1.875rem;
        flex-direction: column;
        align-items: baseline;
      }
      .user__footer li:not(:first-child) {
        margin-top: 1.25rem;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._fetchData();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  @property({type: Array})
  data: string[] = [];

  @property({type: Object})
  user = {
    name: "Jeremy Robson",
    image_src: "image-jeremy.png"
  }
  short: string = "test";
  
  @property({
    hasChanged(newVal: string, oldVal: string) {
      const hasChanged: boolean = newVal !== oldVal;
      return hasChanged;
    }
  })
  timeframe: string = "daily";

  timesframes: Object[] = [
    { text: 'Daily' },
    { text: 'Weekly' },
    { text: 'Monthly' }
  ];

  _fetchData = (url: string = "../data.json") => {
    fetch(url)
      .then((response: any) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        };
        return response.json();
      })
      .then((arr: string[]) => {
        this.data = arr;
        return this.data;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  _handleClick = (text: string) => {
    this.timeframe = text.toLowerCase();
  }

  render() {
    return html `
      <main class="container">
        <aside class="user">
          <div class="user__top">
            <figure class="user__avatar">
              <img src="../images/${this.user.image_src}" alt="photo of ${this.user.name}" />
            </figure>
            <div class="user__intro">
              <span class="user__report text">Report for</span>
              <h1 class="user__name">${this.user.name}</h1>
            </div>
          </div>
          <div class="user__footer">
            <ul>
              ${this.timesframes.map((time: any, index: number) => {
                let text = time.text;
                let lowertext = text.toLowerCase();
                return html`
                  <li key=${index} class="${lowertext === this.timeframe ? 'active': 'not-active'}">
                    <button @click=${() => this._handleClick(text)}>${text}</button>
                  </li>
                `
              })}
            </ul>
          </div>
        </aside>
        <report-card .data=${this.data} .timeframe=${this.timeframe}></report-card>
      </main>
    `
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'my-page': MyPage
  }
}