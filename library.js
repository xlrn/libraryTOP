let myLibrary = [];
const container = document.querySelector('#container');

let sampleBook = new Book("Harry Potter", "JK Rowling", 332, true);

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book, library) {
    library.push(book);
}

function renderBook(book) {
    let div = document.createElement('div');
    div.setAttribute('id', book.title);
    div.setAttribute('class', 'book');
    div.textContent = `${book.title}, by ${book.author}`;
    container.appendChild(div);
}

function renderLibrary(library) {
    library.forEach(book => {
        renderBook(book);
    })
}

const modal = document.querySelector('#modalForm');
const btn = document.querySelector('#newBook');
const span = document.querySelector('#close');

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

const submit = document.querySelector('#submit');
submit.addEventListener("click", handleSubmit);

function handleSubmit() {
    const title = document.querySelector('#titleInput');
    const author = document.querySelector('#authorInput');
    const pages = document.querySelector('#pagesInput');
    const read = document.querySelector('#readInput');
    let readBool = false;
    let pageValue = parseInt(pages.value);
    if (read.value == "on") {
        readBool = true;
    }
    let newBook = new Book(title.value, author.value, pageValue, readBool);
    addBookToLibrary(newBook, myLibrary);
    renderBook(newBook);
    modal.style.display = "none";
}

addBookToLibrary(sampleBook, myLibrary);
renderLibrary(myLibrary);


