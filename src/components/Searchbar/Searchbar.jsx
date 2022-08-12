import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { SearchbarHead, Form, Button, Input } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleNameChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.warn('Please enter a name for the picture or photo!');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchbarHead onSubmit={handleSubmit}>
      <Form>
        <Button type="submit">
          <ImSearch style={{ width: 25, height: 25 }} />
        </Button>
        <Input
          type="text"
          name="query"
          autocomplete="off"
          placeholder="Search images and photos"
          value={query}
          onChange={handleNameChange}
        />
      </Form>
    </SearchbarHead>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
