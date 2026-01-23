//constants.js  = a file that stores shared static data (menu + footer) so your layout can be generated dynamically in templates.

//MENU = list of navigation links for the top menu.
export const MENU = [
  { label: "Startsida", id: "movies", link: "/" },
  { label: "Alla filmer", id: "movies", link: "/movies" },
  { label: "Barnbio", id: "kids", link: "/kids" },
  { label: "Presentkort", id: "gift", link: "/gift" },
  { label: "Café & Bistro", id: "cafe", link: "/#cafe-bistro" },
  { label: "Event", id: "events", link: "/events" },
  { label: "Kundservice", id: "support", link: "/support" },
  { label: "Mina sidor", id: "profile", link: "/member-page" },
  { label: "Företag", id: "business", link: "/business" }
];

//FOOTER = list of links shown at the bottom of the page.
export const FOOTER = [
  { label: "Jobba hos oss", id: "work", link: "/" },
  { label: "Jobba hos oss", id: "work", link: "/" },
  { label: "Jobba hos oss", id: "work", link: "/" },
  { label: "Jobba hos oss", id: "work", link: "/" },
  { label: "Jobba hos oss", id: "work", link: "/" },
  { label: "Jobba hos oss", id: "work", link: "/" },
  { label: "Jobba hos oss", id: "work", link: "/" }
];
