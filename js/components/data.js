export const PAGES = {
    home: { url: "/index.html", name: "home" },
    education: {
        url: "/pages/education/education.html",
        name: "education",
        filter: {
            description: "The list below provides information on top universities within your specified country in the order chosen on the dropdown below",
            subtext: "Sort by",
        },
    },
    travel: {
        url: "/pages/travel/travel.html",
        name: "travel",
        filter: {
            description: "For all you travellers, here are some important information on crucial prices in the available countries on the platform",
            subtext: "Select Category",
        },
    },
    health: {
        url: "/pages/health/health.html",
        name: "health",
        filter: {
            description: "We provide available statistics on COVID-19 activities in various countries",
            subtext: "Compare to",
        },
    },
    contact: { url: "/pages/forms/contact.html", name: "contact" },
};

export const COUNTRIES = {
    mauritius: { name: "mauritius", key: "mauritius" },
    ghana: { key: "ghana", name: "ghana" },
    uk: { key: "uk", name: "United Kingdom" },
};