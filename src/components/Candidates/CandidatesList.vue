<template>
  <div class="card">
    <Toast />
    <Dialog
      header="Confirmación"
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
          label="No"
          icon="pi pi-times"
          @click="closeConfirmation()"
          class="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          @click="deleteList()"
          class="p-button-text p-button-danger"
          autofocus
        />
      </template>
    </Dialog>

    <div class="p-m-3">
      <h3>Listas de candidatos</h3>
      <div class="p-d-flex p-jc-end">
        <div class="p-mr-2">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              type="text"
              v-model="searchCan"
              placeholder="Buscar nombre o slogan"
              @keyup="searchCandidate(searchCan)"
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
        :value="candidatesList"
        :expandedRows.sync="expandedRows"
        dataKey="id"
        responsiveLayout="scroll"
        :paginator="true"
        :rows="5"
        :sortOrder="1"
      >
        <Column :expander="true" headerStyle="width: 1rem" />
        <Column field="created" header="FECHA CREADO" />
        <Column field="name" header="NOMBRE" />
        <Column field="number" header="NÚMERO" />
        <Column field="slogan" header="SLOGAN" />
        <Column field="period" header="PERIODO" />
        <Column>
          <template #body="slotProps">
            <Button
              icon="pi pi-user-edit"
              class="p-button-warning p-mr-2"
              @click="updateList(slotProps.data)"
            />
            <!-- <Button
              icon="pi pi-trash"
              class="p-button-danger"
              @click="deleteList(slotProps.data.id)"
            /> -->
          </template>
        </Column>

        <template #expansion="slotProps">
          <span class="p-text-bold">MIEMBROS: </span>
          <DataTable
            :value="slotProps.data.candidate_set"
            dataKey="id"
            responsiveLayout="scroll"
          >
            <!-- <h2>{{ slotProps.data.candidate_set}}</h2> -->
            <Column field="student.nombres">
              <template #header> NOMBRES</template>
            </Column>
            <Column field="student.apellidos">
              <template #header> APELLIDOS </template>
            </Column>
            <Column field="student.carrera">
              <template #header> CARRERA </template>
            </Column>
            <Column field="student.ciclo">
              <template #header> CICLO </template>
            </Column>
            <Column field="student.paralelo">
              <template #header> PARALELO </template>
            </Column>
            <Column field="photo">
              <template #header> FOTO </template>
            </Column>
            <Column field="position">
              <template #header> CARGO </template>
            </Column>
          </DataTable>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script>
import CandidateService from "../../service/CandidateService";
import moment from "moment";
export default {
  data() {
    return {
      displayConfirmation: false,
      searchCan: "",
      candidatesList: [],
      expandedRows: [],
    };
  },
  candidateService: null,
  created() {
    this.candidateService = new CandidateService();
  },
  mounted() {
    this.getCandidates();
  },
  methods: {
    searchCandidate(e) {
      if (e.length > 1) {
        this.candidateService
          .searchCandidates(e)
          .then((candidates) => {
            candidates.results.forEach((element) => {
              element.created = moment(element.created).format(
                "DD/MM/yyyy hh:mm"
              );
            });
            this.candidatesList = candidates.results;
          })
          .catch((error) => {
            console.log("ERROR: ", error);
          });
      } else {
        this.getCandidates();
      }
    },
    openConfirmation(dataId) {
      this.idEliminar = dataId;
      this.displayConfirmation = true;
    },
    closeConfirmation() {
      this.displayConfirmation = false;
    },
    deleteList() {
      this.candidateService
        .deleteCandidates(this.idEliminar)
        .then(() => {
          //  result;
          this.$toast.add({
            severity: "info",
            summary: "info Message",
            detail: "Eliminado correctamente",
            life: 3000,
          });
          this.getCandidates();
          this.closeConfirmation();
        })
        .catch((error) => {
          console.log("ERROR: ", error);
        });
    },

    updateList(list) {
      this.$emit("update-list", list);
    },
    getCandidates() {
      this.candidateService
        .getCandidates()
        .then((candidates) => {
          candidates.results.forEach((element) => {
            element.created = moment(element.created).format(
              "DD/MM/yyyy hh:mm"
            );
          });
          this.candidatesList = candidates.results;
        })
        .catch((err) => {
          console.log("ERROR: ", err);
        });
    },
    openForm() {
      this.$emit("open-form", false);
    },
  },
};
</script>
<style scoped>
</style>
