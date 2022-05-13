<template>
  <q-page class="column no-wrap flex-center">
    <div style="display: block; text-align: center" class="q-mt-sm">
      <img
        v-if="!onCam"
        alt="Quasar logo"
        src="~assets/scanqr.png"
        style="width: 200px; height: 200px"
      />
      <qrcode-stream
        v-if="onCam"
        @decode="onDecode"
        @init="onInit"
      ></qrcode-stream>
    </div>

    <div class="col-12 text-center self-center">
      <q-btn
        rounded
        size="md"
        color="primary"
        @click="onCam = true"
        v-if="!onCam"
        class="q-pa-sm q-pl-xl q-pr-xl q-mt-xl"
      >
        <q-icon left size="3em" name="fa-solid fa-camera" />
        <div>SCAN</div>
      </q-btn>
    </div>

    <div v-if="onCam" class="col-6 text-center self-center q-mt-sm">
      <q-btn
        rounded
        size="md"
        color="red"
        @click="onCam = false"
        class="q-pa-sm"
      >
        <q-icon left size="3em" name="fa-solid fa-xmark" />
        <div>CANCEL</div>
      </q-btn>
    </div>

    <q-dialog v-model="toolbar">
      <q-card>
        <q-toolbar>
          <q-avatar>
            <q-icon size="xl" name="check" color="green" />
          </q-avatar>

          <q-toolbar-title
            ><span class="text-weight-bold">Dibenarkan Masuk</span>
          </q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section>
          <!-- <p>0123</p>
          <p>Muhammad bin Sapardi</p>
          <p>Dewan Undangan Negeri Sabah</p> -->
          {{ scanResult }}
          <p>Masa : 10:24 AM</p>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
export default {
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
  },
  data() {
    return {
      password: "",
      isPwd: true,
      loading4: false,
      toolbar: false,
      onCam: false,
      scanResult: "",
      scanFinished: false,
    };
  },
  methods: {
    simulateProgress(number) {
      // we set loading state
      this[`loading${number}`] = true;
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this[`loading${number}`] = false;
      }, 3000);
    },
    onDecode(url) {
      console.log("test = ", url);
      this.scanResult = url;
      this.onCam = false;
      this.toolbar = true;
    },

    onInit(promise) {
      promise.then(console.log).catch(console.error);
    },
  },
};
</script>
