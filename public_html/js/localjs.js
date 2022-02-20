console.log('Is this thing on??')

// Portfolio card rotate -----------//
const portfolioCard = document.getElementById('rotate-wrap')

function rotateCard(e) {
    this.style.setProperty('--rotate', 1.8)
}

function rotateBack() {
    this.style.setProperty('--rotate', -100)
    console.log(rotateBack)
}

portfolioCard.addEventListener('mouseenter', rotateCard)
portfolioCard.addEventListener('mouseleave', rotateBack)

