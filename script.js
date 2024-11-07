let text = document.getElementById('text');
let leaf = document.getElementById('leaf');
let hill1 = document.getElementById('hill1');
let hill4 = document.getElementById('hill4');
let hill5 = document.getElementById('hill5');

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    text.style.marginTop = value * 2.5 + 'px';
    leaf.style.top = value * -1.5 + 'px';
    leaf.style.left = value * 1.5 + 'px';
    hill4.style.left = value * 1.5 + 'px';
    hill5.style.left = value * -1.5 + 'px';
    hill1.style.top = value * 1 + 'px';
})


function scrollAnimation() {
    const images = document.querySelectorAll('.scroll-animation');
    
    images.forEach((img) => {
        const rect = img.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);

        if (isVisible) {
            img.classList.add('visible');
        } else {
            img.classList.remove('visible');
        }
    });
}

window.addEventListener('scroll', scrollAnimation);

scrollAnimation();
