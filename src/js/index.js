import '../index.html'
import '../scss/index.scss'
import forms from './modules/form'
import modal from './modules/modal'

window.addEventListener('DOMContentLoaded', function(){
    forms('contacts')
    modal('[data-modal]','modal')

}) 