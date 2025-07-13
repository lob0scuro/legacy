import styles from "./Home.module.css";
import UploadForm from "../components/UploadForm";

const Home = () => {
  return (
    <>
      <div className={styles.homeHeader}>
        <div className={styles.headerMainBlock}>
          <h1>Eastwood</h1>
          <h3>Legacy 2025</h3>
        </div>
        <p className={styles.blah}>
          {" "}
          As we reflect on 75 years, we are assembling an archive of photographs
          and videos that preserve the history, milestones, and memories of
          Eastwood Pentecostal Church.
        </p>
        <p className={styles.subheader}>
          Thank you for contributing <br /> to the Legacy Project!
        </p>
      </div>
      <UploadForm />
    </>
  );
};

export default Home;
