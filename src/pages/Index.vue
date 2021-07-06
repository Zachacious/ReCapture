<template>
  <q-page class="flex flex-center">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    /> -->
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
// import { ssdpcapacitor } from "ssdpcapacitor";
// import { SSDPPlugin } from ".";
// console.log(SDDPPlugin);
// import { registerPlugin } from "@capacitor/core";

// const ssdp = registerPlugin("SSDPPlugin");

export default defineComponent({
  name: "PageIndex",
  async mounted() {
    console.log(this.$q);
    const res = await this.$q.capacitor.Plugins.ssdpPlugin.search({
      message: "TESTING...",
    });
    console.log(res);
    // console.log(await ssdp.echo("hello"));
    // const ssdp = await this.$q.capacitor.registerPlugin("ssdpcapacitor");
    // console.log(ssdp);
    // console.log(this.$q.capacitor.Plugins.SSDPPlugin);
    // console.log(this.$q.capacitor.Plugins);
    // console.log(await this.$q.capacitor.Plugins.ssdpcapacitor.echo("hello"));
    // const { value } = await ssdp.echo({ value: "hello" });
    // console.log(value);
  },
});
</script>
