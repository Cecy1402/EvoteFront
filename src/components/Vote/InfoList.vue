<template>
  <div class="content p-m-2">
    <DataTable :value="infoList" responsiveLayout="scroll">
      <Column header="FOTO">
        <template #body="slotProps">
          <img
            :src="slotProps.data.foto"
            alt="SIN FOTO"
            width="50"
            height="50"
            style="border-radius: 150px"
          />
        </template>
      </Column>
      <Column field="student.nombres" header="NOMBRES"></Column>
      <Column field="student.apellidos" header="APELLIDOS"></Column>
      <Column field="student.carrera" header="CARRERA"> </Column>
      <Column field="student.ciclo" header="  CICLO"> </Column>
      <Column field="position" header="CARGO" style="width: 50em"></Column>
    </DataTable>
  </div>
  <!-- {{infoList}} -->
</template>
<script>
export default {
  props: ["infoList"],
  data() {
    return {
      info: null,
    };
  },
};
</script>

<style scoped>
</style>