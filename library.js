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
    if (book.read == true) {
        div.style.backgroundColor = "aquamarine";
    } else div.style.backgroundColor = "lightcoral";
    div.textContent = `${book.title}, by ${book.author}`;
    let readButton = createButton("Read", book.title);
    let deleteButton = createButton("Delete", book.title);
    readButton.addEventListener('click', changeColour);
    deleteButton.addEventListener('click', deleteBook);
    div.appendChild(readButton);
    div.appendChild(deleteButton);
    container.appendChild(div);
}

function createButton(className, title) {
    let button = document.createElement('button');
    let titleNoSpace = title.replace(/\s+/g, '');
    let classNoCaps = className.toLowerCase();
    button.setAttribute('id', classNoCaps+titleNoSpace);
    button.setAttribute('class', classNoCaps+'Button');
    button.textContent = className;
    return button;
}

function deleteBook() {
    let title = this.parentNode.id;
    let book = myLibrary.find(element => element.title == title);
    let index = myLibrary.indexOf(book);
    myLibrary.splice(index, 0);
    this.parentNode.remove();
}

function changeColour() {
    let parent = this.parentNode.style;
    if (parent.backgroundColor == "aquamarine") {
        parent.backgroundColor = "lightcoral"
    } else parent.backgroundColor = "aquamarine";
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
    if (read.checked) {
        readBool = true;
    } else readBool = false;
    let newBook = new Book(title.value, author.value, pageValue, readBool);
    addBookToLibrary(newBook, myLibrary);
    renderBook(newBook);
    modal.style.display = "none";
}

addBookToLibrary(sampleBook, myLibrary);
renderLibrary(myLibrary);


