import React from 'react';
import axios from 'axios';

import Loader from '../Loader';
import Sources from '../Sources';
import { getTimeDifference } from '../../utils';
import { NEWS_API_URL_BASE } from '../../../config';
import './index.css';


export default class IndexPage extends React.Component {
  state = { articlesList: null }

  componentDidMount = () => this.getHeadlines()

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.location.search !== this.props.location.search) this.getHeadlines()
  }

  getHeadlines = () => {
    const apiURL = `${NEWS_API_URL_BASE}/top-headlines`;
    const apiKey = process.env.GATSBY_NEWS_API_KEY;
    const { category, country, language, q, sources } = this.props.searchParams;
    const params = {
      apiKey,
      category,
      country,
      language,
      q,
      sources
    };

    axios
      .get(apiURL, { params })
      .then(res => this.setState({ articlesList: res.data.articles }))
      .catch(err => console.error(err));
  }

  renderArticles = ({ author, description, publishedAt, source, title, url, urlToImage }, key) => (
    (title && description) &&
    <a href={url} className='list-group-item list-group-item-action align-items-start' key={key} target='_blank'>
      <div className='row'>
        <div className='col-12 col-md-2 px-0'>
          <img alt={title} className='articles__image' src={urlToImage} />
        </div>
        <div className='col-12 col-md-10 px-0 pl-md-3 pr-md-0'>
          <div className='row'>
            <h5 className='col-10'>{ title }</h5>
            <small className='articles__timestamp col-2 order-last order-md-0 col-12 col-md-2 text-right text-muted'>
              <em>{ getTimeDifference(publishedAt) }</em>
            </small>
            <p className='col-12 mb-2'>{ description }</p>
            <small className='col text-muted'>{ author }</small>
            <small className='col text-right text-muted'>{ source.name }</small>
          </div>
        </div>
      </div>
    </a>
  )

  render = () => {
    const { articlesList } = this.state;

    if (!articlesList) return <Loader />;

    return (
      <div className='row'>
        <Sources {...this.props} />
        <section className='articles col'>
          <div className='list-group'>
            {
              articlesList.length
                ? articlesList.map(this.renderArticles)
                : <div className='alert alert-warning' role='alert'>No news found :/</div>
            }
          </div>
        </section>
      </div>
    );
  }
}
