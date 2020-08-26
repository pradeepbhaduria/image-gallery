import React, { useRef } from 'react';

const Header = () => {
  const hiddenInput = useRef();
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
          onChange={(e) => console.log('e', e)}
        />
      </div>
    </header>
  );
};
export default Header;
