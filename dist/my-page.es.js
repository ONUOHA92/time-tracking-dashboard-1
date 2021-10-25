import { css, LitElement, html } from "lit";
import { property, customElement } from "lit/decorators.js";
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$2(target, key, result);
  return result;
};
let UserCard = class extends LitElement {
  constructor() {
    super(...arguments);
    this.report = "Report for";
    this.user = {
      name: "Jeremy Robson",
      image_src: "image-jeremy.png"
    };
    this.timeframe = "daily";
    this.timesframes = [
      { text: "Daily" },
      { text: "Weekly" },
      { text: "Monthly" }
    ];
    this._handleClick = (text) => {
      this.timeframe = text.toLowerCase();
    };
  }
  render() {
    return html`
      <aside class="user">
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
            ${this.timesframes.map((time, index) => {
      let text = time.text;
      let lowertext = text.toLowerCase();
      return html`
                <li key=${index} class="${lowertext === this.timeframe ? "active" : "not-active"}">
                  <button @click=${() => this._handleClick(text)}>${text}</button>
                </li>
              `;
    })}
          </ul>
        </div>
      </aside>
    `;
  }
};
UserCard.styles = css`
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
    @media (min-width: 48rem) {
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
__decorateClass$2([
  property()
], UserCard.prototype, "report", 2);
__decorateClass$2([
  property({
    hasChanged(newVal, oldVal) {
      const hasChanged = newVal !== oldVal;
      console.log(hasChanged);
      return hasChanged;
    }
  })
], UserCard.prototype, "timeframe", 2);
UserCard = __decorateClass$2([
  customElement("user-card")
], UserCard);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
let ReportCard = class extends LitElement {
  constructor() {
    super(...arguments);
    this.lastWeek = "Last Week";
    this.timeframe = "daily";
    this.colors = ["#FF8B64", "#55C2E6", "#FF5E7D", "#4BCF82", "#7335D2", "#F1C75B"];
  }
  render() {
    var _a;
    return html`
      <section>
        ${(_a = this.data) == null ? void 0 : _a.map((item, index) => {
      let short = "";
      switch (this.timeframe) {
        case "daily":
          short = "day";
          break;
        case "weekly":
          short = "week";
          break;
        case "monthly":
          short = "month";
          break;
      }
      return html`
            <article key=${index} class="report-card report-card--${item.title.toLocaleLowerCase()}" style="--color:${this.colors[index]}">
              <strong class="report-card__title">${item.title}</strong>
              <button class="report-card__options"><img src="/src/images/icon-ellipsis.svg" aria-hidden="true"/></button>
              <h2 class="report-card__current">${item.timeframes[this.timeframe].current} hrs</h2>
              <p class="report-card__previous">Last ${short} - ${item.timeframes[this.timeframe].previous} hrs</p>
            </article>
          `;
    })}
      </section>
    `;
  }
};
ReportCard.styles = css`
    section {
      display: grid;
      gap: 1.5rem;
    }
    .report-card {
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
    .report-card:hover {
      background-color: #33397A;
    }
    .report-card__options {
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
    .report-card::before {
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
    .report-card--work::before {
      background-image: var(--work);
    }
    .report-card--play::before {
      background-image: var(--play);
    }
    .report-card--study::before {
      background-image: var(--study);
    }
    .report-card--exercise::before {
      background-image: var(--exercise);
    }
    .report-card--social::before {
      background-image: var(--social);
    }
    .report-card--self::before {
      background-image: var(--self-care);
    }
    .report-card__title {
      font-size: 1.2rem;
      font-weight: 500;
    }
    .report-card__current {
      font-size: 2rem;
      font-weight: 300;
    }
    .report-card__previous {
      text-align: right;
      align-self: flex-end;
    }
    @media only screen and (min-width: 48rem) {
      section {
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
        grid-template-rows: repeat(2, 1fr);
      }
      .report-card {
        display: block;
        margin-top: 45px;
        padding: 2rem;
      }
      .report-card::before {
        top: -45px;
      }
      .report-card__current {
        margin: 1.5rem 0 .5rem;
        font-size: 3.7rem;
      }
      .report-card__previous {
        text-align: left;
      }
      .report-card__options {
        float: right;
        margin-top: -1rem;
      }
      .report-card__options:hover img {
        filter: sepia(1);
      }
    }
  `;
__decorateClass$1([
  property()
], ReportCard.prototype, "lastWeek", 2);
__decorateClass$1([
  property({
    hasChanged(newVal) {
      const hasChanged = newVal.length > 0;
      return hasChanged;
    }
  })
], ReportCard.prototype, "data", 2);
ReportCard = __decorateClass$1([
  customElement("report-card")
], ReportCard);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
let MyPage = class extends LitElement {
  constructor() {
    super(...arguments);
    this.data = [];
    this.user = {
      name: "Jeremy Robson",
      image_src: "image-jeremy.png"
    };
    this.short = "test";
    this.timeframe = "daily";
    this.timesframes = [
      { text: "Daily" },
      { text: "Weekly" },
      { text: "Monthly" }
    ];
    this._fetchData = (url = "./src/data.json") => {
      fetch(url).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      }).then((arr) => {
        this.data = arr;
        return this.data;
      }).catch((error) => {
        console.error("Error:", error);
      });
    };
    this._handleClick = (text) => {
      this.timeframe = text.toLowerCase();
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this._fetchData();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  render() {
    return html`
      <main class="container">
        <aside class="user">
          <div class="user__top">
            <figure class="user__avatar">
              <img src="./src/images/${this.user.image_src}" alt="photo of ${this.user.name}" />
            </figure>
            <div class="user__intro">
              <span class="user__report text">Report for</span>
              <h1 class="user__name">${this.user.name}</h1>
            </div>
          </div>
          <div class="user__footer">
            <ul>
              ${this.timesframes.map((time, index) => {
      let text = time.text;
      let lowertext = text.toLowerCase();
      return html`
                  <li key=${index} class="${lowertext === this.timeframe ? "active" : "not-active"}">
                    <button @click=${() => this._handleClick(text)}>${text}</button>
                  </li>
                `;
    })}
            </ul>
          </div>
        </aside>
        <report-card .data=${this.data} .timeframe=${this.timeframe}></report-card>
      </main>
    `;
  }
};
MyPage.styles = css`
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
__decorateClass([
  property()
], MyPage.prototype, "data", 2);
__decorateClass([
  property()
], MyPage.prototype, "user", 2);
__decorateClass([
  property({
    hasChanged(newVal, oldVal) {
      const hasChanged = newVal !== oldVal;
      return hasChanged;
    }
  })
], MyPage.prototype, "timeframe", 2);
MyPage = __decorateClass([
  customElement("my-page")
], MyPage);
export { MyPage };
