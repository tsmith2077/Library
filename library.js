let container = document.querySelector('#container');
const addBookButton = document.querySelector('#addBookButton');
const allDeleteBtns = document.querySelectorAll('.deleteBtn');
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0]; // For closing modal

let myLibrary = [];

// Formats book info and adds it to myLibrary array.
function Book(title, author, pages, read) {
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    if (read == true) {
        this.Read = "Read";
    } else if (read == false) {
        this.Read = "Not read";
    } 
    myLibrary.push(this);
    printBookToScreen(this);
};

// Prints book to screen.
function printBookToScreen(book) {

        const div_container = document.createElement('div');
        for (prop in book) {
            div_container.classList.add('div_container');
            div_container.style.cssText = 
            'border: 5px solid #45A29E; background-color: #0B0C10; font-size: large; border-radius: 30px; box-shadow: 10px 5px 5px #66FCF1; display: grid; text-align: left; padding-left: 5vh;';
            
            const p_element = document.createElement('p');
            p_element.classList.add('p_element');
            p_element.textContent = `${prop}: ${book[prop]}`;
            div_container.appendChild(p_element);
            
            container.appendChild(div_container);
        }
        const updateReadBtn = document.createElement('button');
        updateReadBtn.classList.add('updateReadBtn');
        updateReadBtn.onclick = toggleRead;
        updateReadBtn.textContent = "Toggle Read";
        div_container.appendChild(updateReadBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.dataset.number = (myLibrary.length - 1);
        deleteBtn.onclick = deleteBook;
        deleteBtn.textContent = "Delete";
        div_container.appendChild(deleteBtn);
};

// Delete book once delete button is clicked.
function deleteBook() {
    // Removes book from myLibrary array and the dom.
    myLibrary.splice(this.dataset.number, 1);
    this.parentNode.remove();
}

// Toggles Read/Not Read on book.
function toggleRead() {
    // let previous_sibling = this.previousSibling;
    // previous_sibling.setAttribute('class', 'readNotRead');
    // this.previousSibling.setAttribute('id', 'readNotRead');
    if (this.previousSibling.textContent.includes("Not")) {
        document.querySelector("p:last-child").innerHTML = "Read: Read";
    } else {
        document.querySelector("p:last-child").innerHTML = "Read: Not Read";
    }
}

// Submit btn for popup modal. Collects book info.
function returnBookInfo(){
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("readBook").checked;
    this.book = new Book(title, author, pages, read);
    myLibrary.push(this);
    modal.style.display = "none";
    printBookToScreen();
};

// When the user clicks on the button, open the modal
addBookBtn.onclick = function() {
    modal.style.display = "block";
  }
  
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
}
}


// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
// const aliceInWonderland = new Book("Alice in Wonderland", "Lewis Carol", 208, false)
// printBookToScreen();
