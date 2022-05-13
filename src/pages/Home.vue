<template>
  <q-page class="column no-wrap">
    <div>
      <q-list bordered separator class="q-mt-md">
        <q-item-label header class="text-bold">Recent scanned QR </q-item-label>
        <q-item
          clickable
          v-ripple
          v-for="(list, index) in filteredAttendees"
          :key="list.name"
        >
          <q-item-section>
            <q-item-label>{{ index + 1 }}. {{ list.name }}</q-item-label>
            <q-item-label caption
              >{{ list.position }}
              <span class="float-right">{{ list.datetime }}</span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "PageIndex",
  computed: {
    ...mapState("store", ["userDetails"]),
    ...mapGetters("store", ["attendees"]),
  },
  mounted() {
    console.log("userDetails.name", this.userDetails.userId);
    this.getAttendees();
    this.filteredAttendees = this.attendees;
    this.filterAttendeesByUser();
    //this.firebaseGetAttendeesByUser({ userId: this.userDetails.userId });
  },
  data() {
    return {
      filteredAttendees: {},
    };
  },
  methods: {
    ...mapActions("store", ["getAttendees"]),
    filterAttendeesByUser() {
      let filteredAtt = this.attendees;
      let userId = this.userDetails.userId;
      //this.filterListByDate(date);
      console.log("userid = ", userId);

      var keys = Object.keys(filteredAtt);
      var resultFiltered = keys.reduce(function (a, k) {
        if (filteredAtt[k]["by"] == userId) {
          a.push(filteredAtt[k]);
        }
        return a;
      }, []);
      this.filteredAttendees = resultFiltered;
    },
    currentDateTime(date) {
      return moment().format("Do MMMM YYYY, h:mm:ss a");
      //return moment(date).format("Do MMMM YYYY, h:mm:ss a");
    },
  },
};
</script>
