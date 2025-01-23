import { onBlur, onFocus, onInput} from "../utils/validateFunc";
import { postData } from "../services/services";
import { showThanksModal } from "../utils/modalFunc";

function forms(formClass){
    console.log(formClass)
    const form = document.querySelector(`.${formClass}__form`)
    const formErrorElement = form.querySelector(`.${formClass}__empty_error`)
    const inputsForm = form.querySelectorAll(`.${formClass}__input_valid`)

    const message = {
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    validationForm()
    sendForm()


    function validationForm(){
        if(inputsForm){
            inputsForm.forEach(item => {
                item.addEventListener('input', (e) => {
                    console.log(e.target.value)
                    onInput(e, e.target.id, formClass)
                })
    
                item.addEventListener('blur', (e) => {
                    console.log(e)
                    onBlur(e.target.localName, e.target.id, formClass)
                })
    
                item.addEventListener('focus', (e) => {
                    onFocus(e.target.localName, e.target.id, formClass)
                })
            })
        }
    }

    function formError() {
        const errorMessage = 'Заполните корректно все поля для отправки формы.'
        formErrorElement.textContent = errorMessage
    }

    function checkValidInput(){
        if(inputsForm){
            for (let input of inputsForm) {
                if (input.classList.contains('active')) {
                    return false
                }
                if (input.value === ""){
                    return false
                }
            }
            return true
        }
    }
    
    function sendForm(){
        if(form){
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const isValid = checkValidInput()
                console.log()
                if(isValid){
                    const formData = new FormData(form)
                    const json = JSON.stringify(Object.fromEntries(formData.entries()))
                    
                    postData('https://6790f322af8442fd737873e2.mockapi.io/answ', json)
                    .then(() => {
                        showThanksModal(message.success)
                    }).catch(() => {
                        showThanksModal(message.failure)
                    }).finally(() => {
                        form.reset()
                        formErrorElement.textContent = ""
                    });
                } else {
                    formError()
                }
                
            });
        }
    }
    
}

export default forms