import React from 'react';
import s from './Loader.module.css';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Spiner = () => (
  <div className={s.Loader}>
    <Loader type="Bars" color="#00BFFF" height={100} width={100} />
  </div>
);

export default Spiner;
