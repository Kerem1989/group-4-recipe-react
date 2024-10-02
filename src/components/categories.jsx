/* import React from "react";

function Categories() {
  return (
    <div className="categories">
      <h1>Kategorier</h1>
      <p>Utforska våra olika kategorier av recept!</p>
      <ul>
        <li>Förrätter</li>
        <li>Huvudrätter</li>
        <li>Desserter</li>
        <li>Snacks</li>
      </ul>
    </div>
  );
}

export default Categories; */

import React from "react";

function Categories() {
  return (
    <div className="categories p-4">
      <h1 className="text-4xl font-bold text-center">Kategorier</h1>
      <p className="text-center mt-4">Utforska våra olika kategorier av recept!</p>
      <ul className="list-disc list-inside mt-4">
        <li>Förrätter</li>
        <li>Huvudrätter</li>
        <li>..</li>
        <li>..</li>
      </ul>
      <ul className="list-disc list-inside mt-4">
        <li>Kött</li>
        <li>Fisk och Skaldjur</li>
        <li>Vegetariskt</li>
        <li>Veganskt</li>
        <li>Glutenfritt</li>
      </ul>
      <ul className="list-disc list-inside mt-4">
        <li>Husmanskost</li>
        <li>Internationellt</li>
      </ul>
      <ul className="list-disc list-inside mt-4">
        <li>15 min</li>
        <li>30 min</li>
        <li>45 min</li>
        <li>60 min</li>
        <li>90 min</li>
        <li>120 min</li>
      </ul>
      <ul className="list-disc list-inside mt-4">
        <li>50 SEK</li>
        <li>100 SEK</li>
        <li>150 SEK</li>
        <li>200 SEK</li>
      </ul>
    </div>
  );
}

export default Categories;
