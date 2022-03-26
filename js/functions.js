import { PAGES } from "./components/data.js";
import { InternetExplorer } from "./utils/utils.js";

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
    const country = window.countryInfo.name;
    const { page } = data;
    const url = page.api.universities.url({ country });
    console.log("page", page);
    InternetExplorer.get({ url }).then((response) => {
        console.log("bro I said this is the data bana", response);
    });
};