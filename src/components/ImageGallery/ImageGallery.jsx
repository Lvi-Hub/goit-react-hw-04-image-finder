import React, { Component } from 'react';

import css from './ImageGallery.module.css';
import { toast } from 'react-toastify';

import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { fetchSearch } from '../../Service/search-api';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    gallery: [],
    status: 'idle',
    error: null,
    perPage: 12,
    total: 0,
    page: 1,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    console.log(`prevName: ${prevPage}`);
    console.log(`nextName: ${nextPage}`);

    if (prevName !== nextName) {
      this.setState({ gallery: [], page: 1 });
    }

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      setTimeout(() => {
        fetchSearch(
          nextName,
          this.props.searchName,
          this.state.perPage,
          this.state.page
        )
          .then(gallery => {
            if (gallery.total === 0) {
              return (
                this.setState({ status: 'idle' }),
                toast.error('Nothing found for your request!')
              );
            }

            this.setState(prevState => ({
              gallery: [...prevState.gallery, ...gallery.hits],
              status: 'resolved',
              total: gallery.total,
            }));
          })
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 0);
    }
  }

  handleButtonPagination = e => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { gallery, status, perPage, total, page } = this.state;

    if (status === 'idle') {
      return <div>Please enter valid search name</div>;
    }

    if (status === 'rejected') {
      return toast.error('Error Message !');
    }

    const isBtnLoadMoreVisual = Math.floor(total - page * perPage) > 0;
    return (
      <>
        <ul className={css.ImageGallery}>
          {gallery.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
            />
          ))}
        </ul>

        {status === 'pending' && <Loader />}
        {status === 'resolved' && isBtnLoadMoreVisual && (
          <Button onBtnLoadmore={this.handleButtonPagination} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
};
