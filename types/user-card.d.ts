import { LitElement } from 'lit';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class UserCard extends LitElement {
    static styles: import("lit").CSSResult;
    report: string;
    user: {
        name: string;
        image_src: string;
    };
    timeframe: string;
    timesframes: Object[];
    _handleClick: (text: string) => void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'user-card': UserCard;
    }
}
