<template>
  <div>
    <div class="card">
      <div class="p-d-flex p-jc-between p-m-3">
        <h4>RESULTADOS</h4>
        <div class="p-m-2">
          <span class="p-float-label">
            <Dropdown
              id="dropdown"
              v-model="periodSelected"
              :options="periodos"
              optionLabel="name"
              @change="updateResults()"
            />
            <label for="dropdown">PERIODOS</label>
          </span>
        </div>
        <div class="p-m-2" v-if="displayReport == 'true'">
          <span class="p-float-label">
            <Button
              label="Reporte Estudiantes"
              icon="pi pi-print"
              class="p-mr-2"
              @click="openLink()"
            />
          </span>
        </div>
      </div>

      <div class="p-grid p-text-center p-jc-center">
        <div
          class="p-col-12 p-lg-3 p-mt-2"
          v-for="list in voteResults"
          :key="list.id"
        >
          <!-- <h2>{{list}}</h2> -->
          <img
            :src="list.foto"
            :alt="list.name"
            width="100"
            height="100"
            style="border-radius: 150px"
          />
          <div class="summary p-mt-3">
            <h5 class="title">
              <strong>{{ list.name }}-{{ list.number }}</strong>
            </h5>
            <h5>
              {{ list.candidate_set[0].student.nombres
              }}{{ list.candidate_set[0].student.apellidos }}
            </h5>
            <!-- <p>{{list.candidate_set[0].position}}</p> -->
            <h2>Votos {{ list.votes }}</h2>

            <h4>
              (
              {{
                parseFloat(
                  list.votes != 0 ? (list.votes / userCount) * 100 : 0
                ).toFixed(2)
              }}
              % )
            </h4>
          </div>
        </div>
      </div>
      <br />
    </div>

    <div
      class="p-grid dashboard p-text-center "
      v-for="voteNull in voteNull"
      :key="voteNull.id"
    >
      <div class="p-col p-lg-2 p-mt-2">
        <div class="card summary">
          <span class="title">BLANCOS</span>
          <h3>{{ voteNull.whiteVotes }}</h3>

          <h4>
            (
            {{
              parseFloat(
                voteNull.whiteVotes != 0
                  ? (voteNull.whiteVotes / userCount) * 100
                  : 0
              ).toFixed(2)
            }}
            % )
          </h4>
        </div>
      </div>
      <div class="p-col p-lg-2 p-mt-2">
        <div class="card summary">
          <span class="title">NULOS</span>
          <h3>{{ voteNull.nullVotes }}</h3>
          <h4>
            (
            {{
              parseFloat(
                voteNull.nullVotes != 0
                  ? (voteNull.nullVotes / userCount) * 100
                  : 0
              ).toFixed(2)
            }}
            % )
          </h4>
        </div>
      </div>
      <div class="p-col p-lg-2 p-mt-2">
        <div class="card summary">
          <span class="title">VALIDOS </span>
          <h3>{{ votosValidos }}</h3>
          <h4>
            (
            {{
              parseFloat(
                votosValidos != 0 ? (votosValidos / userCount) * 100 : 0
              ).toFixed(2)
            }}
            % )
          </h4>
        </div>
      </div>
      <div class="p-col p-lg-3 p-mt-2">
        <div class="card summary">
          <span class="title">PROCESADOS</span>
          <h3>{{ voteNull.whiteVotes + voteNull.nullVotes + votosValidos }}</h3>

          <h4>
            (
            {{
              parseFloat(
                voteNull.whiteVotes + voteNull.nullVotes + votosValidos != 0
                  ? ((voteNull.whiteVotes + voteNull.nullVotes + votosValidos) /
                      userCount) *
                      100
                  : 0
              ).toFixed(2)
            }}
            % )
          </h4>
        </div>
      </div>
      <div class="p-col p-lg-3 p-mt-2">
        <div class="card summary">
          <spam class="title">SIN PROCESAR</spam>
          <h3>
            {{
              userCount -
              (voteNull.whiteVotes + voteNull.nullVotes + votosValidos)
            }}
          </h3>

          <h4>
            (
            {{
              parseFloat(
                userCount -
                  (voteNull.whiteVotes + voteNull.nullVotes + votosValidos) !=
                  0
                  ? ((userCount -
                      (voteNull.whiteVotes +
                        voteNull.nullVotes +
                        votosValidos)) /
                      userCount) *
                      100
                  : 0
              ).toFixed(2)
            }}
            % )
          </h4>
        </div>
      </div>
      <!-- <div class="p-col p-lg-4">
        <div class="card summary">
          <span class="title">LISTA GANADORA</span>
          <h3>{{ listaGanadora }}</h3>
          <span
            >Con el <b> {{ porcentaje }}%</b> de los votos
          </span>
        </div>
      </div> -->
      <!-- <div class="p-col p-lg-3">
        <div class="card summary">
          <span class="title">ESCRUTINIO</span>
          <h3>100%</h3>
        </div>
      </div> -->
    </div>
    <!-- 
    <div class="card">
      <div class="p-m-3">
        <h4 class="p-mt-3">GRÁFICA DE RESULTADOS</h4>
        <Chart type="pie" :data="chartData" />
        <br />
      </div>
    </div> -->
  </div>
