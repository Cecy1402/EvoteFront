import axios from "axios";

let url = process.env.VUE_APP_APIURL;
export default class VotoService {
  async vote(data) {
    return axios
      .post(url + `/ListInfo/vote_for_list/`, data, {
        headers: {
          Authorization: "token " + sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => res.data);
  }

  
}
