import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
const CountryCard = React.memo(
  ({ name, region, capital, flag, currencies, languages, callingCodes }) => {
    return (
      <div className="card-index">
        <div className="card-head">
          <img loading="lazy" src={flag} alt={name} />
        </div>
        <div className="card-body">
          <h1 className="card-title">{name}</h1>
          <hr />
          <div className="card-gruop-text">
            <p>
              <b>Currencies : </b>
              {currencies[0].code}
            </p>
            <p>
              <b>Region : </b>
              {region}
            </p>
            {capital.length >= 2 && (
              <p>
                <b>Capital : </b>
                {capital}
              </p>
            )}
            {callingCodes[0].length >= 1 && (
              <p>
                <b>Calling code : </b>
                {callingCodes[0]}
              </p>
            )}
            <p>
              <b>Language : </b>
              {languages.map(({ nativeName }) => ` ${nativeName}`)}
            </p>
          </div>
          <Link className="goCountry" to={`/${name}`}>
            {" "}
            <FontAwesomeIcon icon={faEye} /> Ver más...{" "}
          </Link>
        </div>
      </div>
    );
  }
);

export default CountryCard;
