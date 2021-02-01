import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Appraise from '../components/Information/Appraise.vue'
import Firewarning from '../components/Information/Firewarning.vue'
import Feedback from '../components/Information/Feedback.vue'
import Map from '../components/Map/Map.vue'
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
Vue.use(Map)
Vue.use(User)
Vue.use(Role)
Vue.use(Power)
Vue.use(Station)
Vue.use(Fireman)
Vue.use(Firecar)
Vue.use(Data)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home', component: Home, redirect: '/welcome',
    children: [{ path: '/welcome', component: Welcome },
    { path: '/firewarning', component: Firewarning },
    { path: '/appraise', component: Appraise },
    { path: '/feedback', component: Feedback },
    { path: '/call', component: Call },
    { path: '/resident', component: Resident },
    { path: '/apartment', component: Apartment },
    { path: '/map', component: Map },
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
