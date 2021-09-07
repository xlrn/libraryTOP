let myLibrary = [];
const container = document.querySelector('#container');

let sampleBook = new Book("Harty Potter", "JK Rowling", 332, true);

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book, library) {
    library.push(book);
}

function renderLibrary(library) {
    console.log('called renderLibrary');
    library.forEach(book => {
        let div = document.createElement('div');
        div.setAttribute('id', book.title);
        div.setAttribute('class', 'book');
        div.textContent = `${book.title}, by ${book.author}`;
        container.appendChild(div);
    })
}

addBookToLibrary(sampleBook, myLibrary);
renderLibrary(myLibrary);


