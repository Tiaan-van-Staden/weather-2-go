import React from "react";

function SideButtons({ setQuery }) {
  const places = [
    {
      id: 1,
      title: "Head Quaters",
      lat: -25.77058378771512,
      lon: 28.343766042404756,
    },
    {
      id: 2,
      title: "Sorcery",
      lat: -25.766873565347527,
      lon: 28.328639859662403,
    },
    {
      id: 3,
      title: "Mustang Sally's Pub & Diner",
      lat: -25.723920644419444,
      lon: 28.248791823361685,
    },
    {
      id: 4,
      title: "Mayville Mall",
      lat: -25.699381859642024,
      lon: 28.183586629730005,
    },
    {
      id: 5,
      title: "Burger King Lynwood Lane",
      lat: -25.76849815297565,
      lon: 28.329833365992478,
    },
    {
      id: 6,
      title: "Pretoria",
    },
    {
      id: 7,
      title: "Johannesburg",
    },
  ];

  const handleLocation = (places) => {
    if (places.lat && places.lon) {
      let lat = places.lat;
      let lon = places.lon;

      setQuery({
        lat,
        lon,
      });
    } else setQuery({ q: places.title });
  };

  return (
    <div className="space-y-4">
      {places.map((place) => (
        <div key={place.id}>
          <button
            className=" text-black font-light transition ease-out hover:scale-125 py-2 px-4"
            onClick={() => handleLocation(place)}
          >
            <span>{place.title}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default SideButtons;
