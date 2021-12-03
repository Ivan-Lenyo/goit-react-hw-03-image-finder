import s from './Button.module.css';
import PropTypes from 'prop-types';
import React from 'react';

export default function Button({ handleClickButton }) {
  return (
    <button type="button" className={s.Button} onClick={handleClickButton}>
      Load more
    </button>
  );
}

Button.propTypes = {
  handleClickButton: PropTypes.func,
};
