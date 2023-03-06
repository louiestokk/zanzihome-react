import { AiOutlinePhone } from "react-icons/ai";
import { BsSquare } from "react-icons/bs";
import { ImHome } from "react-icons/im";

export const navlinks = [
  { id: 1, text: "Home", url: "/" },
  {
    id: 3,
    text: "Advertise Property",
    url: "/advertisepropertyzanzibar"
  },

  {
    id: 9,
    text: "About Us",
    url: "/about"
  },
  {
    id: 10,
    text: "Contact Us",
    url: "/contact",
    icon: <AiOutlinePhone />
  }
];
export const objects = [
  {
    id: 544653,
    date: 20220124,
    url: ["./images/michamvi.jpg"],
    location: "Michamvi",
    price: 550,
    size: 7500,
    type: "Land",
    to: "Buy",
    bid: [515],
    desc: "Big Beach Plot Michamvi",
    info: "Beach front plot in Michamvi with palms and other trees. Here yoou can build club, restaurant , hotell or houses. Located in were popular area. Very popular island among turist and the island have lot of activities.",
    icon: <BsSquare className="object-plot-icon" />,
    contact: "Gerrard Mzee",
    agency: "Tripple M Limited",
    number: "+255 799 912 498",
    logo: "/images/tripplemlogo.png",
    active: true,
    coords: [-6.1448, 39.4948],
    query: ["beach"]
  },
  {
    id: 4,
    date: 2111,
    url: ["./images/plotzanzibar.jpg"],
    location: "Pemba",
    price: 55,
    size: 1200,
    type: "Land",
    to: "Buy",
    bid: [250000],
    desc: "Beach front plot",
    info: "Beach front plot in Zanzibar Pemba with palms and other trees. Here yoou can build club, restaurant , hotell or houses. Located in were popular area with lot of thigs to do. Very popular island among turist and the island have lot of activity.",
    icon: <BsSquare className="object-plot-icon" />,
    contact: "Gerrard Mzee",
    agency: "Tripple M Limited",
    number: "+255 799 912 498",
    logo: "/images/tripplemlogo.png",
    coords: [-5.0979, 39.7756],
    query: ["beach"]
  },
  {
    id: 5,
    contact: "Gerrard Mzee",
    agency: "Tripple M Limited",
    number: "+255 799 912 498",
    date: 2111,
    bid: [515],
    url: ["./images/beachhousezanzibar.jpg"],
    location: "Jambiani",
    price: 1200,
    size: 300,
    type: "House",
    icon: <ImHome className="object-plot-icon" />,
    to: "Rent",
    rooms: 4,
    desc: "Beach front house",
    logo: "/images/tripplemlogo.png",
    info: "Beach front house for rent in Jambiani Zanzibar with pool. 5 bedrooms, 2 living room, 3 bathrooms and a big kitchen",
    coords: [-6.3158, 39.5446],
    query: [""]
  },
  {
    id: 6,
    contact: "Gerrard Mzee",
    agency: "Tripple M Limited",
    number: "+255 799 912 498",
    date: 2112,
    url: ["./images/landpaje-1.jpg", "./images/my-2.jpg"],
    location: "Paje",
    icon: <BsSquare className="object-plot-icon" />,
    price: 16,
    size: 1400,
    bid: [13000],
    type: "Land",
    to: "Buy",
    desc: "5 min to the beach",
    logo: "/images/tripplemlogo.png",
    info: "Big land in Paje Zanzibar and close to the main road. Close to the village and paje beach. Here you can build smaller houses for business or a big house with pool.",
    coords: [-6.2665, 39.5338],
    query: ["shopping,restaurants", "supermarket", "pharmacy", "hospital"]
  },
  {
    id: 7,
    contact: "Gerrard Mzee",
    agency: "Tripple M Limited",
    number: "+255 799 912 498",
    date: 2112,
    url: [
      "./images/buylandpaje-3.jpg",
      "./images/uk.png",
      "./images/buylandpaje-2.jpg"
    ],
    location: "Paje",
    logo: "/images/tripplemlogo.png",
    bid: [515],
    price: 16,
    size: 900,
    icon: <BsSquare className="object-plot-icon" />,
    type: "Land",
    to: "Buy",
    desc: "5 min to the beach",
    info: "Big land in Paje Zanzibar and close to the main road. Close to the village and paje beach. Here you can build smaller houses for business or a big house with pool.",
    query: [
      "shopping,restaurants",
      "supermarket",
      "pharmacy",
      "hospital",
      "beach"
    ]
  },
  {
    id: 8,
    contact: "Gerrard Mzee",
    agency: "Tripple M Limited",
    number: "+255 799 912 498",
    date: 2112,
    logo: "/images/tripplemlogo.png",
    url: [
      "./images/beachplotzanzibar.jpg",
      "./images/beachplotzanzibar-1.jpg",
      "./images/beachplotzanzibar-2.jpg"
    ],
    location: "Paje",
    price: 125,
    size: 4900,
    type: "Land",
    bid: [515],
    icon: <BsSquare className="object-plot-icon" />,
    to: "Buy",
    desc: "Beach side plot",
    info: "Big land in Paje Zanzibar, 1min walk to the beach and close to the main road. Close to the village located at paje beach side. Here you can build hotell or resort,  houses for business or a 2- 3 big house with pool.",
    query: [
      "shopping,restaurants",
      "supermarket",
      "pharmacy",
      "hospital",
      "beach"
    ]
  },

  {
    id: 9,
    contact: "Gerrard Mzee",
    agency: "Tripple M Limited",
    logo: "/images/tripplemlogo.png",
    number: "+255 799 912 498",
    date: 2112,
    bid: [515],
    url: ["./images/my-1.jpg", "./images/my-2.jpg"],
    location: "Paje",
    price: 13,
    size: 555,
    type: "Land",
    icon: <BsSquare className="object-plot-icon" />,
    to: "Buy",
    desc: "5 min to the beach",
    info: "Nice plot in Paje Zanzibar and very close to the main road. The plot is 15 meter in width and 37 meter in length. Close to the village and paje beach. Here you can build 2 smaller houses for business or a bigger house with bigger garden.",
    query: [
      "shopping,restaurants",
      "supermarket",
      "pharmacy",
      "hospital",
      "beach"
    ]
  },
  {
    id: 10,
    contact: "Gerrard Mzee",
    agency: "Tripple M Limited",
    number: "+255 799 912 498",
    date: 2112,
    url: ["./images/mina3.JPG", "hh.png"],
    logo: "/images/tripplemlogo.png",
    location: "Paje",
    price: 12,
    size: 1040,
    type: "Land",
    icon: <BsSquare className="object-plot-icon" />,
    to: "Buy",
    desc: "7 min to the beach",
    info: "Land in Paje Zanzibar , area name Domo kuchu juu on the way to Jambiani only 2 min with car. Perfect for a house with big garden. The plot is located on the other side of the road to the beach. 3 min in the forest with car. There is lot of houses there and some under construction",
    query: [
      "shopping,restaurants",
      "supermarket",
      "pharmacy",
      "hospital",
      "forest"
    ]
  },

  {
    id: 11,
    contact: "Gerrard Mzee",
    agency: "Tripple M Limited",
    number: "+255 799 912 498",
    date: 2112,
    logo: "/images/tripplemlogo.png",
    url: ["./images/mina3.JPG", "./images/hh.png"],
    location: "Paje",
    price: 15,
    size: 2000,
    type: "Land",
    icon: <BsSquare className="object-plot-icon" />,
    to: "Buy",
    desc: "7 min to the beach",
    info: "Big land in Paje Zanzibar, area name Domo kuchu juu on the way to Jambiani only 2 min with car. Perfect for a house with big garden. The plot is located on the other side of the road to the beach. 3 min in the forest with car. There is lot of houses there and some under construction",
    query: [
      "shopping,restaurants",
      "supermarket",
      "pharmacy",
      "hospital",
      "forest"
    ]
  },
  {
    id: 1,
    contact: "Gerrard Mzee",
    agency: "Tripple M Limited",
    number: "+255 799 912 498",
    date: 2110,
    logo: "/images/tripplemlogo.png",
    url: ["./images/object-1.jpg", "./images/object-2.jpg"],
    location: "Paje",
    price: 90,
    size: 1000,
    type: "House",
    icon: <ImHome className="object-plot-icon" />,
    to: "Buy",
    desc: "7 min to the beach",
    info: "Big house in Zanzibar for sell with 4 bedrooms, 3 bathrooms, big kitchen and 2 living rooms. The house is built this year and modern. The house have a big garden with lot of space.",
    query: [
      "shopping,restaurants",
      "supermarket",
      "pharmacy",
      "hospital",
      "forest"
    ]
  },
  {
    id: 2,
    contact: "Gerrard Mzee",
    agency: "Tripple M Limited",
    number: "+255 799 912 498",
    date: 2110,
    url: ["./images/object-2.jpg"],
    location: "Paje",
    price: 1000,
    size: 200,
    type: "House",
    logo: "/images/tripplemlogo.png",
    icon: <ImHome className="object-plot-icon" />,
    to: "Rent",
    rooms: 3,
    desc: "3 min to the beach",
    info: "Big house in Paje Zanzibar with 3 bedrooms, 2 bathrooms, big kitchen and 1 living rooms. The house is built this year and modern. The house have a big garden with lot of space.",
    query: [
      "shopping,restaurants",
      "supermarket",
      "pharmacy",
      "hospital",
      "forest"
    ]
  },
  {
    id: 3,
    contact: "Gerrard Mzee",
    agency: "Tripple M Limited",
    number: "+255 799 912 498",
    date: 2110,
    url: ["./images/object-3.jpg"],
    location: "Paje",
    price: 130,
    size: 2500,
    type: "Land",
    logo: "/images/tripplemlogo.png",
    to: "Buy",
    desc: "Beach front plot",
    icon: <BsSquare className="object-plot-icon" />,
    info: "Beach front plot in Paje Zanzibar with palms and other trees. Here yoou can build club, restaurant and bangalow , barhroomhouse and hotell. Located in were popular area with lot of thigs to do",
    query: [
      "shopping,restaurants",
      "supermarket",
      "pharmacy",
      "hospital",
      "forest"
    ]
  }
];

export const bannerInfo = [
  {
    company: "Tripple M Limited",
    id: 1,
    name: "Gerrard M",
    url: ["../../public/images//buildhousezanzibar.jpg"]
  }
];
