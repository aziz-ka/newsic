import React from 'react';
import Select from 'react-select';
import Link, { navigateTo } from 'gatsby-link';
import {
  countries as countriesData,
  languages as languagesData
} from 'country-data';

import {
  categories,
  countries,
  languages
} from '../../constants';
import { capitalizeString } from '../../utils';
import logo from '../../assets/logo.svg';
import menu from '../../assets/menu.svg';
import search from '../../assets/search.svg';
import './index.css';


export default class Header extends React.Component {
  state = {
    isAdvancedSearchExpanded: false,
    isMenuExpanded: false,
    q: ''
  }

  get categoryOptions() {
    return categories.map(value => ({ value, label: capitalizeString(value) }));
  }

  get countryOptions() {
    return countries.map(value => ({ value, label: countriesData[value.toUpperCase()].name }));
  }

  get languageOptions() {
    return languages.map(value => ({ value, label: languagesData[value].name }));
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleDropdownChange = (name, { value }) => navigateTo(`?${name}=${value}`)

  handleSubmit = e => {
    e.preventDefault();
    navigateTo(`?q=${this.state.q}`);
    this.setState({ q: '' });
  }

  handleToggle = name => this.setState({ [name]: !this.state[name] })

  renderSearchDropdowns = (name, key) => (
    <div className='col-xs-12 col' key={key}>
      <label className='header__label text-muted mt-3 mt-sm-2 mb-0' htmlFor={`${name}-input`}>
        { capitalizeString(name) }
      </label>
      <Select
        clearable
        disabled={!!this.props.searchParams.sources && (name === 'category' || name === 'country')}
        id={`${name}-input`}
        name={name}
        onChange={this.handleDropdownChange.bind(this, name)}
        options={this[`${name}Options`]}
        placeholder={`Pick a ${name}`}
        searchable
        value={this.props.searchParams[name]}
      />
    </div>
  )

  renderCollapsibleMenu = () => (
    <div
      className={`collapse navbar-collapse py-1 mt-3 mt-sm-0 ${this.state.isMenuExpanded ? 'show' : ''}`}
      id='navbarSupportedContent'
    >
      <div className='navbar-nav ml-auto flex-column-reverse flex-sm-row'>
        <button
          className='header__advanced-search-toggle dropdown-toggle btn btn-link text-muted mt-3 mt-sm-0'
          onClick={this.handleToggle.bind(this, 'isAdvancedSearchExpanded')}
        >
          Advanced Search
        </button>
        <form className='form-inline flex-nowrap' onSubmit={this.handleSubmit}>
          <label className='sr-only' htmlFor='q'>Search keyword</label>
          <input
            aria-label='Search'
            className='header__input--query form-control'
            id='q'
            name='q'
            onChange={this.handleChange}
            placeholder='Search by keyword'
            required
            type='search'
            value={this.props.searchParams.q || this.state.q} />
          <button className='header__btn--search btn' type='submit'>
            <img src={search} alt='Search icon' />
          </button>
        </form>
      </div>
      <div className={`
        header__advanced-search form-inline ml-auto mt-0 mt-sm-3 col-12 px-0
        ${this.state.isAdvancedSearchExpanded ? 'header__advanced-search--expanded' : ''}
      `}>
        <div className='row d-block d-sm-flex'>
          { ['category', 'country', 'language'].map(this.renderSearchDropdowns) }
          <div className='col-12 mt-3 text-right'>
            <Link className='btn btn-link px-0' to='/'>Reset filters</Link>
          </div>
        </div>
      </div>
    </div>
  )

  render = () => (
    <header className='header navbar navbar-expand-sm navbar-light fixed-top bg-light'>
      <Link className='navbar-brand text-muted' to='/'>
        <img className='header__logo mr-2' src={logo} alt='Newsic Logo' />
        Newsic
      </Link>
      <button
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
        className='header__toggler navbar-toggler py-2'
        data-target='#navbarSupportedContent'
        data-toggle='collapse'
        onClick={this.handleToggle.bind(this, 'isMenuExpanded')}
        type='button'
      >
        <img src={menu} alt='Menu toggle icon' />
      </button>
      { this.renderCollapsibleMenu() }
    </header>
  )
}
