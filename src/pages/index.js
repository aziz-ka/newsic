import React from 'react';
import Helmet from 'react-helmet';

import App from '../components/App';


export default props => [
  <Helmet key='helmet'>
    <meta name='description' content='Latest News Headlines' />
    <title>Newsic | Search Latest News</title>
  </Helmet>,
  <App {...props} key='App' />
];
