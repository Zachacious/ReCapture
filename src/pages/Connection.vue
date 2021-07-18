<template>
  <q-page class="flex flex-center">
    <div class="content-area q-pa-md">
      <div class="text-h3 text-bold text-center text-capitalize q-pb-md">
        Let's Connect To Your Camera
      </div>
      <div class="help-text text-center">
        <div class="q-pb-md">
          First enable remote connect on your Sony Camera.<q-btn
            flat
            color="info"
            label="(Click here for help)"
          />
        </div>
        <div class="q-pb-md">
          Then connect your phone to your camera's Wifi access point.<q-btn
            flat
            color="info"
            label="(Click here for help)"
          />
        </div>
        <div class="q-pb-md">Once done, tap connect.</div>
        <q-btn
          outline
          class="connect-btn q-ma-md q-pa-md q-px-lg"
          color="info"
          label="Connect"
          @click="connect()"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Connection",
  data() {
    return {
      alertOptions: {
        connecting: {
          type: "loading",
          title: "Connecting",
          message: "Please Wait...",
        },
        success: {
          type: "success",
          title: "Success",
          message: "Connected",
          buttons: [
            {
              text: "OK",
              color: "positive",
              closesAlert: true,
            },
          ],
        },
        error: {
          type: "error",
          message: "",
          title: "Error",
          buttons: [
            {
              text: "OK",
              color: "info",
              closesAlert: true,
            },
          ],
        },
      },
    };
  },
  methods: {
    async connect() {
      let res;

      const connectingAlert = this.$alert(this.alertOptions.connecting);

      try {
        res = await this.$q.capacitor.Plugins.ssdpPlugin.search({
          options: {
            ST: "urn:schemas-sony-com:service:ScalarWebAPI:1",
            MX: "5",
            HOST: "239.255.255.250",
            MAN: "ssdp:discover",
            PORT: "1900",
            TIMEOUT: "5000",
          },
        });
      } catch (err) {
        console.log(`Error trying to SSDP search for devices: ${err}`);
        connectingAlert.close();

        this.alertOptions.error.message =
          "Unable to search for devices. Check your settings and try again.";
        this.$alert(this.alertOptions.error);
        return;
      }

      if (!res) {
        console.log("Unable to make camera connection!");
        connectingAlert.close();

        this.alertOptions.error.message =
          "Unable to connect. Check your settings and try again.";
        this.$alert(this.alertOptions.error);
        return;
      }

      if (res.devices.length === 0) {
        console.log("Unable to make camera connection!");
        connectingAlert.close();

        this.alertOptions.error.message =
          "Unable to connect. Check your settings and try again.";
        this.$alert(this.alertOptions.error);
        return;
      }

      const device = res.devices[0];
      this.$connection.setConnectedDevice(device);

      connectingAlert.close();
      // now connect move to main screen
      this.$router.replace("/");

      this.$alert(this.alertOptions.success);

      console.log(res);
    },
  },

  mounted() {
    this.$q.capacitor.Plugins.SplashScreen.hide();
  },
});
</script>

<style lang="scss" scoped>
.help-text {
  font-size: 20px;
}
</style>
