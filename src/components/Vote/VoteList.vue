<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="p-m-3">
        <h3>Votación estudiantil</h3>

        <Dialog header="Información" :visible.sync="displayAcept" :breakpoints="{ '960px': '75vw' }" :modal="true">
          <!-- :style="{ width: '350px' }" -->
          <div class="confirmation-content ">
            <p><strong>Voto guardado exitosamente!</strong></p>
            <p>Sera redirigido al login</p>
            <p>Inicie sesion nuevamente para ver los resultados </p>
          </div>

           <template #footer>
           
            <Button label="Aceptar" icon="pi pi-check" @click="logout()" class="p-button-success" />
          </template>
        </Dialog>
        <Dialog
          header="Corfirmar voto"
          :visible.sync="displayConfirmVote"
          :style="{ width: '350px' }"
          :modal="true"
        >
          <div class="confirmation-content">
            <i
              class="pi pi-exclamation-triangle p-mr-3"
              style="font-size: 2rem"
            />
            <span>Estas seguro que deseas continuar? </span>
          </div>
          <template #footer>
            <Button
              label="No"
              icon="pi pi-times"
              @click="cancel()"
              class="p-button-text p-button-success"
            />
            <Button label="Si" icon="pi pi-check" class="p-button-success" @click="confirmVote()" />
          </template>
        </Dialog>

        <DataView
          :value="candidatesList"
          :layout="layout"
          :paginator="true"
          :rows="3"
        >
          <template #grid="list">
            <div class="p-md-4">
              <div class="list-grid-item card">
                <div align="right">
                  <Button
                    class="p-button-link"
                    label="Ver list"
                    icon="pi pi-external-link"
                    @click="mostrarModal(list.data)"
                    style="color: blue"
                  />
                </div>

                <div class="list-grid-item-header">
                  <div class="list-name p-d-flex p-jc-center">
                    <h3>{{ list.data.name }} - {{ list.data.number }}</h3>
                  </div>
                  <div class="list-name p-text-center p-mb-3">
                    <!-- <h6>{{ list.data.candidate_set }}</h6> -->
                    <h5>
                      {{ list.data.candidate_set[0].student.nombres }}
                      {{ list.data.candidate_set[0].student.apellidos }}
                    </h5>

                    <!-- <h6> </h6> -->
                  </div>
                </div>
                <div class="list-grid-item-content">
                  <div class="list-img p-d-flex p-jc-center p-mb-3">
                    <img
                      :src="list.data.foto"
                     alt="SIN FOTO"
                      width="100" height="100" 
                      style=" border-radius:150px;"
                    />
                  </div>
                  <!-- <h6>djhj{{ list.data.candidate_set[0].listInfo }}</h6> -->

                  <!-- <img
                    style="border-radius: 100%; width: 200px; height: 200px"
                    :src="'assets/layout/images/' + list.data.img"
                    :alt="list.name"
                  /> 
                  <img
                    :src="
                      'assets/layout/images/' + list.data.candidates[0].photo
                    "
                    :alt="list.name"
                  />-->
                  <div class="list-position p-d-flex p-jc-center">
                    {{ list.data.candidate_set[0].position }}
                  </div>

                  <div class="p-d-flex p-jc-center p-mb-4 p-mt-4">
                    <div>
                      <Button
                        label="Votar"
                        class="p-ml-auto p-text-bold"
                        @click="voteStudent(list.data.id)"
                        icon="pi pi-check"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>

        <div class="p-d-flex p-p-3">
          <Button
            label="Votar blanco"
            class="p-mr-2 p-button-warning p-text-bold"
            @click="voteBlanco()"
          />
          <Button
            label="Votar nulo"
            class="p-button-success p-text-bold"
            @click="voteNull()"
          />
          <!-- <Button label="Emitir voto" class="p-ml-auto" /> -->
        </div>

        <Dialog
          :header="nameList"
          :visible.sync="mostrarModalCandidatos"
          :style="{ width: '50vw' }"
          :modal="true"
        >
          <info-list :infoList="infoLi.candidate_set" />

          <template #footer>
            <Button
              label="Aceptar"
              @click="close()"
              icon="pi pi-check"
              class="p-button-success"
            />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>
<script>
import CandidateService from "../../service/CandidateService";
import InfoList from "../Vote/InfoList.vue";
import VotoService from "../../service/VotoService";
export default {
  components: { InfoList },
  data() {
    return {
      displayConfirmVote: false,
      student: JSON.parse(sessionStorage.getItem("user")).identificacion,
      candidatesList: null,
      displayAcept: false,
      nameList: "",
      infoLi: [],
      layout: "grid",
      sortKey: null,
      mostrarModalCandidatos: false,
      vote: {},
    };
  },
  candidateService: null,
  votoService: null,
  created() {
    this.votoService = new VotoService();
    this.candidateService = new CandidateService();
  },

  mounted() {
    this.getCandidates();
    //   this.candidateService
    //     .getCandidates()
    //     .then((candidates) => (this.candidates = candidates.results));
  },
  methods: {
 
     cancel() {
      this.displayConfirmVote = false;
    },
    confirmVote() {
      this.displayConfirmVote = false;

      this.votar(this.vote);
    },

    mostrarModal(cList) {
      //console.log(cList);
      this.mostrarModalCandidatos = true;
      this.nameList = cList.name + " - " + cList.number;
      this.infoLi = cList;
    },
    close() {
      this.mostrarModalCandidatos = false;
    },
    getCandidates() {
      this.candidateService
        .getCandidatesActuales(sessionStorage.getItem("period_id"))
        .then((candidates) => {
          
          this.candidatesList = candidates.results;
        })
        .catch((error) => {
          console.log("ERROR: ", error);
        });
    },

    voteBlanco() {
      var data = {};
      data.student = this.student;
      data.white_vote = "1";
      this.vote = data;
      this.displayConfirmVote = true;

      //this.votar(data);
    },
    voteNull() {
      var data = {};
      data.student = this.student;
      data.null_vote = "1";

      this.vote = data;
      this.displayConfirmVote = true;

      //this.votar(data);
    },

    voteStudent(list_id) {
      var data = {};
      data.student = this.student;
      data.list_id = list_id;
      this.vote = data;
      this.displayConfirmVote = true;

      //this.votar(data)
    },

    votar(data) {
      this.votoService
        .vote(data)
        .then((result) => {
          //console.log(result);
          this.displayAcept = true;
          setTimeout(() => this.logout(), 10000);
          //this.logout();
        })
        .catch((err) => {
          console.log("ERROR: ", err);
        });
    },

    logout() {
      sessionStorage.removeItem("jwt");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("is_superuser");
      sessionStorage.removeItem("periodo_id");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
</style>