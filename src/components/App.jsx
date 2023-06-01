import { Component } from 'react';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchName: '',
  };

  handleFormSubmit = searchName => {
    console.log(searchName);
    this.setState({ searchName: searchName });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchName={this.state.searchName} />
        <ToastContainer theme="colored" hideProgressBar />
      </div>
    );
  }
}
