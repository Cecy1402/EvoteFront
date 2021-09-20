<template>
  <div class="card">
    <div class="p-m-3">
      <Toast />
      <p class="p-text-center">
        <b>Información lista:</b>
      </p>
      <div class="p-d-flex p-ai-center p-jc-center">
        <div class="p-col-10">
          <div class="p-grid p-fluid p-ai-center p-jc-center">
            <div
              class="card p-col-2 p-mt-4 p-ai-center p-jc-center"
              style="height: 150px"
            >
              <!-- <FileUpload
                mode="basic"
                name="demo[]"
                url="./upload.php"
                accept="image/*"
                :maxFileSize="1000000"
                @upload="onUpload"
              /> -->
              <FileUpload
                mode="basic"
                name="demo[]"
                accept="image/*"
                :customUpload="true"
                :auto="true"
                @uploader="onUpload"
              />
              <img
                :src="fotoListaB64"
                width="100"
                height="100"
                alt="SIN FOTO"
              />
              <!-- <img src="assets/layout/images/logo.svg" alt="" /> ¡  -->
            </div>
            <div
              class="p-grid p-col-9 p-d-flex p-fluid p-ai-center p-jc-center"
            >
              <div class="p-col-3">
                <div class="p-field">
                  <span class="p-float-label">
                    <InputText id="inputtext" type="text" v-model="listName" />
                    <label for="inputtext">Nombre</label>
                  </span>
                </div>
              </div>
              <div class="p-field p-col-3">
                <span class="p-float-label">
                  <InputNumber
                    id="withoutgrouping"
                    v-model="listNumber"
                    mode="decimal"
                    :useGrouping="false"
                  />
                  <label for="withoutgrouping">Número</label>
                </span>
              </div>
              <div class="p-field p-col-4">
                <span class="p-float-label">
                  <Dropdown
                    v-model="periodSelected"
                    :options="periodos"
                    optionLabel="name"
                    optionValue="code"
                    :change="getCandidates()"
                  />
                  <label>Periodo</label>
                </span>
              </div>
              <div class="p-field p-col-10">
                <span class="p-float-label">
                  <InputText
                    id="float-input"
                    type="text"
                    v-model="listSlogan"
                  />
                  <label for="float-input">Slogan</label>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-m-1">
      <p class="p-text-center">
        <i class="pi pi-user p-mr-2"></i>
        <b>Información estudiante:</b>
      </p>
      <div class="p-d-flex p-ai-center p-jc-center">
        <TabView class="p-col-10" style="padding: 0rem">
          <TabPanel
            v-for="tab in tabs"
            :key="tab.position"
            :header="tab.position"
          >
            <div class="p-grid p-mt-2 p-fluid p-ai-center p-jc-center">
              <div
                class="card p-col-2 p-mr-2 p-mt-4 p-ai-center p-jc-center"
                style="height: 150px"
              >
                <FileUpload
                  mode="basic"
                  name="demo[]"
                  accept="image/*"
                  :auto="true"
                  :customUpload="true"
                  @uploader="subirImagenCandidatos($event, tab)"
                />
                <!-- @select="guardarEnCandidato($event, tab)" -->
                <img :src="tab.foto" width="100" height="100" />
              </div>
              <div
                class="p-grid p-col-9 p-d-flex p-fluid p-ai-center p-jc-center"
              >
                <div class="p-col-5">
                  <div class="p-field">
                    <div class="p-inputgroup">
                      <div class="p-float-label">
                        <InputText
                          type="text"
                          v-model="tab.student"
                          @blur="searchStudent(tab)"
                        />
                        <Button
                          icon="pi pi-search"
                          @click="searchStudent(tab)"
                        />
                        <label>Cédula</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="p-col-10">
                  <div class="p-field">
                    <span class="p-float-label">
                      <InputText type="text" v-model="tab.name" readonly />
                      <label>Nombre</label>
                    </span>
                  </div>
                </div>
                <div class="p-col-6">
                  <div class="p-field">
                    <span class="p-float-label">
                      <InputText type="text" v-model="tab.degree" readonly />
                      <label>Carrera</label>
                    </span>
                  </div>
                </div>
                <div class="p-col-4">
                  <div class="p-field">
                    <span class="p-float-label">
                      <InputText type="text" v-model="tab.course" readonly />
                      <label>Ciclo</label>
                    </span>
                  </div>
                </div>
              </div>
              <br />
              <p>
                Antes de dar clic en Guardar, complete la informacion de todos
                los candidatos
              </p>
            </div>
          </TabPanel>
        </TabView>
      </div>
      <br />
      <div class="p-grid p-jc-end p-d-flex p-col-10">
        <Button
          label="Cancelar"
          icon="pi pi-times"
          class="p-mr-2 p-button-secondary"
          @click="closeForm()"
        />
        <Button
          label="Guardar"
          icon="pi pi-check"
          class="p-button-success"
          @click="createList()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PeriodService from "../../service/PeriodService";
