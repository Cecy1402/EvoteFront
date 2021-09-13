<template>
  <div class="card">
    <div class="p-m-3">
      <Toast />
      <h3>Certificado</h3>
      <Button
        label="Generar"
        @click="generarCer()"
        icon="pi pi-check"
        class="p-button-success"
      />
      <br />
      <div
        v-if="showCert"
        ref="testHtml"
        class="p-mt-5 "
        style="border: 1px solid; padding: 15px; width: 500px;"
      >
        <img
          src="assets/layout/images/logo_itspm.png"
          style="height: 80px"
          class="p-ml-5"
        />
        <table class="default">
          <tr>
            <td><qrcode-vue :value="code"></qrcode-vue></td>
            <td></td>
            <td>
              <p>
                <b>Estudiante: </b> {{ estudent.nombres }}
                {{ estudent.apellidos }}
                <br />
                <b>Identificación: </b> {{ estudent.identificacion }}
                <br />
                <b>Carrera: </b> {{ estudent.carrera }}
                <br />
                <b> Paralelo: </b> {{ estudent.paralelo }}
                <br />
                <b> Ciclo: </b> {{ estudent.ciclo }}
              </p>
            </td>
          </tr>
        </table>

        <!-- <div class="p-mt-1">
          <qrcode-vue :value="code"></qrcode-vue>
        </div>
        <div class="">
          <p>
            <b>Estudiante: </b> {{ estudent.nombres }} {{ estudent.apellidos }}
            <br />
            <b>Identificación: </b> {{ estudent.identificacion }}
            <br />
            <b>Carrera: </b> {{ estudent.carrera }}
            <br />
            <b> Paralelo: </b> {{ estudent.paralelo }}
            <br />
            <b> Ciclo: </b> {{ estudent.ciclo }}
          </p>
        </div> -->
      </div>
      <br />
      <Button
        v-if="showCert"
        label="Imprimir"
        @click="printCer()"
        icon="pi pi-check"
        class="p-button-success"
      />
    </div>
  </div>
</template>

<script>
import LoginService from "../service/UserService";
import QrcodeVue from "qrcode.vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      showCert: false,
      estudent: null,
      code: "",
      size: 130,
    };
  },
  loginService: null,
  created() {
    this.loginService = new LoginService();
  },
  mounted() {},
  methods: {
    generarCer() {
      this.estudent = JSON.parse(sessionStorage.getItem("user"));

      this.loginService
        .UserYaVoto({ id: this.estudent.identificacion })
        .then((result) => {
          if (result.vote) {
            this.code =
              "Registro:" +
              result.code +
              " Estudiante:" +
              this.estudent.identificacion;
            this.showCert = true;
          } else {
            this.$toast.add({
              severity: "warn",
              summary: "Error",
              detail:
                "No se encontro un voto para " + this.estudent.identificacion,
              life: 3000,
            });
          }
        });
    },
    printCer() {
      html2canvas(this.$refs.testHtml).then((canvas) => {
        let pdfImage = canvas.toDataURL();

        let pdf = new jsPDF();
        pdf.addImage(pdfImage, "PNG", 20, 20);
        pdf.save("commande.pdf");
      });
    },
  },

  components: {
    QrcodeVue,
  },
};
</script>
