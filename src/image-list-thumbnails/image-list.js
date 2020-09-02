import React, { Fragment, useEffect } from 'react';
import { useState } from 'react';
import ImageLabels from './image-labels';
import { Link } from 'react-router-dom';

const ImageListThumbnails = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/listImagesFromFirestore')
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        setImages(data);
      });
  }, []);

  return (
    <Fragment>
      {images.map(({ imageThumbnailUrl, key, labels }) => (
        <figure style={{ display: 'inline-block' }} key={key}>
          <Link
            to={{
              pathname: '/full-size',
              state: { images },
            }}
          >
            <img
              className="thumbnail"
              src={imageThumbnailUrl}
              alt="test"
              loading="lazy"
              width="300px"
              height="300px"
            />
          </Link>
          <figcaption>
            <strong>{key}</strong>
            {/* <ImageLabels labels={labels} /> */}
          </figcaption>
        </figure>
      ))}
    </Fragment>
  );
};

export default ImageListThumbnails;
