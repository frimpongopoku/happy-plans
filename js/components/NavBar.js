import { getElement } from "../utils/utils.js";

export default class NavBarComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render({ opened: "false" });
    }
    static get observedAttributes() {
        return ["opened"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
        this.render({
            [name]: newValue,
        });
    }

    render({ opened }) {
        const showBlanket = opened === "true";

        var navMenuItems = ` 
        <ul class="menu">
          <li class="nav-menu-item touchable-opacity">
            Home
          </li>
          <li class="nav-menu-item touchable-opacity">
            Contact Us
          </li>
          <li class="nav-menu-item touchable-opacity">
            Subscribe
          </li>
        </ul>`;

        const content = `
    <nav class="nav-container elevate-float">
      <div class ="blanket fade-in" style="display:${
        showBlanket ? "flex" : "none"
      }">
        ${navMenuItems}
      </div>
      <div class="flex">
        <a class="app-logo" href="#"><img src="./../../shared/media//hp-logo.png" alt="site-logo" /></a>
        <div class="custom-select" style="margin-left:15px">
          <select>
            <option>Mauritius</option>
            <option>United Kingdom</option>
            <option>Ghana</option>
          </select>
        </div>
      </div>
      <div class="nav-right">
      <div class="phone-vanish">
      ${navMenuItems}
        
      </div>
        <div class="pc-vanish">
          <em id="phone-bars" class="fa fa-bars touchable-opacity" style="color: var(--app-theme-color); font-size: 18px;"></em>
        </div>
      </div>
    </nav>`;

        this.innerHTML = content;
        const navBarComponent = getElement("#nav");
        const phoneBarsToggle = getElement("#phone-bars");
        phoneBarsToggle.addEventListener("click", () => {
            const value = navBarComponent.getAttribute("opened");
            navBarComponent.setAttribute(
                "opened",
                value === "true" ? "false" : "true"
            );
        });
    }
}