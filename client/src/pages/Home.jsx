import styles from "./Home.module.css";
import React from "react";
import UploadForm from "../components/UploadForm";

const Home = () => {
  return (
    <>
      <div className={styles.homeHeader}>
        <h1>Eastwood Legacy 2025</h1>
        <p className={styles.subheader}>
          Thank you for contributing to the Legacy Project!
        </p>
        <p>
          {" "}
          We are gathering photos and videos from the past 75 years of Eastwood
          Pentacostal Church.
        </p>
      </div>
      <UploadForm />
    </>
  );
};

export default Home;
