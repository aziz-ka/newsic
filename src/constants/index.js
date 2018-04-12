const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

const languages = ['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'se', 'zh'];

const countries = [
  'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr',
  'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz',
  'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'
];

const searchDefault = {
  category: '',
  country: '',
  domains: '',
  fromDate: null,
  language: 'en',
  q: '',
  sortBy: '',
  sources: '',
  toDate: null
};


export {
  categories,
  countries,
  languages,
  searchDefault
};
