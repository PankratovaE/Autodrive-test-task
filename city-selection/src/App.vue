<template>
  <div id="app" class="my-auto mx-0 p-0 box-border relative">

    <Popup v-if="getIsFormVisible">
      <Form />
    </Popup>

    <Popup v-if="getIsResponseVisible">
      <SubmitResult />
    </Popup>


    <CitySelection />
  </div>
</template>

<script>
import CitySelection from "./components/CitySelection.vue";
import Form from "./components/ModalWindows/Form.vue";
import Popup from './components/ModalWindows/Popup.vue';
import SubmitResult from './components/ModalWindows/SubmitResult.vue';
import { mapGetters } from 'vuex'

export default {
  name: "App",
  components: {
    CitySelection,
    Form,
    Popup,
    SubmitResult,
  },
    computed: {
    ...mapGetters(['getIsFormVisible', 'getIsResponseVisible'])
  }

};
</script>

<style>
</style>
