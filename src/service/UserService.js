import axios from "axios";

let url = process.env.VUE_APP_APIURL;
export default class UserService {
  //traer un get de la base de datos
  async UserLogin(user, pass) {
    let result = await axios.post(url + `/Users/login/`, {
      username: user,
      password: pass,
    });
    return await result.data;
  }

  async UserSearch(id) {
    return axios
      .get(url + `/Users/?identificacion=${id}`, {
        headers: {
          Authorization: "token " + sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => res.data);
  }

  async UserYaVoto(data) {
    return axios
      .post(url + `/Students/ya_voto/`, data, {
        headers: {
          Authorization: "token " + sessionStorage.getItem("jwt"),
        },
      })
      .then((res) => res.data);

  }

  

  
}
