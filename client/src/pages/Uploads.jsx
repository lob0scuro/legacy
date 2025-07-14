import styles from "./Uploads.module.css";
import { ListImages, ListUsers } from "../lib/API";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Uploads = () => {
  const [images, setImages] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const get = async () => {
      const [gotUsers, gotImages] = await Promise.all([
        ListUsers(),
        ListImages(),
      ]);
      if (!gotUsers.success || !gotImages.success) {
        toast.error("Error when fetching data");
        return;
      }
      const userData = gotUsers.users;
      const imageData = gotImages.images;
      console.log(userData);
      setUsers(userData);
      setImages(imageData);
    };
    get();
  }, []);

  if (!images) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Uploads</h1>
      {users.map(({ id, name, email, uploads }) => (
        <div key={id}>
          <h3>{name}</h3>
          <p>{email}</p>
          <ul style={{ listStyleType: "none" }}>
            {uploads.map(({ id, url }) => (
              <li key={id}>
                <img src={url} alt={id} width={100} height={100} />
                <a href={url} download>
                  <button>Download</button>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Uploads;
