import React from 'react';
import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ image, onImageClick }) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={image.webformatURL}
        alt={image.tag}
        className={s.ImageGalleryItem_image}
        onClick={() => onImageClick(image.largeImageURL)}
      />
    </li>
  );
}

ImageGalleryItem.propType = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }),
  onImageClick: PropTypes.func,
};
