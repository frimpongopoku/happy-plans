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
 * The function is used inside the data object (data.js)
 */
export const setPageDescription = (text) => {
    const title = getElement(`#${window.pageInfo.name}-page-description`);
    title.innerHTML =
        (text || "The best hotel accomodation in ") +
        capitalise(window.country.name);
};

/**
 * Given a page object, this function runs its "mount" function
 * @param {*} pageObj
 */
export const mountPage = (pageObj) => {
    if (!pageObj) return;
    const mount = pageObj.mount && pageObj.mount.runnable; // find the mount function for current page if it exists, and run
    if (mount) mount();
};

/**
 * Used by the countries navigation dropdown to visit a page, while
 * setting the chosen country as a param
 * @param {*} countryKey
 */
export const selectCountryOnNav = (countryKey) => {
    const country = COUNTRIES[countryKey.toLowerCase()];
    var url = window.location.href.split("?")[0];
    window.location.href = `${url}?country=${country.key}`;
};

/**
 * A reusable function that is used to model a hotel card, and
 * attaches that card to the DOM when on the travel page
 * @param {*} hotel
 */
const makeHotelTemplateAndAttach = (hotel) => {
    const { name, rating, link } = hotel;
    const markup = `
    <div class="lean-card elevate-float">
        <div class="left">
            <h1 style="font-weight: 400">
                ${name || "..."}
            </h1>
            <h3 style="margin-top: 6px; color: var(--app-theme-green)">
                Rating <span class="rating-number">${rating || "..."}</span>
            </h3>
        </div>
        <div class="right flex touchable-opacity" onclick=\"window.open('${link}','_blank')\">
            <em class="fa fa-angle-right right-angle"></em>
        </div>
    </div>
    `;

    const travelRecycler = getElement("#travel-recycler");
    travelRecycler.setAttribute("markup", markup);
    travelRecycler.setAttribute("loading", false);
    // save the data to temporary pageRAM
    const old = window.pageRAM || {};
    window.pageRAM = {...old, hotel };
};

/**
 * Runs the hotel api request to retrieve information on the the best hotel accomodation within the chosen country
 */
export const fetchHotels = () => {
    const country = window.country || {};
    const page = window.pageInfo;
    const headers = {
        "X-RapidAPI-Key": "7d4387e6d7msh5989ee4a8593cdbp154c63jsnea2eeba3f545",
    };
    const url = page.api.hotel.url({
        country: country.name,
        city: country.city,
    });

    InternetExplorer.get({ headers, url })
        .then((bestHotel) => {
            makeHotelTemplateAndAttach(bestHotel);
        })
        .catch((e) => console.log("FETCH_ERROR:", e.toString()));
};

/**
 * A reusable function that creates an HTML markup given a weather object from the api, and
 * attaches it to the DOM.
 * It also stashes a copy of the data it just used in the window object for later use
 * @param {*} weather
 */
const makeWeatherTemplateAndAttach = (weather) => {
    const { location, current } = weather;
    const markup = ` <div class="lean-card elevate-float">
        <div class="left">
            <h1 style="font-weight: 400">
                ${location.country || window.country.name}
            </h1>
            <div class="flex">
                <h3 style="margin-top: 6px; color: var(--app-theme-green)">
                    <span class="rating-number">${
                      current.temp_c || "..."
                    } C</span>
                </h3>

                <h3 style="
        margin-top: 6px;
        color: var(--app-theme-green);
        margin-left: 6px;
        ">
                    <span class="rating-number">${current.temp_f} F</span>
                </h3>
            </div>
        </div>

        <img alt="weather condition" class="right-img" src="${
          current.condition.icon || "..."
        }" />
    </div>`;
    const travelRecycler = getElement("#travel-recycler");
    travelRecycler.setAttribute("markup", markup);
    travelRecycler.setAttribute("loading", "false");
    // save weather information locally to retrieve later
    const old = window.pageRAM || {};
    window.pageRAM = {...old, weather };
};
/**
 * Runs the weather api request, and retrieves weather information on the current country
 */
const fetchWeather = () => {
    const country = window.country || {};
    const page = window.pageInfo;
    const url = page.api.weather.url({
        country: country.key,
    });
    InternetExplorer.get({ url })
        .then((weatherInfo) => {
            makeWeatherTemplateAndAttach(weatherInfo);
        })
        .catch((e) => console.log("FETCH_ERROR:", e.toString()));
};

/**
 * A function that is fired by the dropdown items on the travel page.
 * @param {*} key
 * @returns
 */
export const handleOnTravelDropdownChange = (key) => {
    key = key.trim();
    const travelRecycler = getElement("#travel-recycler");

    const temp = window.pageRAM || {};
    if (key === "hot") {
        const hotelStash = temp.hotel;
        // If we have already run the request before, then check the temporary stash for the data, and gont go back to the api
        if (hotelStash) return makeHotelTemplateAndAttach(hotelStash);
        travelRecycler.setAttribute("loading", "true");
        return fetchHotels();
    }
    if (key === "wea") {
        setPageDescription(
            "What's the weather like in " + window.country.name + "?" || "..."
        );
        const weatherInfoStash = temp.weather;
        if (weatherInfoStash) return makeWeatherTemplateAndAttach(weatherInfoStash);
        travelRecycler.setAttribute("loading", "true");
        return fetchWeather();
    }
};


export const loadHealthInformation = () => {


}