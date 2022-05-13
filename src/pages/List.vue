<template>
  <q-page class="">
    <div class="q-pa-md">
      <div>
        <q-btn-toggle
          v-model="model"
          class="my-custom-toggle"
          no-caps
          rounded
          unelevated
          toggle-color="primary"
          color="white"
          text-color="black"
          :options="[
            { label: 'Attendance list', value: 'one' },
            { label: 'List By Current Days', value: 'two' },
            { label: 'Master List', value: 'three' },
          ]"
        />
      </div>

      <div v-if="model == 'one'">
        <q-list separator class="q-mt-md">
          <q-item-section>
            <q-input
              color="primary"
              v-model="searchAttendees"
              label="Search by Name or Position"
              class="q-mb-md"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-item-section>
          <q-item
            clickable
            v-ripple
            v-for="(attendee, key, index) in filteredAttendees"
            :key="key"
          >
            <q-item-section>
              <q-item-label>
                <span style="display: inline-block" v-if="attendee.index">
                  {{ attendee.index }}
                </span>
                <span v-else>
                  {{ index + 1 }}
                </span>
                . {{ attendee.name }}</q-item-label
              >
              <q-item-label caption
                >{{ attendee.position }}
                <span class="float-right text-bold">{{
                  currentDateTime()
                }}</span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div v-if="model == 'two'">
        <q-btn-group spread class="q-mt-md">
          <q-btn
            v-for="dateList in dateLists"
            :key="dateList"
            :color="activeList == dateList ? 'primary' : 'white'"
            class="text-black"
            :label="dateList"
            @click="changeDateList(dateList)"
          />
          <!-- <q-btn color="primary" label="21 April" /> -->
          <!-- <q-btn color="white" class="text-black" label="22 April" />
          <q-btn color="white" class="text-black" label="23 April" />
          <q-btn color="white" class="text-black" label="24 April" /> -->
        </q-btn-group>
        <q-list separator class="q-mt-md">
          <q-item-section>
            <q-input
              color="primary"
              v-model="searchActive"
              label="Search by Name or Position"
              class="q-mb-md"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-item-section>
          <q-item
            clickable
            v-ripple
            v-for="(list, key) in filteredLists"
            :key="key"
          >
            <q-item-section>
              <q-item-label>{{ list.id }} - {{ list.name }}</q-item-label>
              <q-item-label caption>{{ list.position }} </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div v-if="model == 'three'">
        <q-file
          class="q-mt-md"
          rounded
          outlined
          dense
          file
          v-model="uploadFile"
          bottom-slots
          label="Upload master list (xls)"
          counter
        >
          <template v-slot:before>
            <q-icon name="attachment" />
          </template>

          <template v-slot:append>
            <q-icon
              v-if="model !== null"
              name="close"
              @click.stop="uploadFile = null"
              class="cursor-pointer"
            />
          </template>
        </q-file>
        <div class="q-mb-xl">
          <q-btn
            class="float-right q-mt-sm"
            color="primary"
            label="Upload File"
            @click="readFile()"
          />
        </div>
      </div>
    </div>

    <q-dialog v-model="toolbar">
      <q-card>
        <q-toolbar>
          <q-avatar>
            <q-icon size="xl" name="check" color="green" />
          </q-avatar>

          <q-toolbar-title
            ><span class="text-weight-bold">Upload Success</span>
          </q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import moment from "moment";
import readXlsxFile from "read-excel-file";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PageIndex",
  computed: {
    ...mapGetters("store", ["lists"]),
    ...mapGetters("store", ["attendees"]),
  },
  mounted() {
    this.getAttendees();
    this.filteredAttendees = this.attendees;
  },
  data() {
    return {
      password: "",
      isPwd: true,
      toolbar: false,
      loading4: false,
      toolbar: false,
      model: "one",
      filteredLists: {},
      filteredAttendees: {},
      uploadFile: null,
      searchAttendees: "",
      searchActive: "",
      activeList: "",
      dateLists: ["16 APRIL", "21 APRIL", "22 APRIL", "23 APRIL", "24 APRIL"],
    };
  },
  methods: {
    ...mapActions("store", ["getAttendees"]),
    ...mapActions("store", ["importListFromFile"]),
    ...mapActions("store", ["firebaseTruncateLists"]),
    readFile() {
      const file = this.uploadFile;
      const newList = {};
      readXlsxFile(file).then((rows) => {
        // `rows` is an array of rows
        // each row being an array of cells.

        this.firebaseTruncateLists();
        rows.forEach((rows) => {
          if (rows[0] != null) {
            this.importListFromFile({
              list: {
                type: rows[0],
                id: rows[1],
                name: rows[2],
                position: rows[4],
                indate: rows[5],
              },
            });
          }
        });

        //     "LISTID1": {
        //   "id": "0001",
        //   "name": "YB Abu",
        //   "position": "KKM",
        //   "indate": "16 APRIL,21 APRIL,22 APRIL,23 APRIL,24 APRIL"
        // },
      });

      this.toolbar = true;
    },
    currentDateTime() {
      return moment().format("Do MMMM YYYY, h:mm:ss a");
    },
    changeDateList(date) {
      this.activeList = date;
      this.setActiveList(date);
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
    setActiveList(date) {
      let filteredLists = this.lists;

      //this.filterListByDate(date);

      var keys = Object.keys(filteredLists);
      var resultFiltered = keys.reduce(function (a, k) {
        if (filteredLists[k]["indate"].includes(date)) {
          a.push(filteredLists[k]);
        }
        return a;
      }, []);
      this.filteredLists = resultFiltered;
      this.searchActive = "";
      //this.lists = this.lists.filter((lists) => lists.indate.includes(date));
    },
  },
  watch: {
    searchAttendees(val) {
      // this.attendees = this.attendees.filter(
      //   (attendees) =>
      //     attendees.name.includes(val) || attendees.position.includes(val)
      // );

      let filteredAttendees = this.attendees;
      let search = this.searchAttendees;
      let i = 0;

      //this.filterListByDate(date);

      var keys = Object.keys(filteredAttendees);
      var resultFiltered = keys.reduce(function (a, k) {
        if (
          filteredAttendees[k]["name"]
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          filteredAttendees[k]["position"]
            .toLowerCase()
            .includes(search.toLowerCase())
        ) {
          i++;
          filteredAttendees[k]["index"] = i;
          a.push(filteredAttendees[k]);
        }
        return a;
      }, []);
      this.filteredAttendees = resultFiltered;
    },
    searchActive() {
      let filteredLists = this.lists;
      let search = this.searchActive;

      //this.filterListByDate(date);

      var keys = Object.keys(filteredLists);
      var resultFiltered = keys.reduce(function (a, k) {
        if (
          filteredLists[k]["name"]
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          filteredLists[k]["position"]
            .toLowerCase()
            .includes(search.toLowerCase())
        ) {
          a.push(filteredLists[k]);
        }
        return a;
      }, []);
      this.filteredLists = resultFiltered;
      //this.lists = this.lists.filter((lists) => lists.indate.includes(date));
    },
    attendees() {
      this.filteredAttendees = this.attendees;
    },
  },
};
</script>
