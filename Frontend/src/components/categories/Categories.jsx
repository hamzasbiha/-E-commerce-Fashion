import React from "react";
import "./categories.scss";
import Homme from "../../catgoriesImages/Homme.jpg";
import Femme from "../../catgoriesImages/Femme.jpg";
import Enfant from "../../catgoriesImages/Enfant.jpg";
import Accessoire from "../../catgoriesImages/Accessoire.jpg";
import { Link } from "react-router-dom";
const Categories = () => {
  return (
    <div className="categories">
      <div className="col">
        <div className="row">
          <img src={Homme} alt="Homme" />
          <button>
            <Link className="link" to={`/products/Homme`}>
              Homme
            </Link>
          </button>
        </div>
        <div className="row">
          <img src={Femme} alt="Femme" />
          <button>
            <Link className="link" to={`/products/Femme`}>
              Femme
            </Link>
          </button>
        </div>
      </div>
      <div className="col">
        <div className="row">
          <img src={Enfant} alt="Enfant" />
          <button>
            <Link className="link" to={`/products/Enfant`}>
              Enfant
            </Link>
          </button>
        </div>
      </div>
      <div className="col col-l">
        <div className="row">
          <div className="col">
            <div className="row">
              <img src={Accessoire} alt="Accessoire" />
              <button>
                <Link className="link" to={`/products/Accessoire`}>
                accessesoire
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
