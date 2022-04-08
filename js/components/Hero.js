/**
 * This hero component is a design widget that is present on eachpage.
 * It displays images, page title, and subtitle based on the properties
 * defined on the individual page object
 */

import { capitalise } from "../utils/utils.js";

export default class Hero extends HTMLElement {
    constructor() {
        super();
        // Set default values of  the hero component before the real attributes load
        const country = window.country;
        this.title =
            (country.name &&
                "Welcome to " + (country.text || capitalise(country.name))) ||
            "Welcome to this page"; // append the country name to the beginning "welcome" string and show as the title of the hero card on each page. If a country has the "text" field it should be used, otherwise, the country name should be appended
        this.showbtn = true;
        this.background =
            country.background || "./../../shared/media/uk-hero-back.jpeg"; // set the background of the hero card based on the country
        this.subtext =
            country.subttext ||
            "We provide information on various topics, enjoy your time here.";
        this.render({...this });
    }

    connectedCallback() {
        this.render(this);
    }
    static get observedAttributes() {
        return ["background", "title", "showbtn", "subtext"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return; // prevent unnecessary re-renders when values are the same
        if (name === "showbtn") {
            newValue = newValue === "true" ? true : false;
        }
        this[name] = newValue;
        this.render(this); // re-render the component when an attribute changes
    }

    render({ showbtn, title, subtext, background }) {
            const button = `<button class="hero-button touchable-opacity" onclick="window.location='/happy-plans/pages/forms/contact.html'">
        Contact Us <em class="fa fa-long-arrow-right"></em>
      </button>`;
            const content = `
    <div class="hero">
      <div class="content">
          <img class="hero-image" src="${background}" alt="hero image" />
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-body">
          <div>
              <h1>${title}</h1>
              <p>${subtext}</p>
              <br />
              ${showbtn ? button : ``}
          </div>
      </div>
      <app-filter-box></app-filter-box>
  </div>
    `;
    this.innerHTML = content;
  }
}