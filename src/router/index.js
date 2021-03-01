import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Appraise from '../components/Information/Appraise.vue'
import Firewarning from '../components/Information/Firewarning.vue'
import Feedback from '../components/Information/Feedback.vue'
import Address from '../components/Address/Address.vue'
import Call from '../components/Call/Call.vue'
import Resident from '../components/Resident/Resident.vue'
import Apartment from '../components/Apartment/Apartment.vue'
import User from '../components/System/User.vue'
import Role from '../components/System/Role.vue'
import Power from '../components/System/Power.vue'
import Station from '../components/Station/Station.vue'
import Fireman from '../components/Fireman/Fireman.vue'
import Firecar from '../components/Firecar/Firecar.vue'
import Data from '../components/Data/Data.vue'
import myCharts from '../components/Data/myCharts.vue'
import jibenPage from '../components/screen/pages/jibenPage.vue'
import chujingPage from '../components/screen/pages/chujingPage.vue'
import mapPage from '../components/screen/pages/mapPage.vue'
import screen from '../components/screen/components/screen.vue'

Vue.use(VueRouter)
Vue.use(Login)
Vue.use(Home)
Vue.use(Welcome)
Vue.use(Appraise)
Vue.use(Firewarning)
Vue.use(Feedback)
Vue.use(Call)
Vue.use(Resident)
Vue.use(Apartment)
Vue.use(Address)
Vue.use(User)
Vue.use(Role)
Vue.use(Power)
Vue.use(Station)
Vue.use(Fireman)
Vue.use(Firecar)
Vue.use(Data)
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
    { path: '/appraise', component: Appraise },
    { path: '/feedback', component: Feedback },
    { path: '/call', component: Call },
    { path: '/resident', component: Resident },
    { path: '/apartment', component: Apartment },
    { path: '/address', component: Address },
    { path: '/user', component: User },
    { path: '/role', component: Role },
    { path: '/power', component: Power },
    { path: '/station', component: Station },
    { path: '/fireman', component: Fireman },
    { path: '/firecar', component: Firecar },
    { path: '/data', component: Data },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
