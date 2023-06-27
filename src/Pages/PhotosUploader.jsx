import axios from "axios";
import { useState } from "react";

const PhotosUploader = ({ addedPhotos, onChanges }) => {
  const [imageLink, setImageLink] = useState("");
  const isImageLinkEmpty = imageLink.trim() === "";

  async function photosLink(e) {
    
    e.preventDefault();
    
    if (isImageLinkEmpty) {
      alert('Please provide photo url')
      return; 
    }
  
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

  function removeImage(e,imageLink) {
    e.preventDefault();
    onChanges([...addedPhotos.filter((image) => image !== imageLink)]);
  }

  function mainImage(e,imageLink){
    e.preventDefault();
    const notMainImages = addedPhotos.filter((image) => image !== imageLink)

    const newAdd = [imageLink,...notMainImages]
    
    onChanges(newAdd);
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
        <button  onClick={photosLink} className="bg-gray-200 px-4 rounded-2xl">
          Add&nbsp;photo
        </button>
      </div>

      <div className=" grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-3 gap-2">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div className="h-32 flex relative" key={link}>
              <img
                className="rounded-2xl w-full object-cover"
                src={"http://localhost:5000/uploads/" + link}
              />
              <button
                onClick={e => removeImage(e,link)}
                className="cursor-pointer absolute bottom-1 right-1 text-white bg-black p-2 bg-opacity-60 rounded-2xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              </button>
              <button
                onClick={e => mainImage(e,link)}
                className="cursor-pointer absolute bottom-1 left-1 text-white bg-black p-2 bg-opacity-60 rounded-2xl"
              >
                {link === addedPhotos[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {link !== addedPhotos[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                )}
              </button>
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
