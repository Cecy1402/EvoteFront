<template>
  <div class="p-grid">
    <div class="p-col-12">
      <div class="card">
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <div class="p-m-3">
        <h3>Estudiantes que votaron</h3>
        <div class="p-d-flex p-jc-end p-mr-2">
          <div class="">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                type="text"
                v-model="searchStudent"
                placeholder="Search"
              />
            </span>
          </div>
        </div>
        <br />
        <DataTable class="p-m-3"
          :value="studentList"
          dataKey="id"
          responsiveLayout="scroll"
          :paginator="true"
          :rows="5"
        >
          <Column headerStyle="width: 3rem" />
          <Column field="studentName" header="NOMBRE" />
          <Column field="ci" header="CÉDULA" />
          <Column field="degreeName" header="CARRERA">
            <template #body="studentList">
             {{studentList.data.degree.degreeName}}
            </template> 
          </Column>
          <Column field="course" header="CICLO" />
          <Column field="classroom" header="PARALELO" />
          <!-- 
            
            <template #expansion="slotProps">
            <span>Participates: </span>

            <DataTable
              :value="slotProps.data.candidate_set"
              dataKey="id"
              responsiveLayout="scroll"
            >
              <Column field="name">
                <template #header> NOMBRE </template>
              </Column>
              <Column field="degree">
                <template #header> CARRERA </template>
              </Column>
              <Column field="course">
                <template #header> CURSO </template>
              </Column>
              <Column field="photo">
                <template #header> FOTO </template>
              </Column>
              <Column field="position">
                <template #header> CARGO </template>
              </Column>
            </DataTable>
          </template> -->
        </DataTable>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import StudentService from "../../service/StudentService";
export default {
  data() {
    return {
      studentList: [],
    };
  },
  studentService: null,
  created() {
    this.studentService = new StudentService();
    this.getStudent();
  },
  mounted() {
  
  },
  methods: {
    getStudent() {
      this.studentService
        .getStudent()
        .then((students) => {
          this.studentList = students.results;
        })
        .catch((err) => {
          console.log("ERROR: ", err);
        });
    },
  },
};
</script>


<style scoped>
</style>
