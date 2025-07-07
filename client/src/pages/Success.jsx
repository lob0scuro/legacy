import styles from "./Success.module.css";
import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <>
      <h1 className={styles.successHeader}>Thank you for your submission!</h1>
      <div className={styles.successBlock}>
        <p>We will be emailing you soon</p>
        <p>
          We would love to get some more information on the photos you've
          submitted for{" "}
          <span className={styles.golden}>
            <b>Legacy 2025</b>
          </span>
        </p>
        <p>
          Watch your inbox for an email from us to help describe people, places
          and events from photos that you've submitted!
        </p>
      </div>
      <br />
      <br />
      <p className={styles.lastP}>
        Click{" "}
        <Link className={styles.golden} to="/">
          <b>here</b>
        </Link>{" "}
        to upload more photos
      </p>
    </>
  );
};

export default Success;
