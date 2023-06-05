import { useState } from 'react';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);

  const handleFormSubmit = searchName => {
    setSearchName(searchName);
    setPage(1);
  };
  const handleButtonPagination = e => {
    setPage(page + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        searchName={searchName}
        page={page}
        loadMore={handleButtonPagination}
      />
      <ToastContainer theme="colored" hideProgressBar />
    </div>
  );
}
