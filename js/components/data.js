import { arrangeInOrder, makeUniversities } from "../functions.js";
import { capitalise } from "../utils/utils.js";

export const COUNTRIES = {
    mauritius: { name: "mauritius", key: "mauritius" },
    ghana: { key: "ghana", name: "ghana" },
    uk: { key: "uk", name: "United Kingdom" },
};

export const PAGES = {
    home: { url: "/index.html", name: "home" },
    education: {
        url: "/pages/education/education.html",
        name: "education",
        navigation: {
            runnable: (data) => console.log("I am the navigation guy bro", data),
        },
        api: {
            universities: {
                url: ({ country }) =>
                    `http://universities.hipolabs.com/search?country=${country}`,
            },
        },
        filter: {
            runnable: arrangeInOrder,
            description: "The list below provides information on top universities within your specified country in the order chosen on the dropdown below",
            subtext: "Sort by",
            options: "Ascending Order - asc, Descending Order - desc", // Format: (Name of dropdown item - key)
        },
        recycler: {
            runnable: makeUniversities,
        },
    },
    travel: {
        url: "/pages/travel/travel.html",
        name: "travel",
        filter: {
            description: "For all you travellers, here are some important information on crucial prices in the available countries on the platform",
            subtext: "Select Category",
            options: "Hotels - hot ,Weather - wea",
        },
    },
    health: {
        url: "/pages/health/health.html",
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