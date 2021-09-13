<template>
  <!-- <div class="p-grid"> -->
  <div>
    <Toast />
    <period-list
      :getDisplay="getDisplay"
      @open-form="setDisplayPeriod($event)"
      @patch-period="setPatchPeriod($event)"
      @get-list="getDisplayPeriod($event)"
    />

    <Dialog
      :contentStyle="{ overflow: 'visible' }"
      :header="namePeriod"
      :visible.sync="displayPeriod"
      :breakpoints="{ '960px': '75vw' }"
      :modal="true"
    >
      <period-form
        @open-list="setDisplayPeriod($event)"
        @get-period="getDisplayPeriod($event)"
        :period="period"
      />
    </Dialog>
  </div>
</template>

<script>
import PeriodList from "../components/Period/PeriodList.vue";
import PeriodForm from "../components/Period/PeriodForm.vue";

export default {
  components: { PeriodList, PeriodForm },
  data() {
    return {
      namePeriod: "",
      createPeriod: true,
      displayPeriod: false,
      period: null,
      getDisplay: false,
    };
  },

  methods: {
    setPatchPeriod(period) {
      this.period = period;
      this.displayPeriod = true;
      this.namePeriod = "Actualizado Periodo";
    },
    setDisplayPeriod(value) {
      this.displayPeriod = value;
      this.namePeriod = "Nuevo Periodo";
    },
    getDisplayPeriod(value) {
      this.getDisplay = value;
    },
  },
};
</script>

<style scoped>
</style>
