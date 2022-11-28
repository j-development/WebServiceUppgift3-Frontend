import { apiUrl } from '../constants/constants';

async function getPosts() {
  try {
    const data = await fetch(apiUrl + '/all')
      .then((response) => response.json())
      .then((data) => data);
    return [data, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
}

async function getPostById(postId) {
  try {
    const data = await fetch(apiUrl + '/post?postId=' + postId)
      .then((response) => response.json())
      .then((data) => data);
    return [data, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
}

async function updatePost(postId, content, token) {
  try {
    console.log('updatePost', postId, content, token);
    const response = await fetch(
      apiUrl + '/admin' + '/update?postId=' + postId,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          content: content,
        }),
      }
    );
    if (response.ok) {
      return response.json();
    }
    if (!response.ok) {
      throw new Error('Something went wrong during update', response.status);
    }
  } catch (error) {
    console.error(error);
    return [null, error];
  }
}

export { getPosts, getPostById, updatePost };
