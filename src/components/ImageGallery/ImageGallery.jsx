import { useState, useEffect } from 'react';
import css from './ImageGallery.module.css';
import { toast } from 'react-toastify';

import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { fetchSearch } from '../../Service/search-api';
import PropTypes from 'prop-types';

export function ImageGallery({ searchName }) {
  const [gallery, setGallery] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [perPage, setPerPage] = useState(12);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setGallery([]);
  }, [searchName]);

  useEffect(() => {
    if (searchName === '') {
      return;
    }
    if (gallery === []) {
      setPage(1);
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
        setPerPage(12);
      })
      .catch(({ message: error }) => {
        setError(error);
        setStatus('rejected');
      });
  }, [gallery, page, searchName]);

  const handleButtonPagination = e => {
    setPage(page + 1);
  };

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
        <Button onBtnLoadmore={handleButtonPagination} />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
};
