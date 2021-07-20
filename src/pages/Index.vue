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
          <CaptureMode />
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
import methodRetry from "../utils/methodRetry";
import sony from "../SonySDK/methods";
import CaptureMode from "../components/modes/Capture.vue";

export default defineComponent({
  name: "PageIndex",
  components: {
    CaptureMode,
  },
  data() {
    return {
      tab: "capture",
      capture: {
        liveViewURL: "",
        error: "",
      },
      value: "",
      alertOptions: {
        tabLoading: {
          type: "loading",
          title: "Loading",
          message: "Please Wait...",
        },
      },
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
      // if (newVal === oldVal) return;
      // const loadingAlert = this.$alert(this.alertOptions.tabLoading);
      // await sony.checkConnection();
      // if (oldVal === "capture") {
      //   await methodRetry(capture.endSession, 3, 250);
      // }
      // if (newVal === "capture") {
      //   this.capture.error = "";
      //   const sessionStatus = await methodRetry(capture.initSession, 3, 250);
      //   if (!sessionStatus.data) {
      //     this.capture.error = "Unable to start capture session";
      //     loadingAlert.close();
      //     return;
      //   }
      //   this.liveViewURL = sessionStatus.data;
      // }
      // loadingAlert.close();
    },

    // async cleanup() {
    //   await methodRetry(capture.endSession, 3, 250);
    // },
  },

  async beforeUpdate() {
    this.adjustFullScreenTabs();
  },

  // async beforeUnmount() {
  //   await this.cleanup();
  // },

  async mounted() {
    this.$q.capacitor.Plugins.SplashScreen.hide();
    this.adjustFullScreenTabs();

    this.$events.on("connection.disconnected", async () =>
      this.$router.replace("/connection")
    );
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
