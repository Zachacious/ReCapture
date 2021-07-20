<template>
  <div class="flex flex-center">Capture</div>
</template>

<script>
import sony from "../../SonySDK/methods";
import capture from "../../SonySDK/modes/capture";

export default {
  name: "CaptureMode",
  data() {
    return {
      alertOptions: {
        tabLoading: {
          type: "loading",
          title: "Loading",
          message: "Please Wait...",
        },
      },
    };
  },
  async beforeUnmount() {
    const loadingAlert = this.$alert(this.alertOptions.tabLoading);
    await this.$methodRetry(capture.endSession, 3, 250);
    loadingAlert.close();
  },

  async mounted() {
    const loadingAlert = this.$alert(this.alertOptions.tabLoading);

    const connectionStatus = await sony.checkConnection();
    if (!connectionStatus.data) {
      loadingAlert.close();
      return;
    }

    const sessionStatus = await this.$methodRetry(capture.initSession, 3, 250);
    if (!sessionStatus.data) {
      this.capture.error = "Unable to start capture session";
      loadingAlert.close();
      return;
    }
    this.liveViewURL = sessionStatus.data;

    loadingAlert.close();
  },
};
</script>
