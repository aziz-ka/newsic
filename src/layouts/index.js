import React from 'react';
import Helmet from 'react-helmet';
import qs from 'qs';

import { KEYWORDS, DESCRIPTION, TITLE } from '../../config';
import { searchDefault } from '../constants';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-select/dist/react-select.css';
import './index.css';

export default class TemplateWrapper extends React.Component {
  state = searchDefault

  static getDerivedStateFromProps(nextProps, prevState) {
    const searchQuery = qs.parse(nextProps.location.search, { ignoreQueryPrefix: true });

    if (!Object.keys(searchQuery).length) return { ...prevState, ...searchDefault }

    const newSearchParams = Object.keys(prevState).reduce((result, value) => {
      result[value] = searchQuery[value];
      return result;
    }, {});

    return newSearchParams;
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
      <Header {...{...this.props, searchParams: this.state}} />
      <main className='container-fluid'>
        { this.props.children({...{...this.props, searchParams: this.state}}) }
      </main>
      <Footer />
    </div>
  );
}
