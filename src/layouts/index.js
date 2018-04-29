import React from 'react';
import Helmet from 'react-helmet';
import qs from 'qs';

import { KEYWORDS, DESCRIPTION, TITLE } from '../../config';
import { everythingFacets, searchDefault, headlinesFacets } from '../constants';
import { sanitizeObj } from '../utils';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

export default class TemplateWrapper extends React.Component {
  state = searchDefault

  static getDerivedStateFromProps(nextProps, prevState) {
    const searchQuery = qs.parse(nextProps.location.search, { ignoreQueryPrefix: true });

    if (!Object.keys(searchQuery).length) return { ...prevState, ...searchDefault };

    const newSearchParams = Object.keys(prevState).reduce((result, value) => {
      result[value] = searchQuery[value];
      return result;
    }, {});

    return newSearchParams;
  }

  get allProps() {
    return {
      ...this.props,
      searchParams: this.state,
      addQueryParams: this.addQueryParams
    };
  }

  addQueryParams = param => {
    const isHeadlinesParam = headlinesFacets.includes(Object.keys(param)[0]);
    const facets = isHeadlinesParam ? headlinesFacets : everythingFacets;
    const newSearchQuery = facets.reduce((result, value) => {
      result[value] = this.state[value];
      return result;
    }, {});

    return `?${qs.stringify({ ...sanitizeObj(newSearchQuery), ...param })}`;
  }

  render = () => (
    <div>
      <Helmet
        title={TITLE}
        meta={[
          { name: 'description', content: DESCRIPTION },
          { name: 'keywords', content: KEYWORDS },
          { name: 'msapplication-TileColor', content: '#ffc40d' }
        ]}
      >
        <html lang='en' />
      </Helmet>
      <Header {...this.allProps} />
      <main className='container-fluid'>
        { this.props.children({...this.allProps}) }
      </main>
      <Footer />
    </div>
  );
}
