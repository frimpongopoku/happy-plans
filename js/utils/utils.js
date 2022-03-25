/**
 * Given a selector, the function retrieves DOM element(s)
 * @param {*} selector
 * @param {*} all
 * @returns
 */
export const getElement = (selector, all = false) => {
    var el;
    el = document.getElementById(selector); // when the selector is and ID
    if (el) return el;
    if (all) el = document.querySelectorAll(selector); // when the selector is a class, and all items with such class should be retrieved
    if (el) return el;
    return document.querySelector(selector); // when the selector is a class, and only the first occurence should be retrieved
};

/**
 * Deconstructs a URL and retrieves the name of the page 
 * using the name of the html file
 * @param {*} url 
 * @returns 
 */
export const getPageNameFromURL = (url) => {
    url = url.split("/"); // some-url.com/page/some-other-page.html, will become an array ["some-url.com", "page", "some-other-page.html"]
    var last = url[url.length - 1] || "" // now access last item in array
    return last.split(".")[0] // last item split with "." because like this ["some-other-page", "html"]
        //so the first time represents the name of the page
};