import Vuex from 'vuex'
import Vue from 'vue'
import {HTTP} from './http-common';

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    timeEntries: [],
    totalTime: 0,
    appointments: [],
    drugs: [],
    physicians: []
  },
  mutations: {
    timeUpdate(state,timeEntry) {
      state.totalTime += Number(timeEntry.totalTime);
      state.timeEntries.push(timeEntry);
    },
    appointmentUpdate(state,appointment){
      state.appointments.push(appointment);
    },
    deleteTime(state,timeEntry) {
      let index = state.timeEntries.indexOf(timeEntry);
      state.timeEntries.splice(index, 1);
      state.totalTime -= timeEntry.totalTime;
    },
    deleteAppointment(state,appointment) {
      let index = state.appointments.indexOf(appointment);
      state.appointments.splice(index, 1);      
    },
    drugInventoryUpdate(state,drugInfoData){
      state.drugs.push(drugInfoData);
      
    },
    drugInventoryDelete(state,drugInfoData){
      let index = state.drugs.indexOf(drugInfoData);
      state.drugs.splice(index, 1); 
    },
    physicianInventoryUpdate(state,physicianInfoData){
      state.physicians.push(physicianInfoData);
      
    },
    physicianInventoryDelete(state,physicianInfoData){
      let index = state.physicians.indexOf(physicianInfoData);
      state.physicians.splice(index, 1); 
    },
      SET_DRUG_LIST: (state, { list }) => {
      state.drugs = list
    },
    SET_PHYSICIAN_LIST: (state, { list }) => {
      state.physicians = list
    }
  },
  actions: {
    LOAD_DRUG_LIST: function ({ commit }) {
      HTTP.get('drugs').then((response) => {
        commit('SET_DRUG_LIST', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_PHYSICIAN_LIST: function ({ commit }) {
      HTTP.get('physicians').then((response) => {
        commit('SET_PHYSICIAN_LIST', { list: response.data.Physicians })
      }, (response) => {
        console.log(response)
      })
    }
  }
})

export default store