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
    menuOpen: true,
    configFields: ConfigFields
  },
  getters:{},
  mutations:{
    setGeometrizeId(state, id){
      if(typeof id === 'string' && id != ""){
        state.geoId = id;
      }
    },
    setGeometrize(state){
      if(state.geometrizeConfig !== null){
        state.geometrize = new Geometrize(state.geoId, state.geometrizeConfig);
      }else{
        state.geometrize = new Geometrize(state.geoId);
        state.geometrizeConfig = state.geometrize.GetSettings();
      }
    },
    setGeometrizeConfig(state, config){
      if(typeof config === 'object'){
        state.geometrizeConfig = config;
      }
    },
    setMenuOpen(state, isOpen){
      state.menuOpen = isOpen;
    }
  },
  actions:{
    toggleMenu({commit, state}){
      if(state.menuOpen){
        commit('setMenuOpen', false);
      }else{
        commit('setMenuOpen', true);
      }
    }
  }
});