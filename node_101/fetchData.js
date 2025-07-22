// fetchData.js

function fetchData(apiUrl) {
  let data = null;
   fetch(apiUrl)
    .then(response => {
      data = response.json();
      return data;
    })
    .catch(error => {
      console.error("Ocurrió un error:", error);
    });
}

export default fetchData;
