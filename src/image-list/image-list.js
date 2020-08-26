import React, { Fragment, useEffect } from 'react';
import { useState } from 'react';
const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/listObjects')
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        setImages(data);
      });
  }, []);

  return (
    <Fragment>
      {images.map((image, index) => (
        <figure style={{ display: 'inline-block' }} key={index}>
          <img
            src={image}
            alt="test"
            loading="lazy"
            width="300px"
            height="300px"
          />
          <figcaption>
            <strong>{`Image - ${index}`}</strong>
          </figcaption>
        </figure>
      ))}
    </Fragment>
  );
};

export default ImageList;
