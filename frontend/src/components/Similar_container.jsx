// Similar_container.jsx
import React from "react";
import "../css/similar_bike.css";
import { Card_container } from "./Card_container";

const Similar_container = () => {
  return (
    <div className="slider_similar_bike">
      <h1>Productos similares</h1>
      <Card_container is_categories="false" is_similar="true" />
    </div>
  );
};

export default Similar_container;
