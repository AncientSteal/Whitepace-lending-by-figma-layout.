const menuListBtns = document.querySelectorAll('.menu-list__btn');
const isMobileMedia = window.matchMedia("(max-width: 1152px)");
const menuBtns = document.querySelector('.menu__buttons');

if (menuListBtns) {
    menuListBtns.forEach((menuListBtn) => {

        menuListBtn.addEventListener('click', () => {
    
            if (isMobileMedia.matches) return;
    
    
            const isActive = menuListBtn.classList.contains('active');
    
            menuListBtns.forEach((btn) => {
                btn.setAttribute('aria-expanded', 'false');
                btn.classList.remove('active')
            });
            
            if (!isActive) {
                menuListBtn.setAttribute('aria-expanded', 'true')
                menuListBtn.classList.add('active');
            }
            
        });
    });
}


const burgerMenu = document.querySelector('.burger-menu');
const menuNavigation = document.querySelector('.menu__navigation');

if (burgerMenu) {
    burgerMenu.addEventListener('click', (event) => {

        if (!menuNavigation || !menuBtns || !menuListBtns) return;
    
        menuNavigation.classList.toggle('active');
        menuBtns.classList.toggle('active');
    
        if (menuNavigation.classList.contains('active')) {
            menuNavigation.setAttribute('aria-expanded', 'true')
        } else {
            menuNavigation.setAttribute('aria-expanded', 'false')
        }
        
        menuListBtns.forEach((btn) => {
            if (isMobileMedia.matches) {
                btn.removeAttribute('aria-expanded');
            } else {
                btn.setAttribute('aria-expanded', 'false')
            }
        })
        event.stopPropagation();
    })
}


document.addEventListener('click', (event) => {
    
    if (!menuNavigation || !burgerMenu || !menuBtns || !menuListBtns) return;

    if (menuNavigation.classList.contains('active') && 
        !menuNavigation.contains(event.target) && 
        !burgerMenu.contains(event.target)) {

        menuNavigation.classList.remove('active');
        menuBtns.classList.remove('active');

        if (isMobileMedia.matches) menuNavigation.setAttribute('aria-expanded', 'false'); 
    }

    menuListBtns.forEach((btn) => {
        if (btn.classList.contains('active') && !btn.contains(event.target)) {
            
            btn.classList.remove('active');

            if (!isMobileMedia.matches) btn.setAttribute('aria-expanded', 'false');
        }
    })
});

if (menuNavigation && menuBtns && menuListBtns) {
    window.addEventListener('resize', () => {
        if (isMobileMedia.matches) {
            menuListBtns.forEach((btn) => {
                btn.classList.remove('active');
                btn.removeAttribute('aria-expanded');
            });
            menuNavigation.classList.remove('active');
            menuNavigation.setAttribute('aria-expanded', 'false');
            menuBtns.classList.remove('active');
        } else {
            menuNavigation.classList.remove('active');
            menuNavigation.removeAttribute('aria-expanded');
            menuBtns.classList.remove('active');
            menuListBtns.forEach((btn) => {
                btn.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
            });
        }
    });
}


