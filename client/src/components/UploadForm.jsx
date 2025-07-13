import styles from "./UploadForm.module.css";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid"; // For generating unique file names
import { useNavigate } from "react-router-dom";
import { UserUpload } from "../lib/API";
import toast from "react-hot-toast";

const UploadForm = () => {
  const navigate = useNavigate();
  // State to hold the uploaded file(s)
  const [uploadedFile, setUploadedFile] = useState([]);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        // Convert FileList to an array and add each file to the state
        const file = files[i];
        if (file) {
          // Check if the file is an image or video
          if (
            !file.type.startsWith("image/") &&
            !file.type.startsWith("video/")
          ) {
            alert("Please upload only images or videos.");
            return;
          }
        }
        setUploadedFile((prevFiles) => [...prevFiles, file]);
      }
    } else {
      console.log("No file selected");
    }
  };

  const handleRemoveFile = (index) => {
    setUploadedFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (uploadedFile.length === 0) {
      alert("No files to upload");
      return;
    }
    try {
      for (let i = 0; i < uploadedFile.length; i++) {
        const file = uploadedFile[i];
        const storageRef = ref(
          storage,
          `images/${user.toUpperCase()}-${v4()}-${file.name}`
        );
        await uploadBytes(storageRef, file);

        //send info to backend
        const imageURL = await getDownloadURL(storageRef);
        const inputs = {
          url: imageURL,
          name: user,
          email: email,
        };

        const sendIt = await UserUpload(inputs);
        if (!sendIt.success) {
          throw new Error(sendIt.error);
        }
        toast.success(sendIt.message);

        setUploadedFile([]); // Clear the uploaded files after upload
        e.target.reset(); // Reset the form fields
      }
      setLoading(false);
      navigate("/success"); // Redirect to success page
    } catch (error) {
      setLoading(false);
      toast.error("There was an error uploading the file, check console");
      console.error("Error uploading file:", error);
      return;
    }
  };

  return (
    <>
      <div className={uploadedFile.length > 0 ? styles.filePreview : ""}>
        {uploadedFile.length > 0 &&
          uploadedFile.map((file, index) => (
            <div className={styles.filePreviewItem} key={index}>
              <img
                className={styles.uploadedFile}
                key={index}
                src={URL.createObjectURL(file)}
                alt="uploaded preview"
              />
              <button onClick={() => handleRemoveFile(index)}>X</button>
            </div>
          ))}
      </div>

      <form
        className={styles.uploadForm}
        encType="multipart/form-data"
        onSubmit={uploadFile}
      >
        <div>
          <label htmlFor="user">Name</label>
          <input
            type="text"
            name="user"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image" className={styles.uploadLabel}>
            Upload Image or Video
          </label>
          <input
            type="file"
            name="image"
            id="image"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      <div
        className={loading ? styles.loadingScreenShow : styles.loadingScreen}
      >
        <div className={styles.spinner}></div>
        Uploading...
      </div>
    </>
  );
};

export default UploadForm;
