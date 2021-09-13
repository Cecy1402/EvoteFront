import axios from "axios";

let url = process.env.VUE_APP_APIURL;
export default class PeriodService {
  //traer un get de la base de datos
  async getPeriod() {
    return axios
      .get(url + `/Period`, {
        headers: {
          Authorization: "token " + sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => res.data);
  }
  //aqui es para crear mediante la api y hacer una conexion con la bd

  async postPeriod(data) {
    return axios
      .post(url + `/Period/`, data, {
        headers: {
          Authorization: "token " + sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => res.data);
  }

  async patchPeriod(id, data) {
    return axios
      .patch(url + `/Period/${id}/`, data, {
        headers: {
          Authorization: "token " + sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => res.data);
  }

  async deletePeriod(id) {
    return axios
      .delete(url + `/Period/${id}`, {
        headers: {
          Authorization: "token " + sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => res.data);
  }
  async searchPeriod(search) {
    return axios
      .get(url + `/Period/?search=${search}`, {
        headers: {
          Authorization: "token " + sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => res.data);
  }
}
