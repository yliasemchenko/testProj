import { openModal, closeModal } from "../utils/modalFunc";

function modal(triggerSelector, modalSelector) {

    const modalTrigger = document.querySelectorAll(triggerSelector)
    const modal = document.querySelector(`.${modalSelector}`)
    console.log(modalSelector)

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector))

    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal(modalSelector);
        }
    });

    /* function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll); */
}

export default modal
