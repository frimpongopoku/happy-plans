import { COUNTRIES, PAGES } from "./components/data.js";
import { capitalise, getElement, InternetExplorer } from "./utils/utils.js";

/**
 * Every dropdown item fires this function on click, no matter the page its on.
 * This is where the context of the click is determined, and the necessary actions are taken
 * @param {*} data unique string that heps identify the option on the dropdown that as clicked
 * @param {*} context unique string that is used to identify which part of the page object(data.js)  to find the particular function that needs to run
 */
export const onDropdownClick = (data, context) => {
    const page = window.pageName;
    const dropdownInfo = PAGES[page] || {};
    const functionToRun = (dropdownInfo[context] || {}).runnable;
    if (functionToRun) functionToRun(data);
};

/**
 * One of the functions associated with the "education" object on the PAGES object. 
 * Its the function that fires when an item is chosen from the "Sort by" dropdown
 * @param {*} direction 
 */
export const arrangeInOrder = (direction) => {
    direction = direction && direction.trim();
    const asc = (a, b) => (a.name < b.name ? -1 : 1); // predicate to sort in ascending order
    const desc = (a, b) => (a.name > b.name ? -1 : 1); // predicate to sort in descending order
    var data = window.pageRAM; // retrieve the stashed response data, so we dont have to re-run the request
    if (direction === "asc") data.sort(asc);
    else if (direction === "desc") data.sort(desc);
    createDOMElementsFromUniversities(data);
    window.pageRAM = data; //update the temporary stash
};

export const createTemplateFromData = (data) => {
    const pageName = window.pageName;
    const { recycler } = PAGES[pageName] || {};
    const functionToRun = recycler.runnable;
    if (functionToRun) functionToRun(data);
};

/**
 * A reusable function that  takes in a list of universities,
 * and translates it into HTML markup that can be attached to the DOM
 * @param {*} data
 */
const createDOMElementsFromUniversities = (data) => {
    const markup = data
        .map((uni) => {
            const link = uni.web_pages[0];
            return `
          <div class="lean-card elevate-float">
              <div class="left">
                  <h1 style="font-weight: 400;">${uni.name}</h1>
              </div>
              <div class="right flex touchable-opacity" onclick=\"window.open('${link}','_blank')\">
                  <em class="fa fa-angle-right right-angle"></em>
              </div>
          </div>`;
        })
        .join("");

    const educationPageRecycler = getElement("#education-recycler");
    //------- Now update state, to show content in the DOM ------------
    educationPageRecycler.setAttribute("markup", markup);
    educationPageRecycler.setAttribute("loading", "false");
};

export const makeUniversities = (data) => {
    const country = window.country.name;
    const { page } = data;
    const url = page.api.universities.url({ country });


    InternetExplorer.get({ url }).then((response) => {
        const unis = response.slice(0, 20);
        const asc = (a, b) => (a.name < b.name ? -1 : 1);
        unis.sort(asc); // sort univerisities in alphabetical order
        // use the list of universities retrieved to create an HTML markup that will later be attached to the DOM
        createDOMElementsFromUniversities(unis);
        // Temporarily keep the  response content, so that it can be retrieved to be sorted later to perform sorting manipulations, when
        // the user uses the dropdown sortign options
        window.pageRAM = unis;

    });
};

/**
 * The function is used inside the data object (data.js)
 */
export const mountEducationPage = () => {
    const title = getElement("#education-page-description");
    title.innerHTML =
        "List of some universities in " + capitalise(window.country.name);
};

/**
 * Given a page object, this function runs its "mount" function
 * @param {*} pageObj
 */
export const mountPage = (pageObj) => {
    if (!pageObj) return;
    const mount = pageObj.mount.runnable;
    if (mount) mount();
};

export const selectCountryOnNav = (countryKey) => {
    const country = COUNTRIES[countryKey.toLowerCase()];
    var url = window.location.href.split("?")[0];
    window.location.href = `${url}?country=${country.key}`;
};