import React from "react";

function SideButtons({ setQuery }) {
  const places = [
    {
      id: 1,
      title: "Head Quaters",
    },
    {
      id: 2,
      title: "National Zoological Gardens of South Africa",
    },
    {
      id: 3,
      title: "Mustang Sally's Pub & Diner",
    },
    {
      id: 4,
      title: "Mayville Mall",
    },
    {
      id: 5,
      title: "KFC East Lynne",
    },
    {
      id: 6,
      title: "Pretoria",
    },
  ];

  return (
    <div className="space-y-4">
      {places.map((place) => (
        <div key={place.id}>
          <button
            className=" text-black py-2 px-4"
            onClick={() => setQuery({ q: place.title })}
          >
            <span>{place.title}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default SideButtons;
