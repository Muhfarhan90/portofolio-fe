import React from "react";

const HeadingSection = ({ name, desc }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold border-b-2 border-purple">{name}</h1>
      <p>{desc}</p>
    </div>
  );
};

export default HeadingSection;
