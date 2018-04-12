import React from 'react';
import Link from 'gatsby-link';

import logo from '../../assets/logo.svg';
import './index.css';


const Footer = () => (
  <footer className='footer navbar navbar-light bg-light p-0'>
    <div className='col'>
      <Link className='footer__root-nav navbar-brand text-muted' to='/'>
        <img className='footer__logo' src={logo} alt='Newsic Logo' />
        <span className='footer__divider px-3'>|</span>
        Newsic
      </Link>
    </div>
  </footer>
);

export default Footer;
