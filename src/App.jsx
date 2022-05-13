import React, { useEffect, useState } from "react";
import { Cards, CountryPicker, Chart } from "./components";
import styles from "./App.module.css";
import image from "./img/undraw_doctors_hwty.svg";
import { fetchData } from "./api";

const App = () => {
  const [data, setData] = useState();
  const [country, seCountry] = useState();

  useEffect(() => {
    const load = async () => {
      const data = await fetchData();
      setData(data);
    };
    load();
  }, [country]);

  const handleCountryChange = async (country) => {
    const data = await fetchData(country);
    setData(data);
    seCountry(country);
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="COVID-19" />
      {data && (
        <>
          <Cards dataCards={data} />
          <CountryPicker handleCountryChange={handleCountryChange} />
          <Chart data={data} country={country} />
        </>
      )}
    </div>
  );
};

export default App;
