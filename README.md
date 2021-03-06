# [Newsic | Interactive News Dashboard](https://newsic.surge.sh)


## Stack

- Gatsby
- React
- Bootstrap 4
- Netlify
- News API
- Surge


#### Quick Start

```shell
$ git clone git@github.com:azizka/newsic.git
$ cd newsic
$ touch .env.development # add your NewsAPI key here as GATSBY_NEWS_API_KEY=your_api_key
$ yarn
$ yarn start
```

#### Build and serve the app:

```shell
$ yarn build
$ yarn serve
```


#### Yarn/NPM Commands

|Script|Description|
|---|---|
|`yarn build`|Build the app to `./public`|
|`yarn deploy`|Deploy the app to [https://newsic.surge.sh](https://newsic.surge.sh)|
|`yarn start`|Start the app on `localhost:8000`|
|`yarn serve`|Serve the app on `localhost:9000`|
|`yarn test`|Run tests and code coverage|


### To-Do:

- [ ] Pagination
- [ ] Tests
- [ ] Iframe article modal
- [x] Complex search query params
