const container = document.querySelector('#container');
const addBookButton = document.querySelector('#addBookButton');

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    myLibrary.push(this)
};

function printBookToScreen() {
    myLibrary.forEach(book => {
        const div_container = document.createElement('div');
        for (let prop in book) {
            div_container.classList.add('div_container');
            div_container.style.cssText = 'border: solid black';
            
            const p_element = document.createElement('p');
            p_element.classList.add('p_element');
            p_element.textContent = `${prop}: ${book[prop]}`;
            div_container.appendChild(p_element);
            
            container.appendChild(div_container);
        }
    });
}

// addBookButton.addEventListener('click', ()=> {

// })


const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "read");
const aliceInWonderland = new Book("Alice in Wonderland", "Lewis Carol", 208, "not read")

console.log(myLibrary);
printBookToScreen();