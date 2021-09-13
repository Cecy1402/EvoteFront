<template>
  <div class="">
    <div class="p-mt-2 p-d-flex p-jc-center p-fluid">
      <div class="p-field p-col-6" >
        <span class="p-float-label">
          <Calendar
            id="icon"
            v-model="startYear"
            :showIcon="true"
            dateFormat="dd/mm/yy"
          />
          <label for="icon">Fecha inicio</label>
        </span>
      </div>
      <div class="p-field p-col-6">
        <span class="p-float-label">
          <Calendar
            id="icon"
            v-model="endYear"
            :showIcon="true"
            dateFormat="dd/mm/yy"
          />
          <label for="icon">Fecha fin</label>
        </span>
      </div>
    </div>
    <div class="p-field p-col-6">
      <div class="p-field-checkbox" align="center">
        <label class="p-mr-2"> Periodo Actual: </label>
        <Checkbox id="binary" v-model="checked" :binary="true" />
        <!-- <label for="binary">{{checked}}</label> -->
      </div>
    </div>
    <div align="right" class="p-mt-3">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        class="p-mr-2 p-button-secondary"
        @click="closeForm()"
      />
      <Button
        label="Guardar"
        @click="createPeriod()"
        icon="pi pi-check"
        class="p-button-success"
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import PeriodService from "../../service/PeriodService";
export default {
  props: ["period"],
  data() {
    return {
      startYear: null,
      endYear: null,
      periodId: null,
      periodPresent: null,
      date6: null,
      checked: false,
    };
  },
  periodService: null,

  created() {
    this.periodService = new PeriodService();
  },

  mounted() {
    if (this.period != null) {
      this.startYear = this.period.startYear;
      this.endYear = this.period.endYear;
      this.periodId = this.period.id;
      this.checked = this.period.periodPresent ? true : false;
    }
  },

  methods: {
    closeForm() {
      this.$emit("open-list", false);
    },

    createPeriod() {
      let periodCreate = {};
      periodCreate.startYear = moment(this.startYear, "DD/MM/yyyy").format(
        "yyyy-MM-DD"
      );
      periodCreate.endYear = moment(this.endYear, "DD/MM/yyyy").format(
        "yyyy-MM-DD"
      );
      periodCreate.periodPresent = this.checked;
      console.log(periodCreate);
      if (this.period != null) {
        this.periodService
          .patchPeriod(this.period.id, periodCreate)
          .then((result) => {
            this.$toast.add({
              severity: "info",
              summary: "Info Message",
              detail: "Registro actualizado correctamente",
              life: 3000,
            });
            this.closeForm();
            console.log(result);
            console.log("aqui cierra");
          })
          .catch((err) => {
            console.log("ERROR: ", err);
          });
      } else {
        this.periodService
          .postPeriod(periodCreate)
          .then((result) => {
            this.$toast.add({
              severity: "info",
              summary: "Info Message",
              detail: "Registro creado correctamente",
              life: 3000,
            });
            this.closeForm();
            console.log(result);
            console.log("aqui cierra nuevo");
          })
          .catch((err) => {
            console.log("ERROR: ", err);
          });
      }
      this.$emit("get-period", true);
    },

    // cleanPeriod(periodList) {
    //   periodList.startYear = "";
    //   periodList.endYear = "";
    // },

    disabled() {
      /*  console.log(this.tabs.name);
      return this.tabs.name === "";
     */
    },
  },
};
</script>

<style scoped>
</style>
