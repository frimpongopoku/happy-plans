export const getElement = (selector) => {
    var el;
    el = document.getElementById(selector);
    if (el) return el;
    el = document.querySelector(selector);
    if (el) return el;
};