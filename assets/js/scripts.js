let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggle = function() {
  this.read ? (this.read = false) : (this.read = true);
};

if (localStorage.getItem("book-collection") === null) {
  const book1 = new Book("First Book", "First Author", 1000, true);
  const book2 = new Book("Second Book", "Second Author", 344, false);
  myLibrary.push(book1);
  myLibrary.push(book2);

  localStorage.setItem("book-collection", JSON.stringify(myLibrary));
} else {
  myLibrary = JSON.parse(localStorage.getItem("book-collection"));
}

const modal = document.getElementById("myModal");
const btn = document.getElementById("modalBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
};

span.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function addBookToLibrary(event) {
  event.preventDefault();
  const form = document.querySelector("form");
  const book = new Book(
    form.title.value,
    form.author.value,
    form.pages.value,
    form.read.value
  );

  myLibrary.push(book);
  localStorage.setItem("book-collection", JSON.stringify(myLibrary));

  modal.style.display = "none";

  //clean form
  const formFields = document.querySelectorAll("form input");
  [...formFields].forEach(field => {
    if (field.getAttribute("type") !== "radio") field.value = "";
  });

  render();
}

const addBook = document.getElementById("addBook");
addBook.addEventListener("click", addBookToLibrary, false);

function removeBookFromLibrary(event) {
  const cardIndex = event.target.parentNode.getAttribute("data-index");
  myLibrary = myLibrary.filter((el, i) => i !== +cardIndex);
  localStorage.setItem("book-collection", JSON.stringify(myLibrary));
  render();
}

function render() {
  const container = document.getElementsByClassName("container")[0];
  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }
  myLibrary.forEach((book, index) => {
    book.__proto__ = Object.create(new Book);
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
    title.textContent = 'Title: "' + book.title + '"';
    author.textContent = "Author: " + book.author;
    pages.textContent = "No. of pages: " + book.pages;
    read.textContent = book.read ? "Read" : "Not read yet";
    read.onclick = () => {
      book.toggle();
      localStorage.setItem("book-collection", JSON.stringify(myLibrary));
      render();
    };
    remove.innerHTML = "×";
    remove.addEventListener("click", removeBookFromLibrary, false);

    card.appendChild(header);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(remove);
    card.setAttribute("data-index", index);
    container.appendChild(card);
  });
}

render();
