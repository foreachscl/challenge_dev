// fetchData.js

function fetchData(apiUrl) {
  let data = null;
  fetch(apiUrl)
    .then(response => {
      data = response.json();
      return data;
    })
    .then(result => {
      console.log("Datos recibidos:", data);
      return data;
    })
    .catch(error => {
      console.error("Ocurrió un error:", error);
    });
}

export default fetchData;
