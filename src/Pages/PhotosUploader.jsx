import axios from "axios";
import { useState } from "react";

const PhotosUploader = ({ addedPhotos, onChanges }) => {
  const [imageLink, setImageLink] = useState("");

  async function photosLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-link", {
      link: imageLink,
    });

    onChanges((prev) => {
      return [...prev, filename];
    });
    setImageLink("");
  }

  function uploadPhoto(e) {
    const files = e.target.files;
    //console.log({files})
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        onChanges((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  return (
    <>
      <div className="flex">
        <input
          type="text"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
          placeholder="Add using a link....jpg"
        />
        <button onClick={photosLink} className="bg-gray-200 px-4 rounded-2xl">
          Add&nbsp;photo
        </button>
      </div>

      <div className=" grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-3 gap-2">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div className="h-32 flex" key={link}>
              <img
                className="rounded-2xl w-full object-cover"
                src={"http://localhost:5000/uploads/" + link}
              />
            </div>
          ))}

        <label className="h-32 curser-pointer flex justify-center border items-center rounded-2xl p-8 text-2xl text-gray-700 gap-1">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
