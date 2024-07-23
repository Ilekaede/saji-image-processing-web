import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Binarization from "./Binarization";
import GeometricTransformation from "./Geometric_transformation";

const Methods = () => {
  return (
    <div>
      <h1>Methods</h1>
      <nav>
        <ul>
          <li>
            <Link to="binarization">Binarization</Link>
          </li>
          <li>
            <Link to="geometric_transformation">Geometric Transformation</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="binarization" element={<Binarization />} />
        <Route
          path="geometric_transformation"
          element={<GeometricTransformation />}
        />
      </Routes>
    </div>
  );
};

export default Methods;
