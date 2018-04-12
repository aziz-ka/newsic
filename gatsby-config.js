const {
  BASE_PATH,
  DESCRIPTION,
  THEME_COLOR,
  TITLE
} = require('./config');


module.exports = {
  siteMetadata: {
    siteUrl: BASE_PATH,
    themeColor: THEME_COLOR,
    title: TITLE
  },
  plugins: [
    'gatsby-plugin-accessibilityjs',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-next',
    'gatsby-plugin-remove-trailing-slashes',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/sitemap.xml',
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            edges {
              node {
                path
              }
            }
          }
        }`
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: THEME_COLOR,
        showSpinner: false
      }
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        analyzerPort: 8888,
        openAnalyzer: true,
        production: true
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: TITLE,
        short_name: 'Newsic',
        description: DESCRIPTION,
        start_url: '/',
        background_color: '#fff',
        theme_color: THEME_COLOR,
        display: 'minimal-ui',
        icon: 'src/assets/favicon.png'
      }
    },
    'gatsby-plugin-offline'
  ]
};
