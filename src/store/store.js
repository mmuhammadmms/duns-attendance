import Vue from "vue";
import { firebaseAuth, firebaseDb } from "boot/firebase";

const state = {
  userDetails: {},
  lists: {},
  attendees: {},
  dateToFilter: "",
};

const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload;
  },
  addList(state, payload) {
    Vue.set(state.lists, payload.listId, payload.listDetails);
  },
  addAttendees(state, payload) {
    Vue.set(state.attendees, payload.attId, payload.attDetails);
  },
};

const actions = {
  loginUser({}, payload) {
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        console.log("login");
        console.log(response);
      });
  },
  logoutUser({}, payload) {
    console.log("logg out ");
    firebaseAuth.signOut();
  },
  registerUser({}, payload) {
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        console.log(response);
        let userId = firebaseAuth.currentUser.uid;
        firebaseDb.ref("users/" + userId).set({
          name: payload.name,
          email: payload.email,
          password: payload.password,
          gate: 1,
          online: true,
        });
      })
      .catch((error) => {
        console.log("error = ", error);
      });
  },
  handleAuthStateChanged({ commit, dispatch }) {
    console.log("handleauthchanged");
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log("logged in");
        let userId = firebaseAuth.currentUser.uid;
        firebaseDb.ref("users/" + userId).once("value", (snapshot) => {
          let userDetails = snapshot.val();
          commit("setUserDetails", {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId,
          });
          dispatch("firebaseGetLists");
          dispatch("firebaseGetAttendees");
          this.$router.push("/scan");
        });
      } else {
        console.log("logged out");
        commit("setUserDetails", {});
        this.$router.push("/login");
      }
    });
  },
  getAttendees({ dispatch }) {
    dispatch("firebaseGetAttendees");
  },
  firebaseGetAttendeesByUser({ dispatch, commit }, payload) {
    //dispatch("firebaseGetAttendees");
    console.log("get attendees");
    firebaseDb.ref("attendees").on("child_added", (snapshot) => {
      let attDetails = snapshot.val();
      let attId = snapshot.key;
      if (attDetails == payload.userId) {
        console.log("insert");
        commit("addAttendees", {
          attId,
          attDetails,
        });
      }
    });
  },
  importListFromFile({}, payload) {
    firebaseDb.ref("lists/").push(payload.list);
    console.log("import");
  },
  firebaseTruncateLists({}) {
    firebaseDb.ref("lists").remove();
    console.log("delete all");
  },
  firebaseGetLists({ commit }, payload) {
    firebaseDb.ref("lists").on("child_added", (snapshot) => {
      let listDetails = snapshot.val();
      let listId = snapshot.key;
      commit("addList", {
        listId,
        listDetails,
      });
    });
  },
  firebaseGetAttendees({ commit }, payload) {
    firebaseDb.ref("attendees").on("child_added", (snapshot) => {
      let attDetails = snapshot.val();
      let attId = snapshot.key;
      commit("addAttendees", {
        attId,
        attDetails,
      });
    });
  },
};

const getters = {
  lists: (state) => {
    return state.lists;
  },
  attendees: (state) => {
    return state.attendees;
  },
  filteredLists: (state) => (filter) => {
    if (filter.name === "") {
      return state.lists;
    }
    return state.lists.filter((list) => list.name === filter.name);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
