<template>
    <div 
        class="flex justify-center items-center absolute top-0 left-0 w-screen h-screen  bg-opacity-60 bg-grey-darker z-50"
        @click.self="close()"
    >
        <div class="w-4/5 md:max-w-lg p-6 relative bg-white rounded-lg ">
        <h1 class="md:text-2xl text-xl">Заказать звонок</h1>
        <div>
            <form class="flex flex-col md:flex-row md:flex-wrap justify-between mt-5">
                <div>
                    <label for="name" class="mb-2 text-md font-medium text-gray-900 dark:text-gray-300">Имя*</label>
                    <input 
                        type="text" 
                        id="name" 
                        v-model="inputData.name"
                        class="border border-gray-500 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block px-2 py-2" 
                        placeholder="Иван Иванов" 
                        required>
                    <p
                        v-if="wrongName"
                        class="text-red"
                    >
                        Неправильно заполнено
                    </p>
                </div>
                <div>
                    <label for="email" class="mb-2 text-md font-medium text-gray-900 dark:text-gray-300">Email*</label>
                    <input 
                        type="email" 
                        id="email" 
                        v-model="inputData.email"
                        class="border border-gray-500 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block px-2 py-2" 
                        placeholder="you@example.com" 
                        required>
                    <p
                        v-if="wrongEmail"
                        class="text-red"
                    >
                        Неправильно заполнено
                    </p>
                </div>
                <div>
                    <label for="phone" class="mb-2 text-md font-medium text-gray-900 dark:text-gray-300">Телефон*</label>
                    <input
                        id="phone"
                        v-model="inputData.phone"
                        v-mask="'+7 (###) ###-##-##'" 
                        autocomplete="tel" 
                        placeholder="+7(___) ___-__-__" 
                        class="border border-gray-500 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block px-2 py-2" 
                        type="tel" 
                        required
                    >
                    <p
                        v-if="wrongPhone"
                        class="text-red"
                    >
                        Неправильно заполнено
                    </p>
                </div>
                <div>
                    <label for="cities" class="mb-2 text-md font-medium text-gray-900 dark:text-gray-300">Город*</label>
                    <select
                        id="cities"
                        v-model="inputData.city_id"
                        class="border border-gray-500 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block px-2 py-2" 
                    >
                        <option disabled value="null">{{defCity.name}}</option>
                        <option 
                            v-for="city in getCities" 
                            :key="city.id" 
                            v-bind:value="city.id"
                            :selected="city.id === defCity.id"
                        >
                            {{ city.name }}
                        </option>
                    </select>
                </div>
                <div class="md:ml-auto mt-5">
                    <button
                        class="bg-green rounded text-white py-2 px-4 w-40"
                        v-on:click="submitHandler"
                    >Отправить</button>
                </div>
            </form>
        </div>
        
        </div>
    </div>
</template>

<script>

import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {

    data() {
        return {
            inputData: {
                name: '',
                phone: '',
                email: '',
                city_id: null
            },

            defCity: {},

            wrongName: false,
            wrongEmail: false,
            wrongPhone: false,
        }
    },
 
    computed: {
 
        ...mapGetters([
            'getCities', 'getServerResponse', 'getDefaultCity'
        ]),

    },
    methods: {
        ...mapMutations([
            'setDataToSend', 'toggleFormVisible'
        ]),
        ...mapActions([
            'sendData'
        ]),

        phoneToStr(phone) {
            return phone.replace(/\s/g, '').replace(/[-()/\\]/g, '')
        },

        validEmail(email) {
            let re =  /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;
            if (!re.test(email) || !email) {
                return false
            } else {
                return true
            }
        },

        validate(data) {
            let newPhone = this.phoneToStr(data.phone)
            if (newPhone.length !== 12 || !data.phone) {
                this.wrongPhone = true
            }
            if (!data.name) {
                this.wrongName = true
            }
            if (!this.validEmail(data.email)) {
                this.wrongEmail = true
            }
            if (!data.city_id) {
                this.inputData.city_id = this.defCity.id
            }
            if (this.wrongName || this.wrongEmail || this.wrongPhone) {
                return false
            }

            return true
        },

        submitHandler(event) {
            event.preventDefault()

            this.wrongName = false
            this.wrongEmail = false
            this.wrongPhone = false

            if(this.validate(this.inputData)) {
 
                //console.log('ok, we send form')

                this.$store.dispatch('sendData', {
                    name: this.inputData.name,
                    phone: this.phoneToStr(this.inputData.phone),
                    email: this.inputData.email,
                    city_id: this.inputData.city_id,
                })
                
            }
        },

        close() {
            this.$store.commit('toggleFormVisible')
    }


    },
    mounted() {

        this.defCity = this.getDefaultCity
    }
}
</script>

<style>

</style>