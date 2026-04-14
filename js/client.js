import { clientCards } from "./mockdata.js";

const cardContainer = document.querySelector('#client-card__container');

if (clientCards && cardContainer) {
    clientCards.forEach(client => {
        const cardElement = document.createElement('div');
        cardElement.className = 'client-card';

        cardElement.innerHTML = `
            <div class="client-says">
                <div class="client-svg"></div>
                <p>${client.review}</p>
            </div>
            <div  class="clent-profile">
                <div class="client-avatar"><img src="${client.avatar}" alt="avatar"></div>
                <div class="client-info">
                    <h3>${client.name}</h3>
                    <p>${client.adress}</p>
                </div>
            </div>
        `;
        cardContainer.appendChild(cardElement);
    });
};

const clientBtnPrev = document.querySelector('.clients-container__btns_prev');
const clientBtnNext = document.querySelector('.clients-container__btns_next');
const clientArray = cardContainer.querySelectorAll('.client-card');
const sliderContainer = document.querySelector('.slider-container');

if (clientBtnPrev && clientBtnNext && clientArray) {

    let currentIndex = 0;
    let visibleCards = 3;

    function calcVisibleCards() {
        if (window.matchMedia("(min-width: 1152px)").matches) {
            visibleCards = 3;
        } else if (window.matchMedia("(max-width: 768px)").matches) {
            visibleCards = 1;
        } else {
            visibleCards = 2;
        }
    }

    sliderContainer.addEventListener('click', (event) => {
        if (event.target === clientBtnPrev) {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            };
        } else if (event.target === clientBtnNext) {
            if (currentIndex < clientArray.length - visibleCards) {
                currentIndex++;
                updateSlider();
            };
        }
    });

    function updateSlider() {

        calcVisibleCards();

        currentIndex = Math.min(currentIndex, clientArray.length - visibleCards);

        const paddingContainer = parseInt(window.getComputedStyle(cardContainer).gap) || 0;
        const cardWidth = clientArray[0].offsetWidth;
        const newOffset = -(currentIndex * (cardWidth + paddingContainer));

        cardContainer.style.transform = `translateX(${newOffset}px)`;

        clientBtnPrev.classList.toggle('disable', currentIndex === 0);
        clientBtnNext.classList.toggle('disable', currentIndex === clientArray.length - visibleCards);
    }

    updateSlider();

    window.addEventListener('resize', updateSlider);

    clientArray.forEach(card => {
        card.addEventListener('click', () => {
            clientArray.forEach(card => {
                card.classList.remove('active');
            });
            card.classList.add('active');
        });
    });
};