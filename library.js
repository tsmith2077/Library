let container = document.querySelector("#container");
const addBookButton = document.querySelector("#addBookButton");
const allDeleteBtns = document.querySelectorAll(".deleteBtn");
const submitBtn = document.querySelector(".submitBtn");
var modal = document.getElementById("myModal");
var closeBtn = document.getElementsByClassName("close")[0]; // For closing modal

let myLibrary = [];

// Formats book info and adds it to myLibrary array.
class Book {
  constructor(title, author, pages, read) {
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.Read = read;
    myLibrary.push(this);
    printBookToScreen(this);
  }
}

// Prints book to screen.
function printBookToScreen(book) {
  let readBtnText;

  const div_container = document.createElement("div");
  for (prop in book) {
    if (prop != "Read") {
      div_container.classList.add("div_container");
      div_container.style.cssText =
        "border: 5px solid #45A29E; background-color: #0B0C10; font-size: large; border-radius: 30px; box-shadow: 10px 5px 5px #66FCF1; display: grid; text-align: left; padding-left: 5vh;";

      const p_element = document.createElement("p");
      p_element.classList.add("p_element");
      p_element.textContent = `${prop}: ${book[prop]}`;
      div_container.appendChild(p_element);

      container.appendChild(div_container);
    } else {
      if (book[prop] == true) {
        readBtnText = "Read";
      } else if (book[prop] == false) {
        readBtnText = "Not read";
      }
    }
  }
  const updateReadBtn = document.createElement("button");
  updateReadBtn.classList.add("updateReadBtn");
  updateReadBtn.onclick = toggleRead;
  updateReadBtn.textContent = readBtnText;
  div_container.appendChild(updateReadBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.dataset.number = myLibrary.length - 1;
  deleteBtn.onclick = deleteBook;
  deleteBtn.textContent = "Delete";
  div_container.appendChild(deleteBtn);
}

// Delete book once delete button is clicked.
function deleteBook() {
  // Removes book from myLibrary array and the dom.
  myLibrary.splice(this.dataset.number, 1);
  this.parentNode.remove();
}

// Toggles Read/Not Read on book.
function toggleRead() {
  if (this.textContent.includes("Not")) {
    this.textContent = "Read";
  } else {
    this.textContent = "Not Read";
  }
}

// When the user clicks on the button, open the modal
addBookBtn.addEventListener("click", function () {
  removeErrorSuccessClass();
  modal.style.display = "block";
  title.value = "";
  author.value = "";
  pages.value = "";
});

// Form Validation
let title = document.getElementById("title");
let author = document.getElementById("author");
let pages = document.getElementById("pages");

function checkInputs() {
  if (title.value == "") {
    showErrorFor(title, "Title cannot be blank");
  } else {
    showSuccessFor(title);
  }
  if (author.value == "") {
    showErrorFor(author, "Author cannot be blank");
  } else if (!isLetter.test(author.value)) {
    showErrorFor(author, "Author must contain A-Z");
  } else {
    showSuccessFor(author);
  }
  if (pages.value == "") {
    showErrorFor(pages, "Pages cannot be blank");
  } else if (!isNumber.test(pages.value)) {
    showErrorFor(pages, "Pages must be a number");
  } else {
    showSuccessFor(pages);
  }
}

function showErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  input.className = "error";
}

function showSuccessFor(input) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  input.className = "success";
  // input.className.remove('error');
  small.innerText = "";
}

// Submit btn for popup modal. Collects book info.
function returnBookInfo() {
  checkInputs();
  if (checkForErrors() == true) {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("readBook").checked;
    this.book = new Book(title, author, pages, read);
    myLibrary.push(this);

    modal.style.display = "none";
    printBookToScreen();
  }
}

// Remove error and success class after submission
function removeErrorSuccessClass() {
  let allInputs = document.querySelectorAll("input");
  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].classList.remove("success", "error");
  }
}

function checkForErrors() {
  let allInputs = document.querySelectorAll("input");
  for (let i = 0; i < allInputs.length; i++) {
    if (allInputs[i].classList.contains("error")) {
      return false;
    } else {
      return true;
    }
  }
}

closeBtn.addEventListener("click", () => {
  removeErrorSuccessClass();
  modal.style.display = "none";
});

submitBtn.addEventListener("click", () => {
  returnBookInfo();
});

const isLetter = /^[a-zA-Z]+$/;
const isNumber = /^[0-9]+$/;
