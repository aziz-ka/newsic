const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

const languages = ['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'se', 'zh'];

const countries = [
  'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr',
  'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz',
  'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'
];

const sortBy = ['relevancy', 'popularity', 'publishedAt'];

const searchDefault = {
  category: '',
  country: 'us',
  domains: '',
  from: null,
  language: '',
  q: '',
  sortBy: '',
  sources: '',
  to: null
};

const searchFacets = ['category', 'country', 'language', 'sortBy'];

const everythingFacets = ['domains', 'from', 'language', 'q', 'sortBy', 'sources', 'to'];

const headlinesFacets = ['category', 'country'];


export {
  categories,
  countries,
  everythingFacets,
  languages,
  searchFacets,
  searchDefault,
  sortBy,
  headlinesFacets
};
