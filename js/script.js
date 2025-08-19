const navElement = document.getElementById('navigation');
function updateScrollPadding(){
    if (!navElement) return;
    const navigation_height = navElement.offsetHeight;
    document.documentElement.style.setProperty('--scroll-padding', navigation_height + 'px');
}
updateScrollPadding();
window.addEventListener('resize', updateScrollPadding);

const menu = document.getElementById('menu');
const navbar = document.getElementById('navbar');
let menu_drop = false;

function openMenu(){
    if (!navbar) return;
    navbar.classList.add('navbar--open');
    if (menu) menu.setAttribute('aria-expanded', 'true');
    menu_drop = true;
}
function closeMenu(){
    if (!navbar) return;
    navbar.classList.remove('navbar--open');
    if (menu) menu.setAttribute('aria-expanded', 'false');
    menu_drop = false;
}
function toggleMenu(){
    if (menu_drop) closeMenu(); else openMenu();
}

if (menu && navbar) {
    // Improve accessibility of the menu icon
    menu.setAttribute('role', 'button');
    menu.setAttribute('tabindex', '0');
    menu.setAttribute('aria-controls', 'navbar');
    menu.setAttribute('aria-expanded', 'false');

    // Toggle navbar visibility on menu click / keyboard
    menu.addEventListener('click', toggleMenu);
    menu.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Close on nav item click
    const nav_items = document.getElementsByClassName('nave_item');
    for (let i = 0; i < nav_items.length; i++) {
        nav_items[i].addEventListener('click', () => {
            if (menu_drop) closeMenu();
        });
    }

    // Click outside to close (mobile)
    document.addEventListener('click', (e) => {
        if (!menu_drop) return;
        const t = e.target;
        if (t === menu || navbar.contains(t)) return;
        closeMenu();
    });

    // On resize to desktop, ensure menu is closed (match CSS breakpoint)
    window.addEventListener('resize', () => {
        const isMobile = window.matchMedia('(max-width: 1580px)').matches;
        if (!isMobile) closeMenu();
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu_drop) {
            closeMenu();
        }
    });
}
