import React from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import Link, { navigateTo } from 'gatsby-link';
import moment from 'moment';
import {
  countries as countriesData,
  languages as languagesData
} from 'country-data';

import { categories, countries, languages, searchFacets, sortBy } from '../../constants';
import { capitalizeString, capitalizeCamelCaseString, isMobileScreenSize } from '../../utils';
import logo from '../../assets/logo.svg';
import menu from '../../assets/menu.svg';
import search from '../../assets/search.svg';
import './index.css';


export default class Header extends React.Component {
  state = {
    isAdvancedSearchExpanded: false,
    isMenuExpanded: false,
    domains: '',
    q: ''
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      domains: nextProps.searchParams.domains || '',
      q: nextProps.searchParams.q || ''
    };
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

  get sortByOptions() {
    return sortBy.map(value => ({ value, label: capitalizeCamelCaseString(value) }));
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleDateChange = (label, date) =>
    date && date.isValid() && navigateTo(this.props.addQueryParams({ [label]: date.format('YYYY-MM-DD') }))

  handleDropdownChange = (name, option) =>
    option && navigateTo(this.props.addQueryParams({ [name]: option.value || option.target.value }))

  handleSubmit = (name, e) => {
    e.preventDefault();
    navigateTo(this.props.addQueryParams({ [name]: this.state[name] }));
  }

  handleToggle = name => this.setState({ [name]: !this.state[name] })

  renderNativeOptions = ({ label, value }, key) => <option key={key} value={value}>{ label }</option>

  renderNativeSelect = name => (
    <select
      className='header__input--select form-control'
      id={`${name}-input`}
      name={name}
      onChange={this.handleDropdownChange.bind(this, name)}
      value={this.props.searchParams[name]}
    >
      <option value=''>Pick a { name === 'sortBy' ? 'Pick a sort order' : `Pick a ${name}` }</option>
      { this[`${name}Options`].map(this.renderNativeOptions) }
    </select>
  )

  renderReactSelect = name => (
    <Select
      clearable
      id={`${name}-input`}
      name={name}
      onChange={this.handleDropdownChange.bind(this, name)}
      options={this[`${name}Options`]}
      placeholder={name === 'sortBy' ? 'Pick a sort order' : `Pick a ${name}`}
      searchable
      value={this.props.searchParams[name]}
    />
  )

  renderSearchDropdowns = (name, key) => (
    <div className={`col-${name === 'domains' ? '12' : '6'} col-sm-3`} key={key}>
      <label className='header__label text-muted mt-3 mt-sm-2 mb-0' htmlFor={`${name}-input`}>
        { capitalizeCamelCaseString(name) }
      </label>
      { isMobileScreenSize ? this.renderNativeSelect(name) : this.renderReactSelect(name) }
    </div>
  )

  renderSearchInputs = name => {
    let displayName = name;
    let formClassName = 'col-xs-12 col-sm-4';
    let inputClassName = `header__input--${name} form-control`;
    let labelClassName = 'header__label text-muted mt-3 mb-0';

    if (name === 'q') {
      displayName = 'keyword';
      formClassName = '';
      labelClassName = 'sr-only';
    }

    return (
      <form className={formClassName} onSubmit={this.handleSubmit.bind(this, name)}>
        <label className={labelClassName} htmlFor={name}>
          { capitalizeCamelCaseString(displayName) }
        </label>
        <div className='input-group'>
          <input
            aria-label={`Search by ${displayName}`}
            className={inputClassName}
            id={name}
            name={name}
            onChange={this.handleChange}
            placeholder={`Search by ${displayName}`}
            required
            type='search'
            value={this.state[name]}
          />
          <button className={`header__btn header__btn--${name} btn input-group-append`} type='submit'>
            <img src={search} alt='Search icon' />
          </button>
        </div>
      </form>
    );
  }

  renderDatepickers = date => (
    <div className='col-6 col-sm-4' key={date}>
      <label className='header__label text-muted mt-3 mb-0' htmlFor={date}>
        { capitalizeCamelCaseString(date) }
      </label>
      <DatePicker
        className={`header__input--date header__input--${date} form-control`}
        customInput={isMobileScreenSize ? <input type='date'/> : null}
        dateFormatCalendar='MMMM'
        id={date}
        maxDate={moment().endOf('day')}
        name={date}
        onChange={this.handleDateChange.bind(this, date)}
        onChangeRaw={e => this.handleDateChange(date, moment(e.target.value))}
        placeholderText={`Pick a ${date} date`}
        required
        selected={this.props.searchParams[date] && moment(this.props.searchParams[date])}
        showYearDropdown
        scrollableYearDropdown
        value={this.props.searchParams[date]} />
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
        { this.renderSearchInputs('q') }
      </div>
      <div className={`
        header__advanced-search form-inline ml-auto mt-0 mt-sm-3 col-12 px-0
        ${this.state.isAdvancedSearchExpanded ? 'header__advanced-search--expanded' : ''}
      `}>
        <div className='row d-sm-flex'>
          { searchFacets.map(this.renderSearchDropdowns) }
          { this.renderSearchInputs('domains') }
          { ['from', 'to'].map(this.renderDatepickers) }
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
