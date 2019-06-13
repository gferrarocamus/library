let myLibrary = [
  {
    title: "First Book",
    author: "First Author",
    pages: 1000,
    read: true
  },  
  {
    title: "Second Book",
    author: "Second Author",
    pages: 1400,
    read: false
  }
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const form = document.querySelector("form"); 
  const book = new Book(form.title.value, form.author.value, form.pages.value, form.read.value);
  myLibrary.push(book);
}

function render() {
  myLibrary.forEach((book) => {
    const card = document.createElement("div"), 
    header = document.createElement("header"), 
    title = document.createElement("p"), 
    author = document.createElement("p"), 
    pages = document.createElement("p"), 
    read = document.createElement("button"), 
    remove = document.createElement("div"),
    body = document.getElementsByTagName("body")[0]; 

    card.setAttribute("class", "card");
    header.setAttribute("class", "header");
    read.setAttribute("class", "read");
    remove.setAttribute("class", "remove");
    
    header.textContent = book.title;
    title.textContent = "Title: \"" + book.title + "\"";
    author.textContent = "Author: " + book.author;
    pages.textContent = "No. of pages: " + book.pages;
    read.textContent = (book.read ? "Read" : "Not read yet");
    remove.innerHTML = "×"; 

    card.appendChild(header);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(remove);
    
    body.appendChild(card);
  });
}

render();

var modal = document.getElementById("myModal");
var btn = document.getElementById("modalBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}