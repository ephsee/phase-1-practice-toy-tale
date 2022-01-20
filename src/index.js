let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


// Access the list of toys from an API (mocked using JSON Server) and render each of them in a "card" on the page
fetch('http://localhost:3000/toys')
.then(resp => resp.json())
// .then(toyData => console.log(toyData))
.then(toy => showToys(toy))

function showToys(toy) {
  
  toy.forEach(toy => {

    const collection = document.querySelector('#toy-collection');
    const toyCard = document.createElement('div')
    collection.append(toyCard)
    toyCard.className = 'card';

    const cardH = document.createElement('h2')
    const cardImg = document.createElement('img')
    const cardP = document.createElement('p')
    const cardBtn = document.createElement('button') 
    
    toyCard.append(cardH)
    toyCard.append(cardImg)
    toyCard.append(cardP)
    toyCard.append(cardBtn)
  
    cardH.innerText = toy.name
    cardImg.src = toy.image
    cardImg.className = 'toy-avatar'
    cardP.textContent = toy.likes
    cardBtn.className = 'like-btn'
    cardBtn.id = "[toy_id]"
    cardBtn.innerText = 'like ❤️ '
  })
}

function toyForm() {
  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', e=>{
    e.preventDefault()
    console.log(e)
    
    const newToy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    
    console.log(newToy)
    debugger

    const collection = document.querySelector('#toy-collection');
    const toyCard = document.createElement('div')

    collection.append(toyCard)
    toyCard.className = 'card';
    
    const cardH = document.createElement('h2')
    const cardImg = document.createElement('img')
    const cardP = document.createElement('p')
    const cardBtn = document.createElement('button')
    
    toyCard.append(cardH)
    toyCard.append(cardImg)
    toyCard.append(cardP)
    toyCard.append(cardBtn)
    
    cardH.innerText = newToy.name
    cardImg.src = newToy.image
    cardImg.className = 'toy-avatar'
    cardP.textContent = newToy.likes
    cardBtn.className = 'like-btn'
    cardBtn.id = "[toy_id]"
    cardBtn.innerText = 'like ❤️ '
    
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newToy),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    toyForm.reset()
  })
}
toyForm()
