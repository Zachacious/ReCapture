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

      this.liveView.url = sessionStatus.data[0];
    },

    // camera can disable liveview at any time
    // need to keep a check to see if it's enabled
    // and if it's disabled, re-enable it
    async liveViewKeepAlive() {
      if (this.liveView.status.inProgress) return;

      const connectionStatus = await sony.checkConnection();
      console.log(connectionStatus);
      if (!connectionStatus.data) {
        await this.cleanup();
        return;
      }

      this.liveView.status.inProgress = true;
      const status = await capture.getLiveViewStatus();
      if (!status) {
        await this.initialize();
      }

      this.liveView.status.inProgress = false;
    },

    // async startLiveView() {
    //     console.log("HERE");
    //   console.log(this.liveView.data);
    //   if (this.liveView.update.inProgress || !this.liveView.url) return;

    //   console.log("Im here");

    //   this.liveView.update.inProgress = true;

    //   try {
    //     const res = await fetchy.GET({ http: { url: this.liveView.url } });
    //     console.log(res);
    //     this.liveView.data = res;
    //     console.log(this.liveView.data);
    //   } catch (err) {
    //     console.log("ERROR");
    //     console.log(err);
    //   }

    //   this.liveView.update.inProgress = false;
    // },

    // pulls fresh live view data
    async updateLiveViewData() {
      console.log("HERE");
      console.log(this.liveView.data);
      if (this.liveView.update.inProgress || !this.liveView.url) return;

      console.log("Im here");

      this.liveView.update.inProgress = true;

      try {
        // const res = await fetchy.startStream({
        //   http: {
        //     url: this.liveView.url,
        //   },
        // });
        const res = await fetchy.GET({
          http: {
            url: this.liveView.url,
          },
        });
        console.log(res);
        this.liveView.data = res;
        console.log(this.liveView.data);
      } catch (err) {
        console.log("ERROR");
        console.log(err);
      }

      this.liveView.update.inProgress = false;
    },

    async cleanup() {
      await this.$methodRetry(capture.endSession, 3, 250);

      if (this.liveView.update.interval)
        clearInterval(this.liveView.update.interval);
      if (this.liveView.status.interval)
        clearInterval(this.liveView.status.interval);

      // await fetchy.clearStream();
    },
  },

  async beforeUnmount() {
    const loadingAlert = this.$alert(this.alertOptions.tabLoading);
    await this.cleanup();
    loadingAlert.close();
  },

  async mounted() {
    // this.$refs.alert.open(this.alertOptions.tabLoading);
    const loadingAlert = this.$alert(this.alertOptions.tabLoading);
    await this.initialize();
    await this.updateLiveViewData();

    // window.addEventListener("liveViewUpdate", (evt, data) => console.log(data));

    // this.liveView.update.interval = setInterval(async () => {
    //   this.updateLiveViewData();
    // }, this.liveView.update.delay);
    // this.liveView.status.interval = setInterval(async () => {
    //   this.liveViewKeepAlive();
    // }, this.liveView.status.delay);

    // this.$refs.alert.close();
    loadingAlert.close();
  },
};
</script>
