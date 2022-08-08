import { ItemLi, ItemImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  onOpenModal,
}) => (
  <ItemLi
    onClick={() => {
      onOpenModal(largeImageURL);
    }}
  >
    <ItemImg src={webformatURL} alt={tags} />
  </ItemLi>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func,
};

export default ImageGalleryItem;
