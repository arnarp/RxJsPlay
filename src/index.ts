// Index.js
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}


// Accept hot module reloading
if (module.hot) {
  module.hot.accept()
}

require('./index.css') // The page is now styled
//import Please from 'pleasejs'
import Please = require('pleasejs');
const div = document.getElementById('color')
const button = document.getElementById('button')
const body = document.getElementsByTagName('body')[0]
const h1 = document.getElementsByTagName('h1')[0]

const changeColor = () => {
  div.style.backgroundColor = Please.make_color()
  body.style.backgroundColor = Please.make_color()
  h1.style.color = Please.make_color()
}

button.addEventListener('click', changeColor)
