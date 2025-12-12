import coralIMG from "../../assests/img/TripsPage/coral-island.png"; 
import cavesIMG from "../../assests/img/TripsPage/crystal-caves.png";
import savannaIMG from "../../assests/img/TripsPage/savanna.png";

export const discoverLocations = [
  {
    title: "The Crystal Caves",
    place: "The North Lake, Iceland",
    temperature: "-16°C",
    weather: "Very cold",
    img: cavesIMG,

    stats: {
      coverage: 15,
      flightsPerDay: 9,
      nextFlight: "08:15",
      description:
        "Statistics reflect the exact data, collected from authentic sources."
    }
  },

  {
    title: "The Sahara Peaks",
    place: "Morocco",
    temperature: "38°C",
    weather: "Hot",
    img: coralIMG,

    stats: {
      coverage: 8,
      flightsPerDay: 3,
      nextFlight: "12:40",
      description: "Sunrise flights available daily."
    }
  },

  {
    title: "Savanna",
    place: "Alaska, USA",
    temperature: "-5°C",
    weather: "Cold",
    img: savannaIMG,

    stats: {
      coverage: 21,
      flightsPerDay: 14,
      nextFlight: "06:50",
      description: "Scenic tours with mountain passes."
    }
  }
];
