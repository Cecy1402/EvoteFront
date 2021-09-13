import axios from "axios";

let url = process.env.VUE_APP_APIURL;
export default class StudentService {
  //traer un get de la base de datos
  async searchStudent(ci) {
    return axios
      .get(url + `/Student/?search==${ci}`, {
        headers: {
          Authorization: "token " + sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => res.data);
  }
  async getStudent() {
    return axios
      .get(url + `/Student`, {
        headers: {
          Authorization: "token " + sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => res.data);
  }
}
