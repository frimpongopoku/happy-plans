export class Hero extends HTMLElement {
    constructor() {
        super();
        // Set default values of  the hero component before the real attributes load
        this.title = "Welcome to this page";
        this.showbtn = true;

        this.subtext =
            "We provide information on various topics, enjoy your time here.";
        this.render({...this });
    }

    connectedCallback() {
        this.render(this)
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

    render({ showbtn, title, subtext }) {
            const button = `<button class="hero-button touchable-opacity" onclick="window.location='/pages/forms/contact.html'">
        Contact Us <em class="fa fa-long-arrow-right"></em>
      </button>`;
            const content = `
    <div class="hero">
      <div class="content">
          <img class="hero-image" src="./../../shared/media/uk-hero-back.jpeg" alt="hero image" />
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