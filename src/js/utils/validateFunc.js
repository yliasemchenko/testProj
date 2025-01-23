import IMask from 'imask'

function onInput(e, id, formClass){
    const inputId = id
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const phonePattern = /^\+375\(\d{2}\)\d{3}-\d{2}-\d{2}$/
    const spanError = document.querySelector(`span#${inputId}`)

    if (inputId === `${formClass}_email`) {
        if (!emailPattern.test(e.target.value)) {
            spanError.style.display = 'block'
            spanError.textContent = 'Введите корректную почту'

        } else {
            spanError.style.display = 'none'
            e.target.classList.remove('active')
        }
    } else if (inputId === `${formClass}_tel`){
        const element = document.getElementById(`${formClass}_tel`);
        const maskOptions = {
            mask: '+{375}(00)000-00-00'
        }
        const mask = IMask(element, maskOptions)
        if (!phonePattern.test(mask._value)) {
            spanError.style.display = 'block'
            spanError.textContent = 'Введите номер в формате +375(29)888-77-66'

        } else {
            spanError.style.display = 'none'
            e.target.classList.remove('active')
        }
    } else  {
        const minLength = (inputId === `${formClass}_text`) ? 5 : 2;
        if (e.target.value.length < minLength) {
            spanError.style.display = 'block'
            spanError.textContent = `Длина должна быть не менее ${minLength} символов`
        } else {
            spanError.style.display = 'none'
            e.target.classList.remove('active')
        }
    }
}

function onBlur(tag, id) {
    const inputEl = document.querySelector(`${tag}#${id}`)
    const spanError = document.querySelector(`span#${id}`)

    if(inputEl.value === ""){
        spanError.style.display = 'block'
        spanError.textContent = "Заполните это поле"
    } else {
        if (spanError.style.display === 'block'){
            inputEl.classList.add('active')
            spanError.style.display = 'none'
        } else {
            inputEl.classList.remove('active')
        }
    }
}

function onFocus(tag,id) {
    const inputEl = document.querySelector(`${tag}#${id}`)
    const spanError = document.querySelector(`span#${id}`)
    
    if (inputEl.classList.contains('active')){
        spanError.style.display = 'block'
    }
} 




export { onBlur, onFocus, onInput}