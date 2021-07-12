<template>
  <q-page class="flex flex-center">
    Home Screen
    <!-- <q-btn @click="search()" label="Search" />
    <div class="q-pa-md">
      {{ value }}
    </div> -->
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
  data() {
    return {
      value: "",
    };
  },
  methods: {
    // async search() {
    //   const res = await this.$q.capacitor.Plugins.ssdpPlugin.search({
    //     options: {
    //       // ST: "urn:schemas-sony-com:service:ScalarWebAPI:1",
    //       MX: "5",
    //       HOST: "239.255.255.250",
    //       MAN: "ssdp:discover",
    //       PORT: "1900",
    //       TIMEOUT: "5000",
    //       ST: "ssdp:all",
    //     },
    //   });
    //   console.log(res);
    //   this.value = res.devices;
    // },
  },

  async mounted() {},
});
</script>
