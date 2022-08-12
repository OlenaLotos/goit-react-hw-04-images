// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData } from '../../sevices/imagesApi';
import Searchbar from '../Searchbar';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import Button from '../Button';
import ImageGallery from '../ImageGallery/ImageGallery';

export function App() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [total, setTotal] = useState(0);
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (query === '' || page === '') return;
    fetchImages(query, page);
  }, [query, page]);

  const fetchImages = (query, page) => {
    setLoading(true);

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

        setImages(images => [...images, ...data]);
        setTotal(totalHits);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  const handleFormSubmit = query => {
    setImages([]);
    setQuery(query);
    setPage(1);
    setError(null);
    setTitle('');
  };

  const onOpenModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setTags(tags);
  };

  const onLoadMore = () => {
    setPage(page => page + 1);
    setLoading(true);
  };

  const nextImages = images.length !== 0;
  const isLastPage = images.length === total;
  const loadMoreBtn = nextImages && !loading && !isLastPage;

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      {error && toast.error(error.message)}

      {nextImages && <ImageGallery images={images} onClick={onOpenModal} />}

      {loading && <Loader />}

      {loadMoreBtn && <Button onClick={onLoadMore} />}

      {showModal && (
        <Modal onClose={toggleModal} src={largeImageURL} alt={title} />
      )}

      <ToastContainer theme="colored" position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
