<template>
  <div><router-view /><alert /></div>
</template>
<script>
import { defineComponent } from "vue";
import alert from "./components/alert";

export default defineComponent({
  name: "App",
  components: {
    alert,
  },
});
</script>
