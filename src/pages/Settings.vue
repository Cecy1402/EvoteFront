<template>
  <div class="card">
    <div class="p-m-3">
      <Toast />
      <h3>Configuración</h3>
      <div class="">
        <div class="p-m-3">
          <div class="p-d-flex p-jc-center">
            <h5 class="p-text-bold p-mr-2 p-as-center">Inicio:</h5>
            <div class="p-field p-col-3">
              <span class="p-float-label">
                <Calendar
                  v-model="hInicio.value"
                  :showTime="true"
                  dateFormat="dd/mm/yy"
                />
                <label>dia / hora</label>
              </span>
            </div>
            <h5 class="p-text-bold p-mr-2 p-ai-center">Fin:</h5>
            <div class="p-field p-col-3">
              <span class="p-float-label">
                <Calendar
                  v-model="hFin.value"
                  :showTime="true"
                  dateFormat="dd/mm/yy"
                />
                <label>dia / hora</label>
              </span>
            </div>
          </div>

          <br />

          <div align="right" class="p-col-10">
            <Button
              label="Actualizar"
              @click="updateSettings()"
              icon="pi pi-check"
              class="p-button-success"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import SettingService from "../service/SettingService";
export default {
  data() {
    return {
      settingsList: [],
      hInicio: {},
      hFin: {},
    };
  },
  settingService: null,
  created() {
    this.settingService = new SettingService();
  },
  mounted() {
    this.getSettings();
  },
  methods: {
    getSettings() {
      this.settingService
        .getSettings()
        .then((settings) => {
          let result = settings.results;

          result.forEach((element) => {
            if (element.code == "HoraInicio") {
              this.hInicio = element;
              //this.hInicio.value = moment(this.hInicio.value).format("DD/MM/yyyy HH:mm")
            } else if (element.code == "HoraFin") {
              this.hFin = element;
              //   this.hFin.value =  moment(this.hFin.value).format("DD/MM/yyyy HH:mm")
            }
          });

          this.settingsList = settings.results;
          // console.log(result)
        })
        .catch((err) => {
          console.log("ERROR: ", err);
        });
    },
    update(id, obj) {
      this.settingService
        .patchSettings(id, obj)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log("ERROR: ", err);
        });
    },

    updateSettings() {
      var hInit = {
        value: moment(this.hInicio.value, "DD/MM/yyyy HH:mm").format(
          "DD/MM/yyyy HH:mm"
        ),
      };
      var hEnd = {
        value: moment(this.hFin.value, "DD/MM/yyyy HH:mm").format(
          "DD/MM/yyyy HH:mm"
        ),
      };
      this.update(this.hInicio.id, hInit);
      this.update(this.hFin.id, hEnd);
      this.$toast.add({
        severity: "info",
        summary: "Mensaje informativo",
        detail: "Actulizado Correctamente",
        life: 3000,
      });
    },
  },
};
</script>

<style scoped>
p {
  margin-bottom: 20px;
}
</style>
