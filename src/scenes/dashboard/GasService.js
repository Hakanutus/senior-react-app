import axios from 'axios';

const baseURL = 'http://127.0.0.1:5000/'; // Replace with your API base URL

class GasService {
  getAllGases() {
    return axios
      .get(`${baseURL}/values`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  postReport(date, field) {
    const url = `${baseURL}/reports`;
    const data = { Date: date, Field: field };

    return axios
      .post(url, data)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
}
export default GasService;
