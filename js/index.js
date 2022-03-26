import { COUNTRIES, PAGES } from "./components/data.js";
import Dropdown from "./components/Dropdown.js";
import FilterBox from "./components/FilterBox.js";
import Footer from "./components/Footer.js";
import Hero from "./components/Hero.js";
import NavBarComponent from "./components/NavBar.js";
import { mountPage } from "./functions.js";
import Recycler from "./Recycler.js";
import { fetchParamsFromURL, getElement, getPageNameFromURL } from "./utils/utils.js";
const pageName = getPageNameFromURL(window.location.href);
const countryKey = fetchParamsFromURL(window.location.href, "country");

window.country = COUNTRIES[countryKey] || COUNTRIES.mauritius; // set mauritius as default, if there is no specified country in the URL
window.pageName = pageName;
window.pageInfo = PAGES[pageName];


customElements.define("app-recycler", Recycler);
customElements.define("app-dropdown", Dropdown);
customElements.define("nav-bar", NavBarComponent);
customElements.define("app-filter-box", FilterBox);
customElements.define("app-footer", Footer);
customElements.define("app-hero", Hero);
// --------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------
mountPage(pageInfo);
const navDropdown = getElement("#navigation-dropdown");
navDropdown.setAttribute('defaultvalue', countryKey)
    // ------------------------------------------------------