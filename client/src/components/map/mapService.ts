const apiTest = async () => {
  return await fetch("http://localhost:8000/locations")
    .then((response) => response.json())
//     .then((data) => {
//       console.log("Success:", data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
};

export default apiTest;
