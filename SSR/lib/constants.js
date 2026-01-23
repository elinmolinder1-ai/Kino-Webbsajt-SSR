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
  { label: "Mina sidor", id: "profile", link: "member-page.html" },
  { label: "Företag", id: "business", link: "/business" }
];

//FOOTER = list of links shown at the bottom of the page.
export const FOOTER_ABOUT = [
  { label: "Jobba hos oss", id: "work", link: "/" },
  { label: "Press", id: "work", link: "/" },
  { label: "Om kino", id: "work", link: "/" },
  { label: "Filmfestivalen", id: "work", link: "/" },
  { label: "Hitta hit", id: "work", link: "/" },
];

export const FOOTER_OTHER = [
  { label: "Köpvillkor", id: "work", link: "/" },
  { label: "Integritetspolicy", id: "policy", link: "/" },
  { label: "Åldersgränser", id: "age", link: "/" },
  { label: "Tillgänglighet", id: "accessability", link: "/" },
];

export const FOOTER_CONTACT = [
  { icon: "fa_map_marker_alt", label: "Storgatan 12, 123 45 Lycksele", link: "https://maps.google.com/?q=Storgatan 12, 123 45 Lycksele" },
  { icon: "fa_phone", label: "+46 950-xxxxxxxx", link: "tel:+46950xxxxxxxx" },
  { icon: "fa_envelope", label: "info@kino.com", link: "mailto:info@kino.com" }
];

export const FOOTER_SOCIAL = [
  { icon: "fa-x-twitter", label: "X", link: "#" },
  { icon: "fa-facebook-f", label: "Facebook", link: "#" },
  { icon: "fa-instagram", label: "Instagram", link: "#" }
];
export const FOOTER_NEWS = {
  label: "Nyhetsbrev",
  placeholder: "you@example.com",
  buttonText: "Anmäl dig"
};