import UserService from "../../service/UserService";
import CandidateService from "../../service/CandidateService";
export default {
  props: ["candidateList"],
  data() {
    return {
      fotoListaB64: "",
      periodos: [],
      estudiantesCandidatos: null,
      listId: "",
      periodSelected: null,
      listName: "",
      listNumber: null,
      listSlogan: "",
      tabs: [
        {
          foto: "",
          student: "",
          name: "",
          degree: "",
          course: "",
          position: "PRESIDENTE",
        },
        {
          foto: "",
          student: "",
          name: "",
          degree: "",
          course: "",
          position: "VICEPRESIDENTE",
        },
        {
          foto: "",
          student: "",
          name: "",
          degree: "",
          course: "",
          position: "SECRETARIO",
        },
        {
          foto: "",
          student: "",
          name: "",
          degree: "",
          course: "",
          position: "TESORERO",
        },
        {
          foto: "",
          student: "",
          name: "",
          degree: "",
          course: "",
          position: "VOCAL I",
        },
        {
          foto: "",
          student: "",
          name: "",
          degree: "",
          course: "",
          position: "VOCAL II",
        },
        {
          foto: "",
          student: "",
          name: "",
          degree: "",
          course: "",
          position: "VOCAL III",
        },
      ],
    };
  },
  periodService: null,
  UserService: null,
  candidateService: null,

  created() {
    this.periodService = new PeriodService();
    this.candidateService = new CandidateService();
    this.userService = new UserService();
  },

  mounted() {
    this.getPeriod();

    if (this.candidateList != null) {
      this.fotoListaB64 = this.candidateList.foto;
      this.listId = this.candidateList.id;
      this.listName = this.candidateList.name;
      this.listNumber = this.candidateList.number;
      this.listSlogan = this.candidateList.slogan;
      this.periodSelected = this.candidateList.period;
      this.tabs.forEach((tab) => {
        this.candidateList.candidate_set.forEach((element) => {
          if (tab.position == element.position) {
            tab.id = element.id;
            tab.foto = element.foto;
            tab.student = element.student.identificacion;
            tab.name = element.student.nombres + "" + element.student.apellidos;
            tab.degree = element.student.carrera;
            tab.course = element.student.ciclo;
            tab.photo = element.student.photo;
            tab.listInfo = element.listInfo;
          }
        });
      });
    }
  },
  methods: {
    getCandidates() {
      if (this.periodSelected != null) {
        this.estudiantesCandidatos = [];
       
        this.candidateService
          .getCandidatesActuales(this.periodSelected)
          .then((candidates) => {
            candidates.results.forEach((element) => {
              element.candidate_set.forEach((element) => {
                this.estudiantesCandidatos.push(element.student);
              });
            });
          })
          .catch((err) => {
            console.log("ERROR: ", err);
          });
      }
    },
   
    subirImagenCandidatos(event, tab) {
      var reader = new FileReader();
      reader.readAsDataURL(event.files[0]);
      reader.onload = () => {
        tab.foto = reader.result;
      };
    },
    onUpload(event) {
      //console.log(event.files[0]);
      //console.log(typeof event.files[0]);

      var reader = new FileReader();
      reader.readAsDataURL(event.files[0]);
      reader.onload = () => {
        console.log(reader.result);
        this.fotoListaB64 = reader.result;
      };
    },
    searchStudent(student) {
      if (this.estudiantesCandidatos != null) {
        if (student.student.length == 10) {
          this.userService
            .UserSearch(student.student)
            .then((result) => {
              if (result.count == 1) {
                var alunmo = this.estudiantesCandidatos.find(
                  (element) =>
                    (element.identificacion = result.results[0].identificacion)
                );
                if (alunmo != null) {
                  this.$toast.add({
                    severity: "warn",
                    summary: "Mensaje de advertencia",
                    detail: "El estudiante ya se encuentra en una lista",
                    life: 3000,
                  });
                } else {
                  console.log(result);
                  student.name =
                    result.results[0].nombres +
                    " " +
                    result.results[0].apellidos;
                  student.degree = result.results[0].carrera;
                  student.course = result.results[0].ciclo;
                }
              } else {
                this.$toast.add({
                  severity: "warn",
                  summary: "Mensaje de advertencia",
                  detail: "No se encontro un estudiante con esa cedula",
                  life: 3000,
                });
                this.cleanStudent(student);
              }
            })
            .catch((err) => {
              console.log(err);
              this.$toast.add({
                severity: "error",
                summary: "Mensaje de error",
                detail: "Lo sentimos ocurrio un error",
                life: 3000,
              });
            });
        } else {
          this.cleanStudent(student);
          this.$toast.add({
            severity: "warn",
            summary: "Mensaje de advertencia",
            detail: "La Cedula debe tener 10 caracteres",
            life: 3000,
          });
        }
      } else {
        this.$toast.add({
          severity: "warn",
          summary: "Mensaje de advertencia",
          detail: "debe selecionar un Periodo",
          life: 3000,
        });
      }
    },
    cleanStudent(student) {
      student.name = "";
      student.degree = "";
      student.course = "";
    },
    getPeriod() {
      this.periodService
        .getPeriod()
        .then((period) => {
          this.periodos = period.results.map((element) => {
            return {
              name:
                element.startYear.substring(0, 4) +
                "/" +
                element.endYear.substring(0, 4),
              code: element.id,
            };
          });
        })
        .catch((error) => {
          console.log("ERROR: ", error);
        });
    },
    closeForm() {
      this.$emit("open-list", true);
    },
    createList() {
      let list = {};
      list.name = this.listName;
      list.number = this.listNumber;
      list.slogan = this.listSlogan;
      list.period = this.periodSelected;
      list.foto = this.fotoListaB64;
      list.candidate_set = this.tabs;
      if (this.candidateList != null) {
        this.candidateService
          .patchCandidates(this.listId, list)
          .then(() => {
            this.$toast.add({
              severity: "info",
              summary: "Mensaje informativo",
              detail: "Registro actualizado correctamente",
              life: 3000,
            });
            this.closeForm();
          })
          .catch((err) => {
            console.log("ERROR: ", err);
          });
      } else {
        this.candidateService
          .postCandidates(list)
          .then(() => {
            this.$toast.add({
              severity: "info",
              summary: "Mensaje informativo",
              detail: "Registro creado correctamente",
              life: 3000,
            });
            this.closeForm();
          })
          .catch((err) => {
            console.log("ERROR: ", err);
          });
      }
    },
    disabled() {
      /*  console.log(this.tabs.name);
      return this.tabs.name === "";
     */
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
