import { LitElement } from 'lit';
export declare class ReportCard extends LitElement {
    static styles: import("lit").CSSResult;
    lastWeek: string;
    data?: string[];
    timeframe: string;
    colors: string[];
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'report-card': ReportCard;
    }
}
