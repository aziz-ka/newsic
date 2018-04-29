import React from 'react';
import axios from 'axios';
import Link, { navigateTo } from 'gatsby-link';
import Select from 'react-select';

import Loader from '../Loader';
import { NEWS_API_URL_BASE } from '../../../config';
import './index.css';


export default class Sources extends React.Component {
  state = {
    sourcesList: null,
    sources: ''
  }

  componentDidMount = () => this.getSources()

  get sourceOptions() {
    return this.state.sourcesList.map(({ id, name }) => ({ value: id, label: name }));
  }

  getSources = () => {
    const apiURL = `${NEWS_API_URL_BASE}/sources`;
    const apiKey = process.env.GATSBY_NEWS_API_KEY;
    const params = { apiKey };

    axios
      .get(apiURL, { params })
      .then(res => this.setState({ sourcesList: res.data.sources }))
      .catch(err => console.error(err)); // eslint-disable-line no-console
  }

  handleDropdownChange = (name, { label, value }) => {
    this.setState({ [name]: label });
    navigateTo(`?${name}=${value}`);
  }

  renderSources = ({ id, name }, key) => (
    <Link className='list-group-item list-group-item-action p-1' key={key} to={`?sources=${id}`}>
      { name }
    </Link>
  )

  render = () => {
    const { sourcesList } = this.state;

    if (!sourcesList) return <Loader />;

    if (!sourcesList.length) return null;

    return (
      <aside className='sources-sidebar col-12 col-md-3 col-xl-2 pt-2'>
        <Select
          className='sources-input'
          clearable={false}
          name='sources'
          onChange={this.handleDropdownChange.bind(this, 'sources')}
          options={this.sourceOptions}
          placeholder='Pick a source'
          searchable
          value={this.props.searchParams.sources}
        />
        <div className='sources-list list-group p-2 px-sm-0 my-3 my-sm-0'>
          { sourcesList.map(this.renderSources) }
        </div>
      </aside>
    );
  }
}
