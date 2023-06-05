import { useState, useEffect } from 'react';
import css from './ImageGallery.module.css';
import { toast } from 'react-toastify';

import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { fetchSearch } from '../../Service/search-api';
import PropTypes from 'prop-types';

export function ImageGallery({ searchName, page, loadMore }) {
  const [gallery, setGallery] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const perPage = 12;

  useEffect(() => {
    if (searchName === '') {
      return;
    }
    if (page === 1) {
      setGallery([]);
      console.log('Page = 1');
    }

    setStatus('pending');
    const nextName = searchName;

    fetchSearch(nextName, searchName, perPage, page)
      .then(gallery => {
        if (gallery.total === 0) {
          return (
            setStatus('idle'), toast.error('Nothing found for your request!')
          );
        }
        setGallery(prevState => [...prevState, ...gallery.hits]);
        setStatus('resolved');
        setTotal(gallery.total);
      })
      .catch(({ message: error }) => {
        setError(error);
        setStatus('rejected');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchName]);

  if (status === 'idle') {
    return <div>Please enter valid search name</div>;
  }

  if (status === 'rejected') {
    return toast.error(`Error Message ${error} !`);
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
        <Button onBtnLoadmore={loadMore} />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  loadMore: PropTypes.func.isRequired,
};
