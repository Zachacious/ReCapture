<template>
  <q-page class="flex flex-center">
    <q-btn @click="search()" label="Search" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
  methods: {
    async search() {
      const res = await this.$q.capacitor.Plugins.ssdpPlugin.search({
        options: {
          ST: "ssdp:all",
          // ST: "urn:schemas-sony-com:service:ScalarWebAPI:1",
          MX: "1",
          HOST: "239.255.255.250",
          MAN: "ssdp:discover",
          PORT: "1900",
          TIMEOUT: "1500",
        },
      });
      console.log(res);
    },
  },

  async mounted() {},
});
</script>
