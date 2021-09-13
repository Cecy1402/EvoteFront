import axios from "axios";

let url = process.env.VUE_APP_APIURL;
export default class ResultService {
  async getResultsValidate(id) {
    return axios
        .get(url + `/ListInfo/?period=${id}`, {
          headers: {
            Authorization: "token " + sessionStorage.getItem("jwt"),
          },
        })
        .then((res) => res.data);
  }

  async getResultsNull(id) {
    return axios
        .get(url + `/voteInfo/?period=${id}`, {
          headers: {
            Authorization: "token " + sessionStorage.getItem("jwt"),
          },
        })
        .then((res) => res.data);
  }
  
}
