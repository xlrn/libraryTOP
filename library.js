import {storageAvailable} from '/localstorage.js' 

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
    let btnCtn = document.createElement('div');
    div.setAttribute('id', book.title);
    div.setAttribute('class', 'book');
    btnCtn.setAttribute('id', `${book.title}Buttons`)
    if (book.read == true) {
        div.style.backgroundColor = "aquamarine";
    } else div.style.backgroundColor = "lightcoral";
    div.textContent = `${book.title}, by ${book.author}`;
    let readButton = createButton("Read", book.title);
    let deleteButton = createButton("Delete", book.title);
    readButton.addEventListener('click', changeColour);
    deleteButton.addEventListener('click', deleteBook);
    btnCtn.appendChild(deleteButton);
    btnCtn.appendChild(readButton);
    div.appendChild(btnCtn);
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
    myLibrary.splice(index, 1);
    this.parentNode.remove();
    setStorage();
}

function changeColour() {
    let readBtn = document.querySelector(`#${this.id}`);
    let parent = this.parentNode.style;
    let title = this.parentNode.id;
    let book = myLibrary.find(element => element.title == title);
    let index = myLibrary.indexOf(book);
    if (book.read == true) {
        book.read = false;
        parent.backgroundColor = "lightcoral";
        readBtn.textContent = 'Read'
    } else {
        book.read = true;
        parent.backgroundColor = "aquamarine";
        readBtn.textContent = 'Unread';
    }
    myLibrary.splice(index, 1, book);
}

function renderLibrary(library) {
    if (library.length != 0) {
        library.forEach(book => {
            renderBook(book);
        })
    }
}

const modal = document.querySelector('#modalForm');
const btn = document.querySelector('#newBook');
const span = document.querySelector('#close');
const del = document.querySelector('#deleteStorage');

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

del.addEventListener('click', function() {
    localStorage.clear();
})

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
    setStorage();
}

function setStorage() {
    let library = JSON.stringify(myLibrary);
    localStorage.setItem('library', library);
}

function getStorage() {
    let loadedLibrary = JSON.parse(localStorage.getItem('library'));
    myLibrary = loadedLibrary;
}

if (storageAvailable('localStorage')) {
    console.log('localStorage available')
} else {
    alert('LocalStorage Unavailable');
}

if (!localStorage.getItem('library')) {
    setStorage();
} else {
    getStorage();
    renderLibrary(myLibrary);
}


