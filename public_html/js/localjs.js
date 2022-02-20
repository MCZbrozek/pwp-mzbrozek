console.log('Is this thing on??')

// Portfolio card rotate -----------//
const portfolioCard = document.querySelector('.portfolio-wrap .card')

function rotateCard() {
    if(portfolioCard.style.rotate === '0') {
    portfolioCard.style.setProperty('--rotate', -1.2)
        } else (portfolioCard.style.rotate == '-1.2' ); {
        portfolioCard.style.setProperty('--rotate', 1.2)
    }
}

function rotateBack() {


}

portfolioCard.addEventListener('mouseover', rotateCard)
portfolioCard.addEventListener('mouseleave', rotateCard)

console.log(portfolioCard)