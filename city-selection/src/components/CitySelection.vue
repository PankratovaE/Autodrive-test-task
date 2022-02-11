<template>
  <div class="md:flex-row flex flex-col md:justify-start" >
    <div class="md:ml-20 m-5">
      <button
        class="bg-blue rounded text-white py-2 px-4 mr-5 mb-5  "
        data-id="1"
        v-on:click="showForm"
        >Заказать в Москву
      </button>
      <button
        data-id="2"
        v-on:click="showForm"
        class="bg-teal rounded text-white py-2 px-4 "
      >
        Заказать в Санкт-Петербург
      </button>
    </div>
  </div>  
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: "CitySelection",
  methods: {
   
    ...mapMutations ([ 'toggleFormVisible']),
    ...mapActions([ 'defaultCityById' ]),

    showForm(event) {
      const btn = event.target
      const btnId = +btn.dataset.id
      //console.log('on  city button click - btnId', btnId)
      this.$store.dispatch('defaultCityById', btnId)
      this.$store.commit('toggleFormVisible')
    }
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
