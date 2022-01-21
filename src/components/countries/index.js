import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import Loading from "../loading/Loading";
import { Navbar } from "../ui/Navbar";
import CountryCard from "./CountryCard";
import "./index.scss";
const Countries = React.memo(() => {
  const [region, setRegion] = useState("");
  useEffect(() => {
    const value = localStorage.getItem("region") || "";
    setRegion(value);
  }, []);

  const [getSearch, setSearch] = useState("");
  useEffect(() => {
    const value = localStorage.getItem("search") || "";
    setSearch(value);
  }, []);
  const { data, loading, error } = useFetch(region, getSearch);
  return (
    <>
      <Navbar setRegion={setRegion} setSearch={setSearch} />
      <div className="card-container">
        {!!error && (
          <div className="error">
            <h1>{error}</h1>
          </div>
        )}

        {loading || data.length === 0 ? (
          <Loading />
        ) : (
          data.map((country) => <CountryCard key={country.name} {...country} />)
        )}
      </div>
    </>
  );
});
export default Countries;
