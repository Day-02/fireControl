import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Firewarning from '../components/Firewarning/Firewarning.vue'
import Feedback from '../components/Feedback/Feedback.vue'
import Address from '../components/Address/Address.vue'
import Resident from '../components/Resident/Resident.vue'
import Apartment from '../components/Apartment/Apartment.vue'
import Station from '../components/Firestation/Station.vue'
import Fireman from '../components/Fireman/Fireman.vue'
import Firecar from '../components/Firecar/Firecar.vue'
import myCharts from '../components/Charts/myCharts.vue'
import jibenPage from '../components/screen/pages/jibenPage.vue'
import chujingPage from '../components/screen/pages/chujingPage.vue'
import mapPage from '../components/screen/pages/mapPage.vue'
import screen from '../components/screen/components/screen.vue'

Vue.use(VueRouter)
Vue.use(Login)
Vue.use(Home)
Vue.use(Welcome)
Vue.use(Firewarning)
Vue.use(Feedback)
Vue.use(Resident)
Vue.use(Apartment)
Vue.use(Address)
Vue.use(Station)
Vue.use(Fireman)
Vue.use(Firecar)
Vue.use(myCharts)
Vue.use(jibenPage)
Vue.use(chujingPage)
Vue.use(mapPage)
Vue.use(screen)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/jiben', component: jibenPage },
  { path: '/chujing', component: chujingPage },
  { path: '/mapdata', component: mapPage },
  { path: '/screen', component: screen },
  {
    path: '/home', component: Home, redirect: '/resident',
    children: [{ path: '/mycharts', component: myCharts },,
    { path: '/firewarning', component: Firewarning },
    { path: '/feedback', component: Feedback },
    { path: '/resident', component: Resident },
    { path: '/apartment', component: Apartment },
    { path: '/address', component: Address },
    { path: '/station', component: Station },
    { path: '/fireman', component: Fireman },
    { path: '/firecar', component: Firecar },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
