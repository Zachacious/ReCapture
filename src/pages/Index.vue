<template>
  <q-page class="flex flex-center"> Home Screen </q-page>
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
  methods: {},

  async mounted() {
    this.$q.capacitor.Plugins.SplashScreen.hide();
  },
});
</script>
