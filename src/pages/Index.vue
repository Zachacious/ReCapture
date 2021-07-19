<template>
  <q-page class="flex flex-center">
    <q-card flat class="tab-area full-width flex flex-center bg-repurple">
      <q-tab-panels
        v-model="tab"
        animated
        class="tab-panels full-width bg-repurple"
        @before-transition="(newVal, oldVal) => changedTab(newVal, oldVal)"
      >
        <q-tab-panel name="capture" class="tab-panel-area">
          <div class="text-h6">Mails</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="playback">
          <div class="text-h6">Alarms</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="info">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>

      <div class="tab-button-holder full-width">
        <q-tabs
          v-model="tab"
          shrink
          indicator-color="transparent"
          active-color="reblue"
          class="tabbar text-relav bg-repurple"
        >
          <q-tab name="capture">
            <q-icon name="mdi-camera-iris" size="md" />
          </q-tab>
          <q-tab name="playback">
            <q-icon name="mdi-play-circle" size="md" />
          </q-tab>
          <q-tab name="info">
            <q-icon name="mdi-information" size="md" />
          </q-tab>
        </q-tabs>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import capture from "../SonySDK/modes/capture";

export default defineComponent({
  name: "PageIndex",
  data() {
    return {
      tab: "capture",
      value: "",
    };
  },
  methods: {
    async adjustFullScreenTabs() {
      const header = document.querySelector(".header-bar");
      const tabbar = document.querySelector(".tabbar");
      const tabpanel = document.querySelector(".tab-panels");
      if (header && tabbar && tabpanel) {
        tabpanel.style.height = `calc(100% - ${header.offsetHeight}px)`;
      }
    },

    async changedTab(newVal, oldVal) {
      if (newVal === oldVal) return;

      if (oldVal === "capture") {
        await capture.endSession();
      }

      if (newVal === "capture") {
        await capture.startSession();
      }
    },
  },

  async beforeUpdate() {
    this.adjustFullScreenTabs();
  },

  async mounted() {
    this.$q.capacitor.Plugins.SplashScreen.hide();
    this.adjustFullScreenTabs();
  },
});
</script>

<style scoped lang="scss">
.tab-area {
  align-self: stretch;
}

.tab-panels {
  align-self: stretch;
}

.tab-button-holder {
  border-top: 1px solid $old-lavender;
}
</style>
