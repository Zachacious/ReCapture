<template>
  <div class="flex flex-center">
    <transition
      name="fade"
      mode="out-in"
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
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
        <div class="flex flex-center">
          <div
            v-if="options.type === 'loading'"
            ref="loadingWrapper"
            class="loader q-mb-md"
            style="position: relative"
          >
            <div class="demo">
              <div class="circle">
                <div class="inner"></div>
              </div>
              <div class="circle">
                <div class="inner"></div>
              </div>
              <div class="circle">
                <div class="inner"></div>
              </div>
              <div class="circle">
                <div class="inner"></div>
              </div>
              <div class="circle">
                <div class="inner"></div>
              </div>
            </div>
          </div>
          <div
            v-else-if="options.type === 'success' && !options.noIcon"
            class="svg-box"
          >
            <svg class="circular green-stroke">
              <circle
                class="path"
                cx="75"
                cy="75"
                r="50"
                fill="none"
                stroke-width="5"
                stroke-miterlimit="10"
              />
            </svg>
            <svg class="checkmark green-stroke">
              <g
                transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-489.57,-205.679)"
              >
                <path
                  class="checkmark__check"
                  fill="none"
                  d="M616.306,283.025L634.087,300.805L673.361,261.53"
                />
              </g>
            </svg>
          </div>

          <div
            v-else-if="options.type === 'error' && !options.noIcon"
            class="svg-box"
          >
            <svg class="circular red-stroke">
              <circle
                class="path"
                cx="75"
                cy="75"
                r="50"
                fill="none"
                stroke-width="5"
                stroke-miterlimit="10"
              />
            </svg>
            <svg class="cross red-stroke">
              <g
                transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-502.652,-204.518)"
              >
                <path
                  class="first-line"
                  d="M634.087,300.805L673.361,261.53"
                  fill="none"
                />
              </g>
              <g
                transform="matrix(-1.28587e-16,-0.79961,0.79961,-1.28587e-16,-204.752,543.031)"
              >
                <path class="second-line" d="M634.087,300.805L673.361,261.53" />
              </g>
            </svg>
          </div>
          <div
            v-else-if="
              (options.type === 'warning' || options.type === 'info') &&
              !options.noIcon
            "
            class="svg-box"
          >
            <svg
              class="circular"
              :class="options.type === 'info' ? 'blue-stroke' : 'yellow-stroke'"
            >
              <circle
                class="path"
                cx="75"
                cy="75"
                r="50"
                fill="none"
                stroke-width="5"
                stroke-miterlimit="10"
              />
            </svg>
            <svg
              class="alert-sign"
              :class="options.type === 'info' ? 'blue-stroke' : 'yellow-stroke'"
            >
              <g transform="matrix(1,0,0,1,-615.516,-257.346)">
                <g
                  transform="matrix(0.56541,-0.56541,0.56541,0.56541,93.7153,495.69)"
                >
                  <path
                    class="line"
                    d="M634.087,300.805L673.361,261.53"
                    fill="none"
                  />
                </g>
                <g
                  transform="matrix(2.27612,-2.46519e-32,0,2.27612,-792.339,-404.147)"
                >
                  <circle
                    class="dot"
                    cx="621.52"
                    cy="316.126"
                    r="1.318"
                    :class="
                      options.type === 'info' ? 'blue-fill' : 'yellow-fill'
                    "
                  />
                </g>
              </g>
            </svg>
          </div>

          <div class="title text-h4 text-bold text-center full-width q-mb-sm">
            {{ options.title }}
          </div>
          <div class="message text-center full-width q-pa-sm q-px-lg">
            {{ options.message }}
          </div>
          <div class="buttons">
            <q-btn
              v-for="(button, index) in options.buttons"
              :key="index"
              :color="button.color"
              outline
              class="close q-ma-md"
              @click="handleButtonClick(button)"
            >
              {{ button.text }}
            </q-btn>
          </div>
          <!-- <q-btn color="info" class="close q-ma-md" @click="close">
            {{ options.closeBtn }}
          </q-btn> -->
        </div>
      </div>
    </transition>
  </div>
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
        title: "",
        buttons: [
          // {
          //   text: "OK",
          //   color: "green",
          //   action: () => {}
          //   closesAlert: true
          // }
        ],
        noIcon: false,
        // quasarLoader: "",
      },
      defaultOptions: {},
      show: false,
    };
  },

  methods: {
    open(options) {
      if (options) {
        this.options = { ...this.options, ...options };
      }
      //   this.options = options;
      this.show = true;
      console.log(this.options);
    },

    close() {
      this.show = false;
      this.options = this.defaultOptions;
    },

    handleButtonClick(button) {
      if (button.action) button.action();
      if (button.closesAlert) this.close();
    },
  },

  mounted() {
    this.$alertDelegate.setOpenCB(this.open);
    this.$alertDelegate.setCloseCB(this.close);

    this.defaultOptions = this.options;

    if (this.options.type === "loading") this.options.noIcon = true;
  },
});
</script>

