import React from 'react';

const ImageLabels = ({ labels = [] }) => {
  console.log('labels', labels);
  return (
    <div className="image-labels">
      {labels.map((label) => (
        <span>{label}</span>
      ))}
    </div>
  );
};

export default ImageLabels;
