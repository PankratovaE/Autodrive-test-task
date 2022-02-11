import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cities: [
      {
        id: 1, 
        name: 'Москва'
      },
      {
        id: 2, 
        name: 'Санкт-Петербург'
      },
      {
        id: 3, 
        name: 'Казань'
      }
    ],
    dataToSend: {},
    serverResponse: '',
    isFormVisible: false,
    isResponseVisible: false,
    defaultCity: {},
  },

  mutations: {
    setDataToSend(state, data) {
      state.dataToSend = data;
    },
    setServerResponse(state, data) {
      state.serverResponse = data;
    },
    toggleFormVisible(state) {
      state.isFormVisible = !state.isFormVisible
    },
    toggleResponseVisible(state) {
      state.isResponseVisible = !state.isResponseVisible
    },
    setDefaultCity(state, data) {
      //console.log('in set df city', data)
      state.defaultCity = data
    }
  },

  actions: {
    sendData({commit}, payload) {
      //console.log('we try to send', payload)

      axios.post('http://hh.autodrive-agency.ru/test-tasks/front/task-7', 
      payload)
      .then((response) => {
        commit('setServerResponse', response)
      })
      .catch(err => {
        console.error(err)
      })
      //как-будто запрос прошел удачно
      //console.log('send data', payload)
      const res = 'Данные отправлены'
      //ответ сервера - в переменную
      commit('setServerResponse', res)
      //закрыть окно с формой
      commit('toggleFormVisible')
      //показать попап с ответом
      commit('toggleResponseVisible')
    },

    defaultCityById({commit, state}, payload) {

      const defCity = state.cities.find(city => city.id === payload)
      commit('setDefaultCity', defCity)
    }
    
  },

  getters: {
    getCities: state => state.cities,
    getServerResponse: state => state.serverResponse,
    getIsFormVisible: state => state.isFormVisible,
    getDefaultCity: state => state.defaultCity,
    getIsResponseVisible: state => state.isResponseVisible,
  },
});
