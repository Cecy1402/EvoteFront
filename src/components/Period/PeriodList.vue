<template>
  <!-- <h3>COMPONENTE PARA LISTAR LOS PERIODOS</h3> -->
  <div class="card">
    <Toast />

    <Dialog
      header="Eliminar"
      :visible.sync="displayConfirmation"
      :style="{ width: '350px' }"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-info-circle p-mr-3" style="font-size: 2rem" />
        <span>Estas seguro que deseas continuar?</span>
      </div>
      <template #footer>
        <Button
          label="NO"
          icon="pi pi-times"
          @click="closeConfirmation()"
          class="p-button-text"
        />
        <Button
          label="SI"
          icon="pi pi-check"
          @click="deleteList()"
          class="p-button p-button-danger"
        />
      </template>
    </Dialog>
    <div class="p-m-3">
      <h3>Periodos</h3>
      <div class="p-d-flex">
        <h6 class="p-as-end">
          <strong>PERIODO ACTUAL: </strong>{{ presentYear.startYear }}-{{
            presentYear.endYear
          }}
        </h6>
        <div class="p-mr-2 p-ml-auto">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              type="text"
              v-model="searchPer"
              @keyup="searchPeriod(searchPer)"
              placeholder="Buscar año inicio o fin"
            />
          </span>
        </div>
        <Button
          label="Nuevo "
          icon="pi pi-plus"
          iconPos="left"
          align="right"
          @click="openForm()"
        />
      </div>

      <br />
      <DataTable
        :value="periodList"
        responsiveLayout="scroll"
        :paginator="true"
        :rows="5"
      >
        <Column field="created" header="FECHA CREADO" />
        <Column field="startYear" header="AÑO INICIO" />
        <Column field="endYear" header="AÑO FIN" />
        <Column>
          <template #body="period">
            <Button
              icon="pi pi-user-edit"
              @click="patchPeriod(period.data)"
              class="p-button-warning p-mr-2"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import PeriodService from "../../service/PeriodService";
import moment from "moment";

export default {
  props: ["getDisplay"],
  data() {
    return {
      displayConfirmation: false,
      periodList: [],
      searchPer: "",
      presentYear: "",
    };
  },
  watch: {
    getDisplay: function () {
      this.getPeriod();
      this.$emit("get-list", false);
    },
  },
  periodService: null,
  created() {
    this.periodService = new PeriodService();
  },
  mounted() {
    this.getPeriod();
  },
  methods: {
    searchPeriod(e) {
      if (e.length > 1) {
        this.periodService
          .searchPeriod(e)
          .then((period) => {
            period.results.forEach((element) => {
              element.created = moment(element.created).format(
                "DD/MM/yyyy hh:mm"
              );
              element.startYear = moment(element.startYear).format(
                "DD/MM/yyyy"
              );
              element.endYear = moment(element.endYear).format("DD/MM/yyyy");
            });
            this.periodList = period.results;
          })
          .catch((err) => {
            console.log("ERROR", err);
          });
      } else {
        this.getPeriod();
      }
    },
    openConfirmation(dataId) {
      this.idEliminar = dataId;
      this.displayConfirmation = true;
    },
    closeConfirmation() {
      this.displayConfirmation = false;
    },
    openForm() {
      this.$emit("open-form", true);
    },
    getPeriod() {
      this.periodService
        .getPeriod()
        .then((period) => {
          period.results.forEach((element) => {
            if (element.periodPresent) {
              this.presentYear = element;
            }
            return this.presentYear;
          });
          period.results.forEach((element) => {
            element.created = moment(element.created).format(
              "DD/MM/yyyy hh:mm"
            );
            element.startYear = moment(element.startYear).format("DD/MM/yyyy");
            element.endYear = moment(element.endYear).format("DD/MM/yyyy");
          });
          this.periodList = period.results;
        })
        .catch((error) => {
          console.log("ERROR: ", error);
        });
    },
    patchPeriod(data) {
      //emit sirve para enviarle un mensaje al padre
      this.$emit("patch-period", data);
    },
  },
};
</script>

<style scoped>
</style>
