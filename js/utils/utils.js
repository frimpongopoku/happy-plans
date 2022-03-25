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
    if (all) el = document.querySelectorAll(selector) // when the selector is a class, and all items with such class should be retrieved
    if (el) return el;
    return document.querySelector(selector); // when the selector is a class, and only the first occurence should be retrieved


};