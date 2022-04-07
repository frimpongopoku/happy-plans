import {
    arrangeInOrder,
    fetchHotels,
    fetchPeopleForHire,
    handleOnTravelDropdownChange,
    loadHealthInformation,
    makeUniversities,
    mountEducationPage,
    selectCountryOnNav,
    setPageDescription,
} from "../functions.js";

/**
 * Available countries that is supported in the entire application. 
 * Support for new countries could by implemented by simply adding new country objects with 
 * following the same object structure
 */
export const COUNTRIES = {
    mauritius: { name: "mauritius", key: "mauritius", city: "portlouis" },
    ghana: { key: "ghana", name: "ghana", city: "accra" },
    uk: { key: "uk", name: "United Kingdom", city: "london" },
};

/**
 * Pages share similar properties and functions. This object houses all these common properties  
 * and spread on to each page object  in the main page object. 
 * It reduces repeatition and makes refactoring easy
 */
const common = {
    navigation: {
        runnable: selectCountryOnNav,
    },
};
/**
 * This object represents all each page in the application. 
 * It defines properties and functionalities that each page should have. 
 */
export const PAGES = {
    home: { url: "/index.html", name: "home" },
    education: {
        url: "/pages/education/education.html",
        name: "education",
        ...common,
        api: {
            universities: {
                url: ({ country }) =>
                    `http://universities.hipolabs.com/search?country=${country}`,
            },
        },
        filter: {
            runnable: arrangeInOrder,
            description: `The list below provides information on top universities within the country, in alphabetical order.`,
            subtext: "Sort by",
            options: "Ascending Order - asc, Descending Order - desc", // Format: (Name of dropdown item - key)
        },
        recycler: {
            runnable: makeUniversities,
        },
        mount: {
            runnable: mountEducationPage,
        },
    },
    travel: {
        url: "/pages/travel/travel.html",
        ...common,
        name: "travel",
        api: {
            hotel: {
                url: ({ country, city }) =>
                    `https://best-booking-com-hotel.p.rapidapi.com/booking/best-accommodation?countryName=${country}&cityName=${city}`,
            },
            weather: {
                url: ({ country }) =>
                    `http://api.weatherapi.com/v1/current.json?key=8c01803115044225929184101222503&aqi=no&q=${country}`,
            },
        },
        filter: {
            runnable: handleOnTravelDropdownChange,
            description: "For all you travellers, here are some important information available in the countries you intend to visit",
            subtext: "Select Category",
            options: "Best Hotel Accomodation - hot , Weather - wea",
        },
        recycler: {
            runnable: fetchHotels,
        },
        mount: {
            runnable: setPageDescription,
        },
    },
    health: {
        url: "/pages/health/health.html",
        ...common,
        name: "health",
        api: {
            covid: {
                url: ({ country }) =>
                    `https://covid-193.p.rapidapi.com/statistics?country=${country}`,
            },
        },
        filter: {
            description: "We provide available statistics on COVID-19 activities in various countries",
            subtext: "Always remember to wear your mask",
            noDropdown: true,
        },
        mount: {
            runnable: () => setPageDescription("Summary of COVID-19 Dynamics in "),
        },
        recycler: { runnable: loadHealthInformation },
    },

    personal: {
        url: "/pages/personal/personal.html",
        ...common,
        name: "personal",
        mount: {
            runnable: () =>
                setPageDescription(
                    "Here is a list of personal assistants you can hire in "
                ),
        },
        api: {
            people: {
                url: ({ country }) =>
                    `https://randomuser.me/api/?seed=${country}&results=20`,
            },
        },
        recycler: { runnable: fetchPeopleForHire },
    },
    contact: { url: "/pages/forms/contact.html", ...common, name: "contact" },
};