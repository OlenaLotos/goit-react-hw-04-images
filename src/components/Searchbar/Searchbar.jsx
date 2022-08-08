import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { SearchbarHead, Form, Button, Input } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handleNameChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
      toast.warn('Please enter a name for the picture or photo!');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <SearchbarHead onSubmit={this.handleSubmit}>
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
            onChange={this.handleNameChange}
          />
        </Form>
      </SearchbarHead>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
