import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(head)

app.mount('#app')

console.log('%c' + `
   _____ ________     __ 
  / ____|___  /\\ \\   / / 
 | (___    / /  \\ \\_/ /  
  \\___ \\  / /    \\   /   
  ____) |/ /__    | |    
 |_____//_____|   |_|    
                         
 欢迎访问SZY创新工作室官网！
 由 Vue 3 + Vite + Tailwind CSS 驱动
`, 'color: #3D5A80; font-weight: bold;')
