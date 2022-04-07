import { PAGES } from "./components/data.js";

const mountRecycler = () => {
    const pageName = window.pageName;
    const page = PAGES[pageName] || {};
    const functionToRun = page.recycler.runnable
    if (functionToRun) functionToRun({ page });
}

/**
 * The recycler is a component that simply switches display to a loading spinner, 
 * or a markup provided. 
 * This is handling by triggering the "loading" property and setting it to true or false. 
 * When the loading property of this component is true, a spinner is rendered. 
 * When the loading property is false, it renders it's given markup. 
 */
export default class Recycler extends HTMLElement {
    constructor() {
        super();
        this.loading = "true";
        this.markup = "<small>Loading Complete, no data!</small>";
        this.id = window.pageName + "-recycler";
        this.render(this);
    }

    connectedCallback() {
        mountRecycler();
    }

    static get observedAttributes() {
        return ["loading", "markup"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[name] = newValue;
        this.render(this);
    }

    render({ loading, markup }) {
        loading = loading === "true" ? true : false;
        if (loading) {
            this.innerHTML = `<div class="loader"><em class="fa fa-spinner fa-spin" ></em></div>`;
            return;
        }

        this.innerHTML = markup;
    }
}