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
    const response = await fetch(apiUrl + '/admin/update?postId=' + postId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        content: content,
      }),
    });
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

async function createPost(title, content, token) {
  try {
    const response = await fetch(apiUrl + '/admin/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
    if (response.ok) {
      return response.json();
    }
    if (!response.ok) {
      throw new Error('Something went wrong during create', response.status);
    }
  } catch (error) {
    console.error(error);
    return [null, error];
  }
}

async function deletePost(postId, token) {
  try {
    const response = await fetch(apiUrl + '/admin/delete?postId=' + postId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    if (response.ok) {
    }
    if (!response.ok) {
      throw new Error('Something went wrong during delete', response.status);
    }
  } catch (error) {
    console.error(error);
    return [null, error];
  }
}

export { getPosts, getPostById, updatePost, createPost, deletePost };
