let addToy = false;
let divCollect = document.querySelector('#toy-collection')

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

function getToys() {
  return fetch('http://localhost:3000/toys')
  .then(response => response.json())
}

function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = 'like'
  btn.addEventListener('click', (e) => {
    addLikes(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)
}

function addLikes(e) {
  e.preventDefault()
  let moreLikes = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'likes': moreLikes
    })
  })
  .then(response => response.json())
  .then(like_obj => {
    e.target.previousElementSibling.innerText = `${moreLikes} likes`;
  })

}

function postToys (toy_data){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'name': toy_data.name.value,
      'image': toy_data.image.value,
      'likes': 0
    })
  })
  .then(response => response.json())
  .then((obj_toy) => {
    renderToys(obj_toy)
  })
}

getToys().then(toys => {
  toys.forEach(toy => {
    renderToys(toy)
  })
})