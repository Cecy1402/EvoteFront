import axios from "axios";

let url = process.env.VUE_APP_APIURL;
export default class CandidateService {
  //traer un get de la base de datos
  async getCandidates() {
    return axios
      .get(url + `/ListInfo`, {
        headers: {
          Authorization: "token " + sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => res.data);
  }
  async getCandidatesActuales(id) {
    return axios
      .get(url + `/ListInfo/?period=${id}`, {
        headers: {
          Authorization: "token " + sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => res.data);
  }
  async deleteCandidates(id) {
    return axios
      .delete(url + `/ListInfo/${id}`, {
        headers: {
          Authorization: "token " + sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => res.data);
  }
  //aqui es para crear mediante la api y hacer una conexion con la bd

  async postCandidates(data) {
    return axios
      .post(url + `/ListInfo/`, data, {
        headers: {
          Authorization: "token " + sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => res.data);
  }
  async patchCandidates(id, data) {
    return axios
      .patch(url + `/ListInfo/${id}/`, data, {
        headers: {
          Authorization: "token " + sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => res.data);
  }
  async searchCandidates(search) {
    return axios
      .get(url + `/ListInfo/?search=${search}`, {
        headers: {
          Authorization: "token " + sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => res.data);
  }

  //http://localhost:8000/api/v1.0/ListInfo/?search=edu
}
