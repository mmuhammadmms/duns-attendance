<template>
  <q-page class="">
    <q-form class="q-gutter-md" @submit="submitForm">
      <div class="q-py-lg q-px-lg">
        <q-input
          bottom-slots
          v-model="formData.email"
          label="Enter Email Address"
        >
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

        <q-input bottom-slots v-model="formData.name" label="Enter Name">
          <template v-slot:prepend>
            <q-icon name="fa-solid fa-user" />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click="formData.name = ''"
              class="cursor-pointer"
            />
          </template>
        </q-input>

        <q-input
          v-model="formData.password"
          :type="isPwd ? 'password' : 'text'"
          label="Enter Password"
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

        <q-input
          v-model="formData.conpassword"
          :type="isPwd ? 'password' : 'text'"
          label="Confirm Password"
          class="q-mt-md"
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
          Register
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Loading...
          </template>
        </q-btn>

        <q-btn class="float-left q-mt-sm" to="/login" color="primary"
          >Login</q-btn
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
        name: "",
        email: "",
        password: "",
        conpassword: "",
      },
      isPwd: true,
      loading4: false,
    };
  },
  methods: {
    ...mapActions("store", ["registerUser"]),
    simulateProgress(number) {
      // we set loading state
      this[`loading${number}`] = true;
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this[`loading${number}`] = false;
      }, 3000);
    },

    submitForm() {
      this.registerUser(this.formData);
    },
  },
};
</script>
