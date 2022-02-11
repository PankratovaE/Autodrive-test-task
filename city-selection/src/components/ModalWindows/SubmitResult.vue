<template>
    <div 
        class="flex justify-center items-center absolute top-0 left-0 w-screen h-screen  bg-opacity-60 bg-grey-darker z-50"
        @click.self="close()"
    >
        <div class="max-w-lg p-6 relative bg-white rounded-lg flex flex-col justify-center align-center">
            <h3 class="my-5">{{getServerResponse}}</h3>
            <button
                v-on:click="close"
                class="bg-teal rounded text-white py-2 px-4"
            >
                Close
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {

    computed: {
        ...mapGetters(['getServerResponse'])
    },
    methods: {
        ...mapMutations(['toggleResponseVisible']),
        close() {
            this.$store.commit('toggleResponseVisible')
        }
    }

}
</script>