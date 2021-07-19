<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="header-bar">
        <img src="logo.png" class="logo" />
        <q-space />
        <span class="flex flex-center text-bold ellipsis text-rewhite">
          SONY {{ cameraName }}</span
        >
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <alert />
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import alert from "../components/alert.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    alert,
  },

  setup() {
    return {};
  },

  data() {
    return {
      tab: "tab1",
      cameraName: this.$connection.data.device.friendlyName,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-bar {
  background-color: $dark-page;
  color: $dark-page-text;
}

.logo {
  width: 120px;
}
</style>
