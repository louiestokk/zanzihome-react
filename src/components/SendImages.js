import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useDispatch } from "react-redux";
import { setImagesUrl } from "../redux-toolkit/ImagesSlice";

const SendImages = ({ adsFormData, setadsFormData }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [percent, setPercent] = useState(0);
  const [uri, seturi] = useState(null);
  const handleChange = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
  };
  const handleUpload = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `/files/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          seturi(url);
          dispatch(setImagesUrl(url));
          setadsFormData({ ...adsFormData, uri: url });
        });
      }
    );
  };

  return (
    <div
      style={{
        display: "flex",
        overflowX: "scroll"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start"
        }}
      >
        <input type="file" accept="image/*" onChange={handleChange} />
        <p style={{ margin: "0.5rem 0" }}>{percent} "% done"</p>
        {uri != null && (
          <img
            style={{ width: "80px", height: "80px" }}
            src={uri != null && uri}
          />
        )}
        {percent < 100 && (
          <button
            onClick={handleUpload}
            style={{ background: "#22c55e", color: "white", padding: "0.3rem" }}
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
};

export default SendImages;
