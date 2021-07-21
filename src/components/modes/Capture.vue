<template>
  <div class="flex flex-center">
    Capture
    <!-- <alert ref="alert" /> -->
  </div>
</template>

<script>
import sony from "../../SonySDK/methods";
import capture from "../../SonySDK/modes/capture";
import { fetchy } from "../../utils/fetchy";
// import alert from "../alert.vue";

export default {
  //   components: { alert },
  name: "CaptureMode",
  data() {
    return {
      liveView: {
        url: "",
        update: {
          interval: null,
          delay: 10000,
          inProgress: false,
        },
        status: {
          interval: null,
          delay: 25000,
          inProgress: false,
        },
        data: null,
      },
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
    async initialize() {
      const connectionStatus = await sony.checkConnection();
      console.log(connectionStatus);
      if (!connectionStatus.data) {
        return;
      }

      const sessionStatus = await this.$methodRetry(
        capture.initSession,
        3,
        250
      );
      if (!sessionStatus.data) {
        this.capture.error = "Unable to start capture session";
        return;
      }

      this.liveView.url = sessionStatus.data;
    },

    // camera can disable liveview at any time
    // need to keep a check to see if it's enabled
    // and if it's disabled, re-enable it
    async liveViewKeepAlive() {
      if (this.liveView.status.inProgress) return;

      this.liveView.status.inProgress = true;
      const status = await capture.getLiveViewStatus();
      if (!status) {
        await this.initialize();
      }

      this.liveView.status.inProgress = false;
    },

    // pulls fresh live view data
    async updateLiveViewData() {
      if (this.liveView.update.inProgress) return;
      if (!this.liveView.url) return;

      this.liveView.update.inProgress = true;

      try {
        const res = fetchy.GET({ http: { url: this.liveView.url } });
        this.liveView.data = res;
        console.log(this.liveView.data);
      } catch (err) {
        console.log(err);
      }

      this.liveView.update.inProgress = false;
    },
  },

  async beforeUnmount() {
    // const loadingAlert = this.$refs.alert.open(this.alertOptions.tabLoading);
    const loadingAlert = this.$alert(this.alertOptions.tabLoading);
    await this.$methodRetry(capture.endSession, 3, 250);

    if (this.liveView.update.interval)
      clearInterval(this.liveView.update.interval);
    if (this.liveView.status.interval)
      clearInterval(this.liveView.status.interval);

    // if (this.$refs.alert) this.$refs.alert.close();
    loadingAlert.close();
  },

  async mounted() {
    // this.$refs.alert.open(this.alertOptions.tabLoading);
    const loadingAlert = this.$alert(this.alertOptions.tabLoading);
    await this.initialize();

    this.liveView.update.interval = setInterval(() => {
      this.updateLiveViewData();
    }, this.liveView.update.delay);
    this.liveView.status.interval = setInterval(() => {
      this.liveViewKeepAlive();
    }, this.liveView.status.delay);

    // this.$refs.alert.close();
    loadingAlert.close();
  },
};
</script>
