<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white q-pa-sm">
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          {{ this.$route.name }}
        </q-toolbar-title>

        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="right = !right"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="right" side="right" behavior="mobile" bordered>
      <div class="q-pa-md" style="max-width: 350px">
        <q-list bordered padding>
          <q-item-label header
            >User Controls
            <q-item-label class="q-pt-sm text-bold">{{
              userDetails.name
            }}</q-item-label>
            <q-item-label>Dewan Undangan Negeri Sabah</q-item-label>
          </q-item-label>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>Change Password</q-item-label>
              <q-item-label caption>
                Require password for purchase or use password to restrict
                purchase
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced />
          <q-item clickable v-ripple @click="logoutUser">
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      class="bg-primary q-pa-sm"
      v-if="
        $route.path !== '/' &&
        $route.path !== '/login' &&
        $route.path !== '/register'
      "
    >
      <q-btn
        v-if="$route.path == '/'"
        to="/login"
        label="Login"
        stack
        glossy
        color="white"
        class="text-black full-width"
        size="md"
      />

      <q-btn-group
        spread
        v-if="$route.path !== '/' && $route.path !== '/login'"
      >
        <q-btn
          icon="house"
          label="Home"
          class="text-black"
          stack
          glossy
          to="/home"
          :color="$route.path == '/home' ? 'primary' : 'white'"
        />
        <q-btn
          icon="fa-solid fa-camera"
          class="text-black"
          label="SCAN"
          stack
          glossy
          :color="$route.path == '/scan' ? 'primary' : 'white'"
          to="/scan"
        />

        <q-btn
          icon="list"
          label="List"
          stack
          glossy
          :color="$route.path == '/list' ? 'primary' : 'white'"
          class="text-black"
          to="/list"
        />
      </q-btn-group>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("store", ["userDetails"]),
  },
  data() {
    return {
      right: false,
    };
  },
  methods: {
    ...mapActions("store", ["logoutUser"]),
  },
};
</script>
