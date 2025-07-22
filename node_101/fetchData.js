// fetchData.js

async function fetchData(apiUrl) {
  let data = null;
  return fetch(apiUrl)
    .then(response => {
      data = response.json();
      return data;
    })
    .catch(error => {
      console.error("Ocurrió un error:", error);
    });
}

export default fetchData;
