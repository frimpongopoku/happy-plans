/**
 * Given a selector, the function retrieves DOM element(s)
 * @param {*} selector
 * @param {*} all
 * @returns
 */
export const getElement = (selector, all = false, root) => {
    const dom = root || document; //  query element from shadow root, if provided, else use normal document object
    var el;
    el = dom.getElementById(selector); // when the selector is and ID
    if (el) return el;
    if (all) el = dom.querySelectorAll(selector); // when the selector is a class, and all items with such class should be retrieved
    if (el) return el;
    return dom.querySelector(selector); // when the selector is a class, and only the first occurence should be retrieved
};

/**
 * Deconstructs a URL and retrieves the name of the page
 * using the name of the html file
 * @param {*} url
 * @returns
 */
export const getPageNameFromURL = (url) => {
    url = url.split("/"); // some-url.com/page/some-other-page.html, will become an array ["some-url.com", "page", "some-other-page.html"]
    var last = url[url.length - 1] || ""; // now access last item in array
    return last.split(".")[0]; // last item split with "." because like this ["some-other-page", "html"]
    //so the first time represents the name of the page
};

/**
 * Capitalises a given word
 * @param {*} word
 */
export const capitalise = (word) => {
    if (!word) return "";
    const first = word.charAt(0).toUpperCase();
    return first + word.slice(1);
};

export class InternetExplorer {

    static fetch({ method, url, headers }) {
        headers = headers || { "Content-Type": "application/json" };
        try {
            return fetch(url, { method, headers }).then((response) =>
                response.json()
            );
        } catch (e) {
            console.log(
                "Sorry, something happened where we were getting data from " + url,
                e.toString()
            );
        }
    }

    static get(obj) {
        return InternetExplorer.fetch({...obj, method: "GET" });
    }

    static post(obj) {
        return InternetExplorer.fetch({...obj, method: "POST" });
    }
}


export const fetchParamsFromURL = (url, paramName) => {
    if (!url) return "";
    url = url.toLowerCase();
    const _url = new URL(url);
    return _url.searchParams.get(paramName)

}