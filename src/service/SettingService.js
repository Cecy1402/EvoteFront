import axios from 'axios';

let url = process.env.VUE_APP_APIURL;

export default class SettingService {
  async getSettings() {
    return axios
      .get(url + `/Parameter/`, {
        headers: {
          Authorization: "token " + sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => res.data);

  }

  async patchSettings(id, data) {
    return axios
      .patch(url + `/Parameter/${id}/`, data, {
        headers: {
          Authorization: "token " + sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => res.data);

  }

}