import {
    arrangeInOrder,
    fetchHotels,
    handleOnTravelDropdownChange,
    makeUniversities,
    mountEducationPage,
    selectCountryOnNav,
    setTravelPageDescription,
} from "../functions.js";
import { capitalise } from "../utils/utils.js";

export const COUNTRIES = {
    mauritius: { name: "mauritius", key: "mauritius", city: "portlouis" },
    ghana: { key: "ghana", name: "ghana", city: "accra" },
    uk: { key: "uk", name: "United Kingdom", city: "london" },
};

const common = {
    navigation: {
        runnable: selectCountryOnNav,
    },
};
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
            runnable: setTravelPageDescription,
        },
    },
    health: {
        url: "/pages/health/health.html",
        ...common,
        name: "health",
        filter: {
            description: "We provide available statistics on COVID-19 activities in various countries",
            subtext: "Compare to",
            options: Object.keys(COUNTRIES)
                .map((name, val) => capitalise(name) + "-" + val.key)
                .join(","),
        },
    },
    contact: { url: "/pages/forms/contact.html", name: "contact" },
};