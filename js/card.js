import { productCards } from "../js/mockdata.js";

const cardsContainer = document.querySelector('.cards-container');

if (productCards && cardsContainer) {
    productCards.forEach((card) => {

        const benefitsList = card.benefits;
        const benefitsHTML = benefitsList.map(benefit => `<li><div class="card-svg" aria-hidden="true"></div>${benefit}</li>`).join('');

        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.id = card.id;
        if (card.title === 'Personal') cardElement.classList.add('active');
        cardElement.innerHTML = `
            <h3>${card.title}</h3>
            <p class='price'>$${card.price}</p>
            <p>${card.subtitle}</p>
            <ul class='card__list'>
                ${benefitsHTML}
            </ul>
            <button class="button version_button">Get Started</button>
        `;

        cardsContainer.appendChild(cardElement);
    });
};

const productBtnPrev = document.querySelector('.cards-container__btns_prev');
const productBtnNext = document.querySelector('.cards-container__btns_next');

const cardArray = cardsContainer.querySelectorAll('.card');

let currentIndex = 1;

productBtnPrev.addEventListener('click', () => {

    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }

});

productBtnNext.addEventListener('click', () => {

     if (currentIndex < cardArray.length - 1) {
        currentIndex++;
        updateSlider();
     }

});

const isMobileMedia = window.matchMedia("(max-width: 768px)");

function updateSlider() {

    if (!isMobileMedia.matches) {
        cardsContainer.style.transform = 'translateX(0px)';
        return;
    };

    const paddingContainer = parseInt(window.getComputedStyle(cardsContainer).gap) || 0;
    const currentCardWidth = cardArray[0].offsetWidth;

    const newOffset = -(currentIndex * (currentCardWidth + paddingContainer));

    cardsContainer.style.transform = `translateX(${newOffset}px)`;
    
    cardArray.forEach((card, index) => {
        card.classList.toggle('active', index === currentIndex);
    });

    productBtnPrev.classList.toggle('disable', currentIndex === 0);
    productBtnNext.classList.toggle('disable', currentIndex === cardArray.length - 1);
}

updateSlider();

window.addEventListener('resize', updateSlider);

cardArray.forEach(card => {
    card.addEventListener('click', () => {
        if (!isMobileMedia.matches) {
            cardArray.forEach(card => {
                card.classList.remove('active');
            })
            card.classList.add('active');
        }
    });
});