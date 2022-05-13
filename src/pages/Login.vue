<template>
  <q-page class="">
    <div style="display: block; text-align: center" class="q-mt-sm">
      <img
        style="width: 70%; height: 70%"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Sabah_state_legislative_assembly.svg/1200px-Sabah_state_legislative_assembly.svg.png"
      />
    </div>
    <q-form class="q-gutter-md" @submit="submitForm">
      <div class="q-py-lg q-px-lg">
        <q-input bottom-slots v-model="formData.email" label="Email">
          <template v-slot:prepend>
            <q-icon name="fa-solid fa-user" />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click="formData.email = ''"
              class="cursor-pointer"
            />
          </template>
        </q-input>

        <q-input
          v-model="formData.password"
          :type="isPwd ? 'password' : 'text'"
          label="Password"
        >
          <template v-slot:prepend>
            <q-icon name="fa-solid fa-lock" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-btn
          class="q-mt-xl"
          :loading="loading4"
          color="primary"
          style="width: 100%"
          type="submit"
        >
          Log In
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Loading...
          </template>
        </q-btn>

        <p class="float-right q-mt-sm">Forgot Password ?</p>
        <q-btn class="float-left q-mt-sm" to="/register" color="primary"
          >Register</q-btn
        >
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "PageIndex",
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      isPwd: true,
      loading4: false,
    };
  },
  methods: {
    ...mapActions("store", ["loginUser"]),
    submitForm() {
      this.loginUser(this.formData);
    },
    simulateProgress(number) {
      // we set loading state
      this[`loading${number}`] = true;
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this[`loading${number}`] = false;
      }, 3000);
    },
  },
};
</script>
