export function fetchImage(imageName, page) {
  return fetch(
    `https://pixabay.com/api/?q=${imageName}&page=${page}&key=23281316-63779c8712cdbe982715f9396&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`There are no images for name ${imageName}`),
    );
  });
}

const api = { fetchImage };

export default api;
