<template>
  <div class="card">
    <Toast />
    <Dialog
      :visible.sync="display"
      header="Información"
      :breakpoints="{ '960px': '75vw' }"
      :modal="true"
    >
      <p class="p-m-0">Solo podras emitir el voto una(1) sola vez</p>
      <p class="p-m-0">
        Los resultados podras ser visualizados en el Dashboard
      </p>

      <template #footer>
        <Button
          label="Aceptar"
          icon="pi pi-check"
          @click="closeDisplayInfo"
          class="p-button-success"
        />
      </template>
    </Dialog>

    <div v-if="displayVote">
      <vote-list @open-list="setDisplayVote($event)" />
    </div>
    <div v-else>
      <vote-info @open-info="setDisplayVote($event)" />
    </div>
  </div>
</template>


<script>
import VoteList from "../components/Vote/VoteList.vue";
export default {
  components: { VoteList },
  data() {
    return {
      candidates: null,
      layout: "grid",
      displayVote: true,
      display: true,
    };
  },
  methods: {
    setDisplayVote(value) {
      this.displayVote = value;
    },
    closeDisplayInfo() {
      this.display = false;
    },
  },
};
</script>

<style scoped>
</style>

