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
        {/* <li>Förrätter</li>
        <li>Huvudrätter</li>
        <li>Desserter</li>
        <li>Snacks</li> */}
      </ul>
    </div>
  );
}

export default Categories;
