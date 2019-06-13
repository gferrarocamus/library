let myLibrary = [];
const book1 = new Book("First Book", "First Author", 1000, true); 
const book2 = new Book("Second Book", "Second Author", 344, false); 
myLibrary.push(book1);
myLibrary.push(book2);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const modal = document.getElementById("myModal");
const btn = document.getElementById("modalBtn");
const span = document.getElementsByClassName("close")[0];

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

function addBookToLibrary(event) {
  event.preventDefault();
  const form = document.querySelector("form"); 
  const book = new Book(form.title.value, form.author.value, form.pages.value, form.read.value);
  myLibrary.push(book);
  console.log(book);
  console.log(myLibrary);
  modal.style.display = "none"; 
  render();
}

const addBook = document.getElementById("addBook");
//addBook.onclick = addBookToLibrary();

addBook.addEventListener("click", addBookToLibrary, false); 

function render() {
  const container = document.getElementsByClassName("container")[0];
  while (container.hasChildNodes()) { container.removeChild(container.firstChild); } 
  myLibrary.forEach((book) => {
    const card = document.createElement("div"), 
    header = document.createElement("header"), 
    title = document.createElement("p"), 
    author = document.createElement("p"), 
    pages = document.createElement("p"), 
    read = document.createElement("button"), 
    remove = document.createElement("div");

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
    
    container.appendChild(card);
  });
}

render();