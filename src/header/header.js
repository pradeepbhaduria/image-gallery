import React, { useRef } from 'react';

const Header = () => {
  const hiddenInput = useRef();
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const formData = new FormData();
    formData.append('image', files[0]);

    fetch('http://localhost:8000/uploadImage', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <header>
      <h2>Image Gallery</h2>
      <div className="upload-file">
        <button className="button" onClick={() => hiddenInput.current.click()}>
          Upload Image
        </button>

        <input
          hidden
          type="file"
          ref={hiddenInput}
          onChange={handleImageUpload}
        />
      </div>
    </header>
  );
};
export default Header;
