///DOM objs
const pokedex = document.querySelector('.pokedex')

//pokedex

function createPokedex(){

    createLeftContainer();

    createRightContainer();

    
}



function createLeftContainer(){
// createElements
const leftContainer = document.createElement('div')
leftContainer.classList.add('left-container')

const leftTopSection = document.createElement('div')
leftTopSection.classList.add('left-container__top-section')

const leftMainSectionContainer = document.createElement('div')
leftMainSectionContainer.classList.add('left-container__main-section-container')

const leftMainSection = document.createElement('div')
leftMainSection.classList.add('left-container__main-section')

const leftSecondContainer = document.createElement('div')
leftSecondContainer.classList.add('left-container__right')

createScreenContainer(leftMainSection);



//Appends
leftMainSectionContainer.append(leftMainSection, leftSecondContainer)

leftContainer.append(leftTopSection, leftMainSectionContainer)

pokedex.append(leftContainer)
}

function createScreenContainer(leftMainSection){
    const mainWhiteSection = document.createElement('div')
    mainWhiteSection.classList.add('main-section__white')

    const mainBlackSection = document.createElement('div')
    mainBlackSection.classList.add('main-section__black')

    createScreen(mainBlackSection);

//Appends
mainWhiteSection.append(mainBlackSection)

leftMainSection.append(mainWhiteSection)

}
//missing the hide class for now let it show
function createScreen(mainBlackSection){
    const mainScreen = document.createElement('div')
    mainScreen.classList.add('main-screen')
    mainScreen.classList.add('hide')
//header
    const screenHeader = document.createElement('div')
    screenHeader.classList.add('screen__header')

    const pokeName = document.createElement('span')
    pokeName.classList.add('poke-name')

    const pokeId = document.createElement('span')
    pokeId.classList.add('poke-id')

//img
    const screenImg = document.createElement('div')
    screenImg.classList.add('screen__image')

    const frontImg = document.createElement('img')
    frontImg.classList.add('poke-front-image')

    const backImg = document.createElement('img')
    backImg.classList.add('poke-back-image')

//description
    const description = document.createElement('div')
    description.classList.add('screen__description')

    //type
    const pokeType = document.createElement('div')
    pokeType.classList.add('poke__type')

    const pokeType1 = document.createElement('div')
    pokeType1.classList.add('poke-type-1')

    const pokeType2 = document.createElement('div')
    pokeType2.classList.add('poke-type-2')
    
    //stats
    const pokeStats = document.createElement('div')
    pokeStats.classList.add('poke__stats')

    const pokeWeight = document.createElement('p')
    pokeWeight.classList.add('poke__weight')
    pokeWeight.innerText = 'Weight '

    const pokeHeight = document.createElement('p')
    pokeHeight.classList.add('poke__height')
    pokeHeight.innerText = 'Height: '

//Comments container
const commentContainer = document.createElement('div')
commentContainer.classList.add('screen__comment')
    //comments
    const commentList = document.createElement('ul')
    commentList.classList.add('comment__list')

    //Form
    const commentForm = document.createElement('form')
    commentForm.classList.add('comment__form')
    
    const commentInput = document.createElement('input')
    commentInput.classList.add('comment__input')
    commentInput.type= 'text'
    commentInput.placeholder= 'Add a comment...'

    const commentButton = document.createElement('button')
    commentButton.classList.add('comment__button')
    commentButton.type = 'submit'
    commentButton.innerText = 'Post'

// appends start from bottom to top
commentForm.append(commentInput, commentButton)

pokeStats.append(pokeWeight, pokeHeight)

pokeType.append(pokeType1, pokeType2)

commentContainer.append(commentList, commentForm)

description.append(pokeType, pokeStats)

screenImg.append(frontImg, backImg)

screenHeader.append(pokeName, pokeId)

mainScreen.append(screenHeader, screenImg, description, commentContainer)

mainBlackSection.append(mainScreen)
}

function createRightContainer(){
// createElements
const rightContainer = document.createElement('div')
rightContainer.classList.add('right-container')
//black-container
const rightContainerBlack = document.createElement('div')
rightContainerBlack.classList.add('right-container-black')
    //screen
    const rightScreenContainer = document.createElement('div');
    rightScreenContainer.classList.add('right-container__screen')
        //li for the containers
        for(let i = 0; i<=27;i++){
            let div = document.createElement('div')
            div.classList.add('list-item')
            rightScreenContainer.append(div)
        }
//right container buttons

const rightContainerButtons = document.createElement('div');
rightContainerButtons.classList.add('right-container__buttons')
        //left button
        const leftButton = document.createElement('div');
        leftButton.classList.add('left-button')
        leftButton.innerText = "Prev"

        //right button
        const rightButton = document.createElement('div');
        rightButton.classList.add('right-button')
        rightButton.innerText = "Next"
        
//Appends
rightContainerButtons.append(leftButton, rightButton)

rightContainerBlack.append(rightScreenContainer)

rightContainer.append(rightContainerBlack, rightContainerButtons)

pokedex.append(rightContainer)

}

createPokedex();