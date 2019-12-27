let myHeading = document.querySelector('h1')
myHeading.textContent = 'Hello world!';

let image_ = document.querySelector('img');

image_.onclick = function () {
  let src = image_.getAttribute('src');
  if(src === '/original_tutorial/images/book.jpg'){
    image_.setAttribute('src','/original_tutorial/images/book2.jpg');
  } else{
    image_.setAttribute('src','/original_tutorial/images/book.jpg')
  }
}

let myButton = document.querySelector('button');
myHeading = document.querySelector('h1');
name = ""

function setUserName(){
  let myname = prompt('Please enter your name.');
  // localStorage.setItem('name', myname);
  name = myname
  if(!myname){
    setUserName();
  } else{
    // let storeName = localStorage.getItem('name');
    myHeading.textContent = 'Javascript is cool, '+ myname
  }
  
}

if(!name){
  setUserName();
} else{
  // let storeName = localStorage.getItem('name');
  myHeading.textContent = 'Javascript is cool, '+ name
}

myButton.onclick = function () {
  setUserName()
}