</template>

<script>
import CandidateService from "../service/CandidateService";
import PeriodService from "../service/PeriodService";
import ResultService from "../service/ResultService";
import UserService from "../service/UserService";
export default {
  data() {
    return {
      displayReport: sessionStorage.getItem("is_superuser"),
      porcentaje: 0,
      votosGanador: 0,
      listaGanadora: "",
      votosValidos: 0,
      periodos: [],
      voteResults: [],
      voteNull: [],
      voteList: [],
      candidatesList: [],
      periodSelected: [],
      nodes: null,
      columns: null,
      expandedKeys: {},
      userCount: 0,
      chartData: {
        labels: ["PES", "EDU", "SLM", "VOTOS BLANCOS", "VOTOS NULOS"],
        datasets: [
          {
            data: [52, 17, 2, 20, 8],
            backgroundColor: [
              "#42A5F5",
              "#66BB6A",
              "#FFA726",
              "#c0c0c0",
              "#ff0000f8",
            ],
            hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
          },
        ],
      },
    };
  },
  periodService: null,
  resultService: null,
  userService: null,

  created() {
    this.periodService = new PeriodService();
    this.candidatoService = new CandidateService();
    this.resultService = new ResultService();
    this.userService = new UserService();
  },

  mounted() {
    this.getPeriod();
    this.getUsers();
    // this.getResults();
    //this.getVoteNull();
  },
  methods: {
    getUsers() {
      this.userService.getUsers().then((element) => {
        this.userCount = element.count - 2;
      });
    },
    openLink() {
      let url = process.env.VUE_APP_APIURL + "/report";
      window.open(url);
    },
    updateResults() {
      var periodId = this.periodSelected.code;
      this.getResults(periodId);
      this.getVoteNull(periodId);
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
              actual: element.periodPresent,
            };
          });
          this.periodos.forEach((element) => {
            if (element.actual) {
              this.periodSelected = element;
              sessionStorage.setItem("period_id", element.code);
            }
          });

          this.updateResults();
        })
        .catch((error) => {
          console.log("ERROR: ", error);
        });
    },
    getResults(id) {
      this.resultService
        .getResultsValidate(id)
        .then((votesResult) => {
          this.voteResults = votesResult.results;

          this.votosValidos = 0;
          this.votosGanador = 0;
          this.listaGanadora = "";
          this.voteResults.forEach((element) => {
            if (element.votes > this.votosGanador) {
              this.listaGanadora = element.name;
              this.votosGanador = element.votes;
            }
            this.votosValidos += element.votes;
          });

          this.porcentaje = Math.round(
            (this.votosGanador / this.votosValidos) * 100
          );
        })
        .catch((error) => {
          console.log("ERROR: ", error);
        });
    },
    getVoteNull(id) {
      this.resultService
        .getResultsNull(id)
        .then((votesNull) => {
          this.voteNull = votesNull.results;
          //console.log(votesNull);
        })
        .catch((error) => {
          console.log("ERROR: ", error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
h3 {
  font-weight: bold;
}
</style>