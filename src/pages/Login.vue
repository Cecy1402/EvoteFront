<template  >
  <div
    id="parent"
    class="p-fluid"
    style="background-image: url(assets/layout/images/fondo2.jpg)"
  >
    <div id="child" class="p-d-flex p-ai-center p-jc-center">
      <div class="card" style="background-color: rgba(255, 255, 255, 0.7)">
        <div class="p-d-flex p-jc-center p-mt-3">
            <!-- style="height: 150px; width: 150px" -->
          <img
          style="width: 350px"
            src="assets/layout/images/Logo2.png"
            alt="logo instituto"
          />
        </div>
        <br />
        <h4 class="p-text-center p-mb-4">Bienvenido, por favor inicie sesion</h4>
        <div class="p-p-4">
          <span class="p-float-label p-input-icon-right p-mb-5">
            <i class="pi pi-user" />
            <InputText
              id="Username"
              type="text"
              v-model="username"
              @keypress="onKeypress"
            />
            <label for="User">Usuario</label>
          </span>

          <span class="p-float-label p-input-icon-right">
            <i class="pi pi-lock" />
            <Password
              :feedback="passIndocator"
              id="password"
              style="width: 100%"
              @keypress="onKeypress"
              v-model="password"
            />
            <label for="Password">Contraseña</label>
          </span>
          <ul v-if="error.length">
            <li>
              <p style="color: red">{{ error }}</p>
            </li>
          </ul>
          <div class="p-fluid p-mt-5 p-mb-4">
            <Button
              @click="goDashboard()"
              label="Ingresar"
              class="p-button-raised p-text-bold"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import LoginService from "../service/UserService";
import SettingService from "../service/SettingService";
export default {
  data() {
    return {
      error: [],
      passIndocator: false,
      username: "",
      password: "",
      horarios: "",
      fInicio: "",
      fFin: "",
    };
  },
  loginService: null,
  created() {
    this.loginService = new LoginService();
    this.settingService = new SettingService();
  },
  mounted() {
    //this.getSetting();
  },

  methods: {
    validateVoto(data, resp) {
      this.loginService
        .UserYaVoto(data)
        .then((result) => {
          console.log(result);
          if (result.vote) {
            sessionStorage.setItem("ya_voto", result.vote);
            
            sessionStorage.setItem("user", JSON.stringify(resp.user));
            //this.$router.push("/");
            window.location = "/";
          } else {
            var horaActual = moment().toDate();

            if (horaActual < this.fFin && horaActual > this.fInicio) {
              sessionStorage.setItem("user", JSON.stringify(resp.user));
              sessionStorage.setItem("ya_voto", result.vote);
              //this.$router.push("/votar");
              window.location = "/votar";
            } else {
              this.error = "Hora limite ";
            }
          }
        })
        .catch((err) => {
          console.log("Error login", err);
        });
    },
    onKeypress(e) {
      if (e.keyCode === 13) {
        this.goDashboard();
      } else {
        this.error = [];
      }
    },
    goDashboard() {
      if (this.username.length > 0) {
        if (this.password.length > 0) {
          this.loginService
            .UserLogin(this.username, this.password)
            .then((resp) => {
              if (resp.error) {
                this.error = resp.message;
              } else {
                if (resp.user.is_superuser) {
                  sessionStorage.setItem("jwt", resp.access_token);
                  sessionStorage.setItem("user", JSON.stringify(resp.user));
                  sessionStorage.setItem("is_superuser", true);
                  //this.$router.push("/");
                  window.location = "/";
                } else {
                  sessionStorage.setItem("is_superuser", false);
                  sessionStorage.setItem("jwt", resp.access_token);
                  this.getSetting(resp);
                 
                }
              }
            })
            .catch((error) => {
              console.log("Error login", error);
              this.error =
                "Lo sentimos estamos teniendo problemas con el servidor";
            });
        } else {
          this.error = "Por favor ingrese una contraseña";
        }
      } else {
        this.error = "Por favor ingrese un usuario";
      }
    },
    getSetting(resp) {
      this.settingService
        .getSettings()
        .then((settings) => {
          let result = settings.results;
          result.forEach((element) => {
            if (element.code == "HoraInicio") {
              this.fInicio = moment(element.value, "DD/MM/yyyy HH:mm").toDate();
              //this.hInicio.value = moment(this.hInicio.value).format("DD/MM/yyyy HH:mm")
            } else if (element.code == "HoraFin") {
              this.fFin = moment(element.value, "DD/MM/yyyy HH:mm").toDate();

              //   this.hFin.value =  moment(this.hFin.value).format("DD/MM/yyyy HH:mm")
            }

          });

           this.validateVoto({ id: resp.user.identificacion }, resp);
        })
        .catch((error) => {
          console.log("ERROR: ", error);
        });
    },
  },
};
</script>

<style >
html,
body {
  height: 100%;
}
#parent {
  width: 100%;
  height: 100%;
  display: flex;
}
#child {
  margin: auto;
}

label {
  color: black;
}
</style>
