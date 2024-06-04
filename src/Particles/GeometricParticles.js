import React from "react";
import Particles from "react-tsparticles";

const MovingLightLinksPresets = () => {
  const options = {
    preset: "links",
    particles: {
      links: {
        enable: true,
        distance: 100,
        color:"#00FFFF",
        // color: "#ffffff",
        // color:"#f85fe9",
        opacity: 0.7,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        outMode: "out",
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: 2,
      },
    },
  };

  return (
    <Particles
      id="tsparticles"
      options={options}
    />
  );
};

export default MovingLightLinksPresets;