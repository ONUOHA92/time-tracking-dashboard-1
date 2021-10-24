import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('user-card')
export class UserCard extends LitElement {
  static styles = css`
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
    :host .user__footer li {
      cursor: pointer;
      font-size: 1.125rem;
      flex: 1 1 0px;
      text-align: center;
      color: var(--link);
      transition: color 400ms ease-in-out;
    }
    :host .user__footer li.active,
    :host .user__footer li:hover {
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
  `

  @property()
  report: string = "Report for";
  name: string = "Jeremy Robson";
  timeframe: string = "Weekly";

  reportTimeList = [
    { text: 'Daily', active: false },
    { text: 'Weekly', active: true },
    { text: 'Monthly', active: false }
  ];


  changeActiveState(text: string) {
    console.log("click");
    this.timeframe = "Daily";
    console.log(this.timeframe, text);
  }
  
  render() {
    return html`
      <aside>
        <div class="user__top">
          <figure class="user__avatar">
            <img src="src/images/image-jeremy.png" alt="photo of ${this.name}" />
          </figure>
          <div class="user__intro">
            <span class="user__report text">${this.report}</span>
            <h1 class="user__name">${this.name}</h1>
          </div>
        </div>
        <div class="user__footer">
          <ul>
            ${this.reportTimeList.map((time) => html`
              <li class="${time.active && "active"}">
                <button @click=${this.changeActiveState(time.text)}>${time.text}</button>
              </li>
            `)}
          </ul>
        </div>
      </aside>
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'user-card': UserCard
  }
}
