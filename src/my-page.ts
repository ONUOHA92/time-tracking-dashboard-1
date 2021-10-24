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
    :host *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    :host section {
      display: grid;
      gap: 1.5rem;
    }
    :host .report-card {
      cursor: pointer;
      margin-top: 38px;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      display: grid;
      justify-items: stretch;
      padding: 1.6rem 1.5rem;
      position: relative;
      color: #fff;
      border-radius: var(--radius);
      background-color: #1C204B;
      transition: background-color 400ms ease-in-out;
    }
    :host .report-card:hover {
      background-color: #33397A;
    }
    :host .report-card__options {
      cursor: pointer;
      color: #BBC0FF;
      font-size: 2rem;
      text-align: right;
      border: 0;
      background: transparent;
    }
    .text {
      font-size: 1rem;
      font-weight: 400;
      color: #BBC0FF;
    }
    :host .report-card::before {
      content: "";
      position: absolute;
      z-index: -1;
      top: -38px;
      left: 0px;
      right: 0px;
      height: 50%;
      border-radius: var(--radius) var(--radius) 0 0;
      background-color: var(--color);
      background-repeat: no-repeat;
      background-position: right top;
    }
    :host .report-card--work::before {
      background-image: var(--work);
    }
    :host .report-card--play::before {
      background-image: var(--play);
    }
    :host .report-card--study::before {
      background-image: var(--study);
    }
    :host .report-card--exercise::before {
      background-image: var(--exercise);
    }
    :host .report-card--social::before {
      background-image: var(--social);
    }
    :host .report-card--self::before {
      background-image: var(--self-care);
    }
    :host .report-card__title {
      font-size: 1.2rem;
      font-weight: 500;
    }
    :host .report-card__current {
      font-size: 2rem;
      font-weight: 300;
    }
    :host .report-card__previous {
      text-align: right;
      align-self: flex-end;
    }
    @media only screen and (min-width: 720px) {
      :host section {
        gap: 1.5rem;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, auto);
      }
      :host .report-card {
        display: block;
        margin-top: 45px;
        padding: 2rem;
      }
      :host .report-card::before {
        top: -45px;
      }
      :host .report-card__current {
        margin: 1.5rem 0 .5rem;
        font-size: 3.7rem;
      }
      :host .report-card__previous {
        text-align: left;
      }
      :host .report-card__options {
        float: right;
        margin-top: -1rem;
      }
      :host .report-card__options:hover img {
        filter: sepia(1);
      }
    }
    :host *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    :host aside {
      margin-bottom: 1.5rem;
      height: 100%;
      color: #fff;
      border-radius: 15px;
      background-color: #1C204B;
    }
    :host .user__top {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      border-radius: var(--radius);
      background-color: #5747EA;
    }
    :host .user__avatar {
      margin: 0;
      width: 78px;
      overflow: hidden;
      border-radius: 50%;
    }
    :host .user__avatar img {
      display: block;
      max-width: 100%;
      margin: 0;
      height: auto;
    }
    :host .text {
      font-size: 1rem;
      font-weight: 400;
      color: #BBC0FF;
    }  
    :host .user__name {
      // font-size: 2.6rem;
      font-size: 1.5rem;
      font-weight: 300;
    }
    :host .user__top {
      padding: 2.6rem 2.13rem;
    }
    :host .user__footer ul {
      padding: 1.5rem 0;
      display: flex;
      align-items: center;
      list-style: none;
    }
    :host button {
      background: transparent;
      border: 0;
    }
    :host .user__footer li {
      flex: 1 1 0px;
      text-align: center;
    }
    :host .user__footer li button {
      cursor: pointer;
      font-size: 1.125rem;
      color: var(--link);
      transition: color 400ms ease-in-out;
    }
    :host .user__footer li.active button,
    :host .user__footer li:hover button {
      color: var(--white);
    }
    @media only screen and (min-width: 720px) {
      :host aside {
        width: 255px;
        margin-bottom: 0;
      }
      :host .user__top {
        display: block;
      }
      :host .user__name {
        font-size: 2.6rem;
      }
      :host .user__intro {
        margin-top: 2.5rem;
      }
      :host .user__footer ul {
        padding: 1.875rem;
        flex-direction: column;
        align-items: baseline;
      }
      :host .user__footer li:not(:first-child) {
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

  @property({
    hasChanged(newVal: string[]) {
      const hasChanged: boolean = newVal.length > 0;
      console.log(newVal, hasChanged);
      return hasChanged;
    }
  })
  @property()
  data: string[] = [];

  @property()
  user = {
    name: "Jeremy Robson",
    image_src: "image-jeremy.png"
  }
  short: string = "test";

  timesframes: Object[] = [
    { text: 'Daily' },
    { text: 'Weekly' },
    { text: 'Monthly' }
  ];

  @property({
    hasChanged(newVal: string, oldVal: string) {
      const hasChanged: boolean = newVal !== oldVal;
      return hasChanged;
    }
  })
  timeframe: string = "daily";

  _fetchData = (url: string = "./src/data.json") => {
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
      <aside>
        <div class="user__top">
          <figure class="user__avatar">
            <img src="src/images/${this.user.image_src}" alt="photo of ${this.user.name}" />
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
    `
  }
}