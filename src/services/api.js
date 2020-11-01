import axios from 'axios';

export default axios.create({
  // baseURL: window.location.href,
  baseURL: 'https://travelpcrtest.com',
  headers : {
      'Authorization' : 'Basic QXp1cmXEaWFtb45kOmh1bnRlcjO='
  }
});