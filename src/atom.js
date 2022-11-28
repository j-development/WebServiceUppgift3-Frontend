import { atom } from 'recoil';
const selectedPost = atom({
  key: 'selectedPost',
  default: null,
});

const isLoggedIn = atom({
  key: 'isLoggedIn',
  default: false,
});

const accessToken = atom({
  key: 'accessToken',
  default: '',
});

export { selectedPost, isLoggedIn, accessToken };
