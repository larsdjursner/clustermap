const API_URI = "http://localhost:8000"

const fetchLocationFeatures = async () => {
  return await fetch(`${API_URI}/locations`)
    .then((response) => response.json())
};

export default fetchLocationFeatures;
