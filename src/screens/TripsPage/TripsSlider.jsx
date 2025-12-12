import { useState } from "react";
import { discoverLocations } from "./discoverData";

export default function DiscoverSlider({ children }) {
  const [index, setIndex] = useState(0);

  const next = () =>
    setIndex((i) => (i + 1 >= discoverLocations.length ? 0 : i + 1));

  const prev = () =>
    setIndex((i) => (i - 1 < 0 ? discoverLocations.length - 1 : i - 1));

  return children({
    current: discoverLocations[index],
    next,
    prev
  });
}
