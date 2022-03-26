import { COUNTRIES, PAGES } from "./components/data.js";
import { getElement, InternetExplorer } from "./utils/utils.js";

/**
 * Every dropdown item fires this function on click
 * This is where the context of the click is determined, and the necessary actions are taken
 * @param {*} data unique string that heps identify the option on the dropdown that as clicked
 * @param {*} identifier unique string that is used to identify which part of the page object(data.js)  to find the particular function that needs to run
 */
export const onDropdownClick = (data, identifier) => {
    const page = window.pageName;
    const dropdownInfo = PAGES[page] || {};
    const functionToRun = (dropdownInfo[identifier] || {}).runnable;
    if (functionToRun) functionToRun(data);
};

export const arrangeInOrder = (direction) => {
    console.log(" I am arranging in order of---> ", direction);
};

export const createTemplateFromData = (data) => {
    const pageName = window.pageName;
    const { recycler } = PAGES[pageName] || {};
    const functionToRun = recycler.runnable;
    if (functionToRun) functionToRun(data);
};

export const makeUniversities = (data) => {
    const country = window.country.name;
    const { page } = data;
    const url = page.api.universities.url({ country });
    InternetExplorer.get({ url }).then((response) => {
        const unis = response.slice(0, 20);
        const markup = unis
            .map((uni) => {
                return `<div class="lean-card elevate-float">
            <div class="left">
                <h1 style="font-weight: 400;">${uni.name}</h1>
            </div>
            <div class="right flex touchable-opacity" onclick="console.log('here is my school link', ${uni.web_pages[0]})">
                <em class="fa fa-angle-right right-angle"></em>
            </div>
        </div>`;
            })
            .join("");
        const educationPageRecycler = getElement("#education-recycler");
        //------- Now update state, to show content in the DOM ------------
        educationPageRecycler.setAttribute("markup", markup);
        educationPageRecycler.setAttribute("loading", "false");
    });
};

/**
 * The function is used inside the data object (data.js)
 */
export const mountEducationPage = () => {
    const title = getElement("#education-page-description");
    title.innerHTML = "List of some universities in " + window.country.name;
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
    var url = window.location.href.split("?")[0]
    window.location.href = `${url}?country=${country.key}`
    console.log("console.log I am the url my gee", url)

}