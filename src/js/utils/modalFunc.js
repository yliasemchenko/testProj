import forms from "../modules/form";

function closeModal(modalSelector) {
    const modal = document.querySelector(`.${modalSelector}`);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector) {
    const modal = document.querySelector(`.${modalSelector}`);

    forms(modalSelector)

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

}


function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog')

    prevModalDialog.classList.add('hide')
    openModal('modal')

    const thanksModal = document.createElement('div')
    thanksModal.classList.add('modal__dialog')
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `
    document.querySelector('.modal').append(thanksModal)
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show')
        prevModalDialog.classList.remove('hide')
        closeModal('modal')
    }, 4000)
}

export { showThanksModal, openModal, closeModal }