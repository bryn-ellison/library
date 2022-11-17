const container = document.querySelector("#container");
const buttonContainer = document.querySelector("#button-container");
const formContainer = document.querySelector("#form-container");

let myLibrary = [];

// constructor for book objects

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages`;
  };
  this.index = myLibrary.length;
}

// fucntion to initialise constructor then push new object to myLibrary

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

addBookToLibrary("Klara and the Sun", "Kazuo Ishiguro", 397, "not read yet");
addBookToLibrary("Trainspotting", "Irvine Welsh", 243, "read");
addBookToLibrary("Oxford Dictionary", "Dave Dictionary", 1302, "read");

// function to clear books before generating updates booklist

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// delete book function

function deleteBook(index) {
  myLibrary.splice(index, 1);
  myLibrary.forEach((element) => {
    element.index -= 1;
  });
  displayBooks();
}

// toggle read status function

function toggleRead(index, status) {
  if (status == "read") {
    myLibrary[index].read = "not read yet";
    displayBooks();
  } else if (status == "not read yet") {
    myLibrary[index].read = "read";
    displayBooks();
  }
}

//create book list from myLibrary array

function displayBooks() {
  removeAllChildNodes(container);
  myLibrary.forEach((element) => {
    const book = document.createElement("div");
    book.classList.add("book-div");
    book.textContent = element.info();
    const readBtn = document.createElement("button");
    readBtn.id = "read-btn";
    readBtn.textContent = element.read;
    if (element.read == "read") {
      readBtn.classList = "read";
    } else {
      readBtn.classList = "unread";
    }
    readBtn.addEventListener("click", () => {
      toggleRead(element.index, element.read);
    });
    book.appendChild(readBtn);
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete book";
    delBtn.addEventListener("click", () => {
      deleteBook(element.index);
    });
    book.appendChild(delBtn);
    container.appendChild(book);
  });
}

displayBooks();

//create new book form

function createForm() {
  document.getElementById("new-button").style.display = "none";
  const form = document.createElement("form");
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title:";
  form.appendChild(titleLabel);
  const titleField = document.createElement("input");
  form.appendChild(titleField);
  const authorLabel = document.createElement("label");
  authorLabel.textContent = "Author:";
  form.appendChild(authorLabel);
  const authorField = document.createElement("input");
  form.appendChild(authorField);
  const pagesLabel = document.createElement("label");
  pagesLabel.textContent = "No of pages:";
  form.appendChild(pagesLabel);
  const pagesField = document.createElement("input");
  form.appendChild(pagesField);
  const checkLabel = document.createElement("label");
  checkLabel.textContent = "Read?";
  form.appendChild(checkLabel);
  const readField = document.createElement("select");
  const option1 = new Option();
  option1.value = "not read yet";
  option1.text = "not read yet";
  readField.options.add(option1);
  const option2 = new Option();
  option2.value = "read";
  option2.text = "read";
  readField.options.add(option2);
  form.appendChild(readField);
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "SUBMIT";
  form.appendChild(submitBtn);
  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary(
      titleField.value,
      authorField.value,
      pagesField.value,
      readField.value
    );
    formContainer.removeChild(form);
    document.getElementById("new-button").style.display = "block";
  });
  formContainer.appendChild(form);
}

// create new book button

const button = document.createElement("button");
button.textContent = "NEW BOOK";
button.id = "new-button";
button.addEventListener("click", () => {
  createForm();
});
buttonContainer.appendChild(button);