<style lang="scss">
.alert {
  position: absolute;
  z-index: 100000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: $alert-background;
}

.message {
  font-size: 14pt;
}

//------------------------------------

* {
  margin: 0;
  padding: 0;
}

.svg-box {
  display: inline-block;
  position: relative;
  width: 150px;
}

.green-stroke {
  stroke: #7cb342;
}

.red-stroke {
  stroke: #ff6245;
}

.yellow-stroke {
  stroke: #ffc107;
}

.yellow-fill {
  fill: #ffc107;
}

.blue-stroke {
  stroke: #00b0ff;
}

.blue-fill {
  fill: #00b0ff;
}

.circular circle.path {
  stroke-dasharray: 330;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  opacity: 0.4;
  animation: 0.7s draw-circle ease-out;
}

/*------- Checkmark ---------*/
.checkmark {
  stroke-width: 6.25;
  stroke-linecap: round;
  position: absolute;
  top: 56px;
  left: 49px;
  width: 52px;
  height: 40px;
}

.checkmark path {
  animation: 1s draw-check ease-out;
}

@keyframes draw-circle {
  0% {
    stroke-dasharray: 0, 330;
    stroke-dashoffset: 0;
    opacity: 1;
  }

  80% {
    stroke-dasharray: 330, 330;
    stroke-dashoffset: 0;
    opacity: 1;
  }

  100% {
    opacity: 0.4;
  }
}

@keyframes draw-check {
  0% {
    stroke-dasharray: 49, 80;
    stroke-dashoffset: 48;
    opacity: 0;
  }

  50% {
    stroke-dasharray: 49, 80;
    stroke-dashoffset: 48;
    opacity: 1;
  }

  100% {
    stroke-dasharray: 130, 80;
    stroke-dashoffset: 48;
  }
}

/*---------- Cross ----------*/

.cross {
  stroke-width: 6.25;
  stroke-linecap: round;
  position: absolute;
  top: 54px;
  left: 54px;
  width: 40px;
  height: 40px;
}

.cross .first-line {
  animation: 0.7s draw-first-line ease-out;
}

.cross .second-line {
  animation: 0.7s draw-second-line ease-out;
}

@keyframes draw-first-line {
  0% {
    stroke-dasharray: 0, 56;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 0, 56;
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dasharray: 56, 330;
    stroke-dashoffset: 0;
  }
}

@keyframes draw-second-line {
  0% {
    stroke-dasharray: 0, 55;
    stroke-dashoffset: 1;
  }

  50% {
    stroke-dasharray: 0, 55;
    stroke-dashoffset: 1;
  }

  100% {
    stroke-dasharray: 55, 0;
    stroke-dashoffset: 70;
  }
}

.alert-sign {
  stroke-width: 6.25;
  stroke-linecap: round;
  position: absolute;
  top: 40px;
  left: 68px;
  width: 15px;
  height: 70px;
  animation: 0.5s alert-sign-bounce cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.alert-sign .dot {
  stroke: none;
  //   fill: #ffc107;
}

@keyframes alert-sign-bounce {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  50% {
    transform: scale(0);
    opacity: 1;
  }

  100% {
    transform: scale(1);
  }
}

/////////////////////////////////////////////////////////////////////
.demo {
  width: 100px;
  height: 102px;
  border-radius: 100%;
  position: relative;

  //   top: 20%;
  //   left: calc(50% - 50px);
}

.circle {
  width: 100%;
  height: 100%;
  position: absolute;
}
.circle .inner {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: 5px solid rgba(100, 148, 170, 0.7);
  border-right: none;
  border-top: none;
  background-clip: padding;
  box-shadow: inset 0px 0px 10px rgba(100, 148, 170, 0.15);
}

@-webkit-keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.circle:nth-of-type(0) {
  transform: rotate(0deg);
}
.circle:nth-of-type(0) .inner {
  -webkit-animation: spin 2s infinite linear;
  animation: spin 2s infinite linear;
}

.circle:nth-of-type(1) {
  transform: rotate(70deg);
}
.circle:nth-of-type(1) .inner {
  -webkit-animation: spin 2s infinite linear;
  animation: spin 2s infinite linear;
}

.circle:nth-of-type(2) {
  transform: rotate(140deg);
}
.circle:nth-of-type(2) .inner {
  -webkit-animation: spin 2s infinite linear;
  animation: spin 2s infinite linear;
}

.demo {
  -webkit-animation: spin 5s infinite linear;
  animation: spin 5s infinite linear;
}
</style>
