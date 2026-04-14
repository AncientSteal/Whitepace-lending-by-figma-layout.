const popupContainer = document.querySelector('.popup-container');
const popupCloseBtn = document.querySelector('.popup-close__btn');
const loginBtn = document.querySelector('.header-button__login');
const loginPopup = document.querySelector('.login-form');
const registrationPopup = document.querySelector('.registration-form');
const resetPopup = document.querySelector('.reset-form');
const productPopup = document.querySelector('.product-form');
const productChooseBtns = document.querySelectorAll('.button-arrow');

function togglePopup(popup) {

    popup.classList.toggle('active');

    if (!popupContainer) return;

    if (popupContainer.classList.contains('active')) {
        return;    
    } else {
        popupContainer.classList.toggle('active');
    }
};

function closePopup(popup = null) {
    if (!popup) {
        if (popupContainer) {

            const popupElements = popupContainer.querySelectorAll('.popup__element');

            if (!popupElements) return;

            popupElements.forEach((element) => {
                element.classList.remove('active');
            });

            popupContainer.classList.remove('active');
        }
        
    } else {
        popup.classList.remove('active');
    }
    
};

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        togglePopup(loginPopup);
    });
}

if (popupCloseBtn) {
    popupCloseBtn.addEventListener('click', () => {
        closePopup();
    });
}

if (popupContainer) {
    popupContainer.addEventListener('click', (event) => {

        const target = event.target;
    
        if (target === popupContainer) {
            closePopup();
            return;
        }
    
        if (target.classList.contains('registrate__btn')) {
            closePopup();
            togglePopup(registrationPopup);
        }
    
        if (target.classList.contains('to-login__btn')) {
            closePopup();
            togglePopup(loginPopup);
        }
    
        if (target.classList.contains('reset-password__btn')) {
            closePopup();
            togglePopup(resetPopup);
        }
    });
}

if (productChooseBtns && productPopup) {
    productChooseBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            togglePopup(productPopup);
        });
    });
}



const pricingSection = document.getElementById('pricing');
const cardsContainer = document.querySelector('.cards-container');


if (productPopup) {
    const toVersionsBtn = productPopup.querySelector('.back__btn');
    const productInputs = productPopup.querySelectorAll('input');
    if (toVersionsBtn && pricingSection) {
        toVersionsBtn.addEventListener('click', () => {
            closePopup();
            pricingSection.scrollIntoView();
        });
    }

    if (cardsContainer && (productInputs.length > 0)) {
        cardsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('version_button')) {
                const parentCard = event.target.closest('.card');
                const cardId = parentCard.id;
    
                togglePopup(productPopup);
                productInputs.forEach(input => {
                    input.checked = (input.value === cardId);
                })
            }
    
        });
    }
}





