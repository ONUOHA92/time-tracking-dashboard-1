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
  `

  @property()
  report: string = "Report for";
  user = {
    name: "Jeremy Robson",
    image_src: "image-jeremy.png"
  }
  
  @property({
    hasChanged(newVal: string, oldVal: string) {
      const hasChanged: boolean = newVal !== oldVal;
      console.log(hasChanged);
      return hasChanged;
    }
  })
  timeframe: string = "daily";

  timesframes: Object[] = [
    { text: 'Daily' },
    { text: 'Weekly' },
    { text: 'Monthly' }
  ];

  _handleClick = (text: string) => {
    this.timeframe = text.toLowerCase();
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
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'user-card': UserCard
  }
}
