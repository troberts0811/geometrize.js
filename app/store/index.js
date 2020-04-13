import Vue from 'vue';
import Vuex from 'vuex';
import Geometrize from 'geometrize/geometrize';
import { ConfigFields } from '../data/ConfigFields';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    geoId: "geometrize",
    geometrize: null,
    geometrizeConfig: null,
    configFields: ConfigFields,
    isConfigOpen: false,
    menuOpen: false,
    isDismissed: false,
    colourStatus:{
      IsOpen: false,
      Picker: null,
      Field: null
    }
  },
  getters:{},
  mutations:{
    setGeometrizeId(state, id){
      if(typeof id === 'string' && id != ""){
        state.geoId = id;
      }
    },
    setGeometrize(state){
        state.geometrize = new Geometrize(state.geoId, state.geometrizeConfig);
        state.geometrizeConfig = state.geometrize.GetSettings();
    },
    mutateGeometrizeConfig(state, payload){
      if(typeof payload === 'object'){
        state.geometrizeConfig = state.geometrize.MutateSettings(payload);
      }
    },
    setMenuOpen(state, isOpen){
      state.menuOpen = isOpen;
    },
    setConfigOpen(state, isOpen){
      state.isConfigOpen = isOpen;
    },
    setMessage(state, isDismissed){
      state.isDismissed = isDismissed;
    },
    mutateColourStatus(state, field){
      state.colourStatus = Object.assign({...state.colourStatus}, {
        IsOpen: true,
        Field: field
      });
    },
    resetColourStatus(state){
      state.colourStatus = Object.assign({...state.colourStatus}, {
        IsOpen: false,
        Field: null
      });
    },
    addPicker(state, picker){
      state.colourStatus = Object.assign({...state.colourStatus}, {
        Picker: picker
      });
    }
  },
  actions:{
    toggleMenu({commit, state}){
      if(state.menuOpen){
        commit('setMenuOpen', false);
      }else{
        if(!state.isDismissed){
          commit('setMessage', true);
        }
        commit('setMenuOpen', true);
      }
    },
    toggleConfig({commit, state}){
      if(state.isConfigOpen){
        commit('setConfigOpen', false);
        commit('setMenuOpen', true);
      }else{
        if(!state.isDismissed){
          commit('setMessage', true);
        }
        commit('setMenuOpen', false);
        commit('setConfigOpen', true);
      }
    },
    dismissMessage({commit}){
      commit('setMessage', true);
    },
    setColourStatus({commit}, field){
      if(typeof field === 'undefined' || field === null){
        commit('resetColourStatus');
      }else{
        commit('mutateColourStatus', field);
      }
    },
    setPicker({commit}, picker){
      commit('addPicker', picker);
    }
  }
});