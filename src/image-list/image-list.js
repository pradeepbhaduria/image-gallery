import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

const ImageList = () => {
  const history = useHistory();
  const { images } = history.location.state;
  console.log('Images', images, history);
  return (
    <Fragment>
      <Carousel>
        {images.map(({ imageUrl, key, labels = [] }) => (
          <figure key={key}>
            <img src={imageUrl} alt="test" loading="lazy" />
            <p className="legend">{labels.join(', ')}</p>
          </figure>
        ))}
      </Carousel>
    </Fragment>
  );
};

export default ImageList;
