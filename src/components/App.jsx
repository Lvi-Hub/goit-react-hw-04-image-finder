import { useState } from 'react';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [searchName, setSearchName] = useState('');

  const handleFormSubmit = searchName => {
    setSearchName(searchName);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchName={searchName} />
      <ToastContainer theme="colored" hideProgressBar />
    </div>
  );
}
