import Vue from 'vue'
import App from './App.vue'

let E_SERVER_ERROR = 'Error communicating with the server'

let vm = new Vue({
	el: '#app',
	template: '<app/>',
	components: {
		App
	}
})