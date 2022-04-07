import { COUNTRIES, PAGES } from "./components/data.js";
import Dropdown from "./components/Dropdown.js";
import FilterBox from "./components/FilterBox.js";
import Footer from "./components/Footer.js";
import Hero from "./components/Hero.js";
import NavBarComponent from "./components/NavBar.js";
import { mountPage } from "./functions.js";
import Recycler from "./Recycler.js";
import { fetchParamsFromURL, getElement, getPageNameFromURL } from "./utils/utils.js";

/**
 * This is the entry point of the appliction. 
 * When the application starts, we deduce which country the user has selected, and which category of service 
 * they wish to browse
 */
const pageName = getPageNameFromURL(window.location.href);
const countryKey = fetchParamsFromURL(window.location.href, "country");

window.country = COUNTRIES[countryKey] || COUNTRIES.mauritius; // set mauritius as default, if there is no specified country in the URL
window.pageName = pageName;
window.pageInfo = PAGES[pageName];

/**
 * Here, custom components that have been made using 
 * the WebComponents API are defined so that they can be used in the currently 
 * loaded page
 */
customElements.define("app-recycler", Recycler);
customElements.define("app-dropdown", Dropdown);
customElements.define("nav-bar", NavBarComponent);
customElements.define("app-filter-box", FilterBox);
customElements.define("app-footer", Footer);
customElements.define("app-hero", Hero);
// --------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------
/**
 * Here, the "mount" function of the currently determined page object  
 * is run, in order to get the page started. 
 * Anything that needs to run at the beginning of a page load, 
 * it is accessed within this running function off the pageObject if the current page
 */
mountPage(pageInfo);
const navDropdown = getElement("#navigation-dropdown");
navDropdown.setAttribute('defaultvalue', countryKey) // Here we make sure the country that has been selected and appended in the addresss bar is also set as default on the navbar country dropdown
    // ------------------------------------------------------