//DOM objs
const mainScreen = document.querySelector('.main-screen');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeType1 = document.querySelector('.poke-type-1');
const pokeType2 = document.querySelector('.poke-type-2');
const pokeWeight = document.querySelector('.poke__weight');
const pokeHeight = document.querySelector('.poke__height');
const pokeListItems = document.querySelectorAll('.list-item')

const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');

const lis = document.querySelectorAll('li')

const ul = document.querySelector('.comment__list')

const form = document.querySelector('.comment__form')


////////variables

const TYPES = [
  'normal', 'fighting', 'flying',
  'poison', 'ground', 'rock',
  'bug', 'ghost', 'steel',
  'fire', 'water', 'grass',
  'electric', 'psychic', 'ice',
  'dragon', 'dark', 'fairy'
];
let prevUrl = null;
let nextUrl = null;
/////// API calls

function getComments(id){
  return fetch(`http://localhost:3000/comments`).then(resp => resp.json()).then(comments => renderComment(comments, id))
}

////////functions

function renderComment(comments, id){
    const commentsArray = comments;
    for(const comment of commentsArray){
      if(comment.pokemon_id == id){
        let li = document.createElement('li')
        li.innerText = comment.content
        ul.append(li)
      }
    }
}

function resetScreen(){
  mainScreen.classList.remove('hide');
  for(const type of TYPES){
    mainScreen.classList.remove(type);
  }

}
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

function fetchPokeList(url){
  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    console.log(data);
    const { results, previous, next } = data;
    prevUrl = previous;
    nextUrl = next;

    for (let i = 0; i < pokeListItems.length; i++){
      const pokeListItem = pokeListItems[i];
      const resultData = results[i];
      

      if (resultData){
        const { name, url } = resultData;
        const urlArray = url.split('/')
        const id = urlArray[urlArray.length - 2];
        pokeListItem.innerText = id + '. ' + capitalize(name);
      }else{
        pokeListItem.innerText = '';
      }
    }
  })
}

function fetchPokeList(id){
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(resp => resp.json())
      .then(data => {

        resetScreen();

        const dataType = data['types'];
        const dataFirstType = dataType[0];
        const dataSecondType = dataType[1];

        pokeType1.innerText = capitalize(dataFirstType['type']['name']);
        

        if (dataSecondType){
            pokeType2.innerText = capitalize(dataSecondType['type']['name']);
        }else{
          pokeType2.classList.add('hide');
          pokeType2.innerText = '';
        }

        mainScreen.classList.add(dataFirstType['type']['name']);

        pokeName.innerText = capitalize(data['name']);
        pokeId.innerText = data['id'];
        pokeWeight.innerText = `Weight: ${data['weight']}`;
        pokeHeight.innerText = `Height: ${data['height']}`;

        pokeFrontImage.src = data['sprites']['front_default'] || '';
        pokeBackImage.src = data['sprites']['back_default'] || '';
        
      });
}

function handleLeftButtonClick(){
  if(prevUrl){
    fetch(prevUrl)
  .then(resp => resp.json())
  .then(data => {
    const { results, previous, next } = data;
    prevUrl = previous;
    nextUrl = next;

    for (let i = 0; i < pokeListItems.length; i++){
      const pokeListItem = pokeListItems[i];
      const resultData = results[i];
      

      if (resultData){
        const { name, url } = resultData;
        const urlArray = url.split('/')
        const id = urlArray[urlArray.length - 2];
        pokeListItem.innerText = id + '. ' + capitalize(name);
      }else{
        pokeListItem.innerText = '';
      }
    }
  })
  }
}

function handleRightButtonClick(){
  if(nextUrl){
    fetch(nextUrl)
  .then(resp => resp.json())
  .then(data => {
    const { results, previous, next } = data;
    prevUrl = previous;
    nextUrl = next;

    for (let i = 0; i < pokeListItems.length; i++){
      const pokeListItem = pokeListItems[i];
      const resultData = results[i];
      

      if (resultData){
        const { name, url } = resultData;
        const urlArray = url.split('/')
        const id = urlArray[urlArray.length - 2];
        pokeListItem.innerText = id + '. ' + capitalize(name);
      }else{
        pokeListItem.innerText = '';
      }
    }
  })
  }
};

function handleListCLick(event){
  ul.innerHTML = '';
  if (!event.target){
    return;
  }
  const listItem = event.target

  if (!listItem.innerText){
    return;
  }

  const id = listItem.innerText.split('.')[0]
  fetchPokeList(id);
  
  getComments(id)



}

//Event Listeners

      leftButton.addEventListener('click', handleLeftButtonClick)

      rightButton.addEventListener('click', handleRightButtonClick)

for(const pokeListItem of pokeListItems){
  pokeListItem.addEventListener('click', handleListCLick)
}


// add eventListener to the button
form.addEventListener('submit', (event) => {
  event.preventDefault();
  //grap the contend of the input field of the form
  let input = event.target[0].value
  //make the post request to create the comment in the backend
  fetch('http://localhost:3000/comments', {
    method: 'POST',
    headers: {"Content-Type": "application/json", "Accept": "application/json"},
    body: JSON.stringify({
        content: input,
        pokemon_id: parseInt(pokeId.innerText)
    })
  }).then(resp => resp.json())``
    .then(comment => {
      let li = document.createElement('li')
        li.innerText = comment.content
        ul.append(li)
    })
  form.reset();
  //let li = document.createElement('li')
  //li.innerText = input;

  //ul.append(li)
})
//ones we have the content we crete a li

//give the contend to the li

//append the li to the ul of the container



//Initialize APP

fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=28')
  .then(resp => resp.json())
  .then(data => {
    const { results, previous, next } = data;
    prevUrl = previous;
    nextUrl = next;

    for (let i = 0; i < pokeListItems.length; i++){
      const pokeListItem = pokeListItems[i];
      const resultData = results[i];
      

      if (resultData){
        const { name, url } = resultData;
        const urlArray = url.split('/')
        const id = urlArray[urlArray.length - 2];
        pokeListItem.innerText = id + '. ' + capitalize(name);
      }else{
        pokeListItem.innerText = '';
      }
    }
  })