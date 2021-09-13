<template>
  <div class="layout-profile">
    <br>
    <div>
      <img src="assets/layout/images/profile.png" alt="" />
    </div>
  
    <button class="p-link layout-profile-link" @click="onClick">
      <!-- <span class="username">{{ userName }}</span> -->
      <i class="pi pi-fw pi-cog"></i>
    </button>
    <transition name="layout-submenu-wrapper">
      <ul v-show="expanded">
        <li>
          <button class="p-link" @click="logout()">
            <i class="pi pi-fw pi-power-off"></i><span>Logout</span>
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>


<script>
export default {
  data() {
    return {
      expanded: false,
      userName: "",
    };
  },
  mounted() {
    // if (sessionStorage.getItem("user"))
    //   this.userName = JSON.parse(sessionStorage.getItem("user")).first_name;
  },
  methods: {
    logout() {
      sessionStorage.removeItem("jwt");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("is_superuser");

      this.$router.push("/login");
    },
    onClick(event) {
      this.expanded = !this.expanded;
      event.preventDefault();
    },
  },
};
</script>

<style scoped></style>
