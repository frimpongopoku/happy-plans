import { getElement } from "../utils/utils.js";
import { COUNTRIES, PAGES } from "./data.js";

/**
 * A simple function that is called whenever a dropdown item on 
 * the navbar is clicked. 
 * It navigates the site to the current url, but with the currently selected country. 
 * @param {*} page 
 * @returns 
 */
const navigate = (page) => {
    const url = PAGES[page].url;
    window.page = PAGES[page];
    if (!url) return;
    window.location = url + "?country=" + window.country.key;
};

/**
 * The navbar component is used on every page. 
 * Based on the properties passed to it on each page, is able to switch between 
 * a full length display for desktop devices, and a small-sized burgered display for mobile mode
 * It displays navigation items based on the pages available on the "pages" object, and 
 * also displays a country dropdown menu which is also created by looping over the country object.
 */
export default class NavBarComponent extends HTMLElement {
    constructor() {
        super();
        this.id = "nav";
    }

    connectedCallback() {
        this.render({ opened: "false" });
        this.initialiseMenus();
    }
    static get observedAttributes() {
        return ["opened"];
    }

    attributeChangedCallback(name, _, newValue) {
        this.render({
            [name]: newValue,
        });
    }

    initialiseMenus() {
        const menuItems = getElement(".nav-menu-item", true);
        menuItems.forEach((m) => {
            const key = m.getAttribute("data-key");
            m.addEventListener("click", function() {
                navigate(key);
            });
        });
    }


    render({ opened }) {
        const showBlanket = opened === "true";
        const items = Object.keys(PAGES).map((pageName) => {
            return `<li class="nav-menu-item touchable-opacity" data-key="${pageName}">
           ${pageName}
        </li>`;
        });

        var navMenuItems = ` 
        <ul class="menu">
          ${items.join("")}
        </ul>`;
        const countries = Object.keys(COUNTRIES).map((countryName) => {
            const value = COUNTRIES[countryName]
            return countryName + "-" + value.key
        }).join(",")

        const content = `
          <nav class="nav-container elevate-float">
            <div class ="blanket fade-in" style="display:${
              showBlanket ? "flex" : "none"
            }">
              ${navMenuItems}
            </div>
            <div class="flex">
              <a class="app-logo" href="#"><img src="./../../shared/media//hp-logo.png" alt="site-logo" /></a>
              <app-dropdown style="margin-left:15px" options=${countries.toUpperCase()} identifier ="navigation" id="navigation-dropdown"></app-dropdown>
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
        phoneBarsToggle.addEventListener("click", function() {
            const value = navBarComponent.getAttribute("opened");
            navBarComponent.setAttribute(
                "opened",
                value === "true" ? "false" : "true"
            );
        });
    }
}