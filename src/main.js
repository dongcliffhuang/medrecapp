// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue 			from 'vue'
import App 			from './App'
import Home 		from './components/Home'
import TimeEntries 	from './components/TimeEntries'
import LogTime 		from './components/LogTime'
import Appointments from './components/Appointments'
import DrugInventory from './components/DrugInventory'

import PhysiciansList from './components/PhysiciansList'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

import VueRouter 	from 'vue-router'
import VueResource 	from 'vue-resource'
import store from './store'


Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueMaterial) 

const router = new VueRouter({
	routes: [
		{ path: '/', component: Home},
		{ path: '/home', component: Home},
		{ path: '/time-entries', component: TimeEntries,
			children: [
				{
					path: 'log-time',
					component: LogTime
				}
			]
		},
		{ path: '/appointment-entries', component: Appointments},
		{ path: '/physicians-list', component: PhysiciansList},
		{ path: '/drugInfo', component: DrugInventory},
		{ path: '*', redirect: '/home'}
	],
	mode: 'history' 
})

var bus = new Vue({});

/* eslint-disable no-new */
const app = new Vue({
	router,
	store,
	data: {
		bus: bus
	},
	render: h => h(App)
}).$mount('#app')
Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'blue',
  warn: 'red',
  background: 'white'
})
