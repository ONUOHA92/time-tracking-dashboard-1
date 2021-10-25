import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('report-card')
export class ReportCard extends LitElement {

  static styles = css`
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

  @property()
  lastWeek: string = "Last Week";

  @property({
    hasChanged(newVal: string[]) {
      const hasChanged: boolean = newVal.length > 0;
      return hasChanged;
    }
  })
  data?: string[];

  timeframe: string = "daily";
  colors: string[] = ["#FF8B64","#55C2E6","#FF5E7D","#4BCF82","#7335D2","#F1C75B"];

  render() {
    return html`
      <section>
        ${this.data?.map((item:any, index:number) => {
          let short: string = "";
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
            default: "day";
          }
          return html`
            <article key=${index} class="report-card report-card--${item.title.toLocaleLowerCase()}" style="--color:${this.colors[index]}">
              <strong class="report-card__title">${item.title}</strong>
              <button class="report-card__options"><img src="../images/icon-ellipsis.svg" aria-hidden="true"/></button>
              <h2 class="report-card__current">${item.timeframes[this.timeframe].current} hrs</h2>
              <p class="report-card__previous">Last ${short} - ${item.timeframes[this.timeframe].previous} hrs</p>
            </article>
          `
        })}
      </section>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'report-card': ReportCard
  }
}
