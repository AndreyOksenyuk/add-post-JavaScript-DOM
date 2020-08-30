const App = document.getElementById('App')
//Style App
App.style.maxWidth = '900px'
App.style.margin = '0 auto'
App.style.padding = '10px'

const divWrapperPost = document.createElement('div')
divWrapperPost.setAttribute('class', 'divWrapperPost')

//Create Form for add post
const form = document.createElement('form')
form.style.display = 'flex'
form.style.flexDirection = 'column'

form.append(createInput('Введите заголовок', 'text', 'input_title'))//Input title
form.append(createTextarea())//Input body
form.append(createBtn('Add post', 'click', (e) => {
   e.preventDefault()
   const wrapperPost = document.querySelector('.divWrapperPost')
   const inputTitle = document.getElementsByClassName('input_title')
   const inputBody = document.getElementsByClassName('inputAddPost')
   
   const valueTitle = inputTitle[0].value
   const valueBody = inputBody[0].value

   if (valueBody && valueTitle) {
      wrapperPost.prepend(createPost(valueTitle, valueBody))
      inputTitle[0].value = ''
      inputBody[0].value = ''
   }

}, 'btn_add-post'))// Add posts btn


//Add element in App
App.prepend(form)
App.append(divWrapperPost)


// css style button "add posts"
const btn_add_post = document.getElementsByClassName('btn_add-post')[0]
btn_add_post.style.width = '150px'
btn_add_post.style.margin = '15px 0 20px 0'
btn_add_post.style.backgroundColor = 'rgba(0, 255, 0, 0.3)'

//get posts from API 'https://jsonplaceholder.typicode.com/posts'
function showPost() {
   new Promise((resolve, reject) => {
      fetch('https://jsonplaceholder.typicode.com/posts')
         .then(response => response.json())
         .then(json => resolve(json))
         .catch(error => console.error(error))
   }).then(data => {
      return data.filter(e => e.id <= 4)
   }).then(element => {

      element.forEach(el => {
         const wrapperPost = document.querySelector('.divWrapperPost')
         wrapperPost.append(createPost(el.title, el.body))
      });
   })
}
showPost()



//functions element creators

function createTextarea() {
   const textarea = document.createElement('textarea')
   textarea.setAttribute('placeholder', 'Введите ваше сообщение')
   textarea.setAttribute('class', 'inputAddPost')
   textarea.style.padding = '5px'
   textarea.style.maxWidth = '100%'

   return textarea
}

function createInput(placeholderText, type = 'input', className = 'input') {
   const input = document.createElement('input')
   input.setAttribute('type', type)
   input.setAttribute('class', className)
   input.style.padding = '0 5px'
   input.style.margin = '5px 0'
   input.style.height = '30px'

   if (placeholderText){
      input.setAttribute('placeholder', placeholderText)
   }

   return input
}

//creates a button that takes the text of the button event and function
function createBtn(text, event, fun, className = 'btn') {
   const button = document.createElement('button')
   button.innerHTML = text
   button.style.cursor = 'pointer'
   button.setAttribute('class', className)
   button.addEventListener(event, fun)

   return button
}

function createPost(title, body) {
   const divContent = document.createElement('div')
   const h4 = document.createElement('h4')
   const p = document.createElement('p')

   h4.style.margin = '0'
   divContent.style.border = '1px solid #ccc'
   divContent.style.margin = '10px 0'
   divContent.style.padding = '10px'
   h4.innerHTML = title
   p.innerHTML = body
   divContent.append(h4, p, createBtn("Delete", 'click', e => e.target.parentElement.remove()))

   return divContent
}