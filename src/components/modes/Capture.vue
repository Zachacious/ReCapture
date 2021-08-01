<template>
  <div class="flex flex-center full-width full-height">
    <img :src="liveViewSource" class="liveview-image full-width" />
    <q-btn label="half shutter" @click="toggleHalfShutter()" />
  </div>
</template>

<script>
import sony from "../../SonySDK/methods";
import capture from "../../SonySDK/modes/capture";
import { fetchy } from "../../utils/fetchy";

export default {
  name: "CaptureMode",
  data() {
    return {
      liveView: {
        trigger: false,
        url: "",
        update: {
          interval: null,
          delay: 100,
          inProgress: false,
        },
        status: {
          interval: null,
          delay: 5000,
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

  computed: {
    liveViewSource() {
      this.liveView.trigger;
      if (!this.liveView.data) return "";
      return `data:image/jpeg;base64,${this.liveView.data}`;
    },
  },

  methods: {
    async toggleHalfShutter() {
      this.halfShutter = !this.halfShutter;
      if (this.halfShutter) console.log(await sony.halfPressShutter());
      if (!this.halfShutter) console.log(await sony.cancelHalfPressShutter());
    },

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

    async updateLiveViewFrame() {
      if (this.liveView.update.inProgress) return;
      this.liveView.update.inProgress = true;

      try {
        const data = await fetchy.getLiveViewFrame();
        if (data) {
          this.updateLiveView(data);
        }
      } catch (err) {
        console.log(err);
      }

      this.liveView.update.inProgress = false;
    },

    async startLiveViewStream() {
      if (!this.liveView.url) return;

      try {
        const res = await fetchy.startStream({
          http: {
            url: this.liveView.url,
          },
        });
        this.liveView.data = res;
        console.log(this.liveView.data);
      } catch (err) {
        console.log("ERROR");
        console.log(err);
      }
    },

    async updateLiveView(data) {
      if (!data) return;
      if (!data.hasOwnProperty("imgData")) return;

      if (data.imgData) {
        this.liveView.data = data.imgData;
        this.liveView.trigger = !this.liveView.trigger;
      }

      if (data.hasOwnProperty("frame")) {
        console.log(data.frame);
      }
    },

    async cleanup() {
      console.log("cleanup started");

      if (this.liveView.status.interval)
        clearInterval(this.liveView.status.interval);
      if (this.liveView.update.interval)
        clearInterval(this.liveView.update.interval);

      await fetchy.clearStream();
      await this.$methodRetry(capture.endSession, 3, 250);
      console.log("Cleanup is finished");
    },
  },

  async beforeUnmount() {
    console.log("Starting before unmount");
    const loadingAlert = this.$alert(this.alertOptions.tabLoading);
    await this.cleanup();
    loadingAlert.close();
    console.log("before unmount done");
  },

  async mounted() {
    const loadingAlert = this.$alert(this.alertOptions.tabLoading);
    await this.initialize();
    this.startLiveViewStream();

    this.liveView.update.interval = setInterval(async () => {
      this.updateLiveViewFrame();
    }, this.liveView.update.delay);

    this.liveView.status.interval = setInterval(async () => {
      this.liveViewKeepAlive();
    }, this.liveView.status.delay);

    loadingAlert.close();
  },
};
</script>

<style scoped lang="scss">
.liveview-image {
  transform: rotate(90deg);
}
</style>
