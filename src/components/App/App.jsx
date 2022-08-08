import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar';

import { fetchData } from '../../sevices/imagesApi';
import Loader from '../Loader/Loader';
import Button from '../Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';

export default class App extends Component {
  state = {
    images: [],
    title: '',
    loading: false,
    query: '',
    error: null,
    page: 1,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;

    if (
      prevState.query !== this.state.query ||
      (prevState.page !== page && page !== 1)
    ) {
      this.fetchImages();
    }
  }

  handleFormSubmit = query => {
    if (query === this.state.query) return;
    this.setState({
      images: [],
      query: query,
      page: 1,
      error: null,
      title: '',
    });
  };

  onLoadMore = () => {
    this.setState(state => ({
      page: state.page + 1,
      loading: true,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onOpenModal = largeImageURL => {
    this.setState({ largeImageURL });
    this.toggleModal();
  };

  fetchImages = () => {
    const { query, page } = this.state;

    this.setState({ loading: true });

    fetchData(query, page)
      .then(({ hits, totalHits }) => {
        const totalPages = Math.ceil(totalHits / 12);

        if (hits.length === 0) {
          return toast.error('Sorry, no images found. Please, try again!');
        }

        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }

        if (page === totalPages) {
          toast.info("You've reached the end of search results.");
        }

        const data = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        });
        this.setState(({ images }) => ({
          images: [...images, ...data],
          total: totalHits,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { images, loading, error, total, showModal, largeImageURL, title } =
      this.state;

    const nextImages = images.length !== 0;
    const isLastPage = images.length === total;
    const loadMoreBtn = nextImages && !loading && !isLastPage;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {error && toast.error(error.message)}

        {nextImages && (
          <ImageGallery images={images} onClick={this.onOpenModal} />
        )}

        {loading && <Loader />}

        {loadMoreBtn && <Button onClick={this.onLoadMore} />}

        {showModal && (
          <Modal onClose={this.toggleModal} src={largeImageURL} alt={title} />
        )}

        <ToastContainer theme="colored" position="top-right" autoClose={3000} />
      </>
    );
  }
}
