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
      <Column field="nombres" header="NOMBRES"></Column>
      <Column field="apellidos" header="APELLIDOS"></Column>
      <Column field="carrera" header="CARRERA"> </Column>
      <Column field="ciclo" header="  CICLO"> </Column>
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