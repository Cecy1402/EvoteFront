<template>
  <!-- <BlockUI :blocked="blockedDocument" :fullScreen="true"></BlockUI> -->
  <div class="">
    <Toast />
    <div v-if="displayList">
      <candidates-list
        @open-form="setDisplayList($event)"
        @update-list="updateList($event)"
      />
    </div>
    <div v-else>
      <candidates-form
        @open-list="setDisplayList($event)"
        :candidateList="candidateList"
      />
    </div>
  </div>
</template>

<script>
import CandidatesList from "../components/Candidates/CandidatesList.vue";
import CandidatesForm from "../components/Candidates/CandidatesForm.vue";

export default {
  components: { CandidatesForm, CandidatesList },
  data() {
    return {
      displayList: true,
      candidateList: null,
    };
  },
  methods: {
    updateList(list) {
      this.candidateList = list;
      this.displayList = false;
    },
    setDisplayList(value) {
      this.candidateList = null;
      this.displayList = value; //true or false
    },
  },
};
</script>
<style scoped>
</style>


