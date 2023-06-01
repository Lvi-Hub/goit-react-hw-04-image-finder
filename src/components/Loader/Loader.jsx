import React, { Component } from 'react';
import css from './Loader.module.css';
import { Oval } from 'react-loader-spinner';

export class Loader extends Component {
  render() {
    return (
      <div className={css.loader}>
        loading...
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }
}
