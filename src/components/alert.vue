<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="show"
      class="alert flex flex-center"
      :class="{
        'alert-success': options.type == 'success',
        'alert-info': options.type == 'info',
        'alert-warning': options.type == 'warning',
      }"
      role="alert"
    >
      <div class="message">{{ options.message }}</div>
      <q-btn class="close" @click="close">
        <span>Close</span>
      </q-btn>
    </div>
  </transition>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "alert",
  data() {
    return {
      options: {
        type: "info",
        message: "",
        dismissable: true,
      },
      show: false,
    };
  },

  methods: {
    open(options) {
      if (options) {
        this.options = { ...this.options, ...options };
      }
      this.options = options;
      this.show = true;
    },

    close() {
      this.show = false;
    },
  },

  mounted() {
    this.$alertDelegate.setOpenCB(this.open);
    this.$alertDelegate.setCloseCB(this.close);
  },
});
</script>

<style lang="scss">
.alert {
  position: absolute;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: $alert-background;
}

.alert::before {
  filter: blur(50px);
}
</style>
