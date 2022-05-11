let books = [
  {
    id: 1,
    title: "hello",
    author: "World!",
    year: 1997,
    description: "template",
  },
];

let UpdateBookId = undefined;

const tbody = document.querySelector("tbody");
const TableTemplate = document.querySelector("#templaterow");

const ClosePopUpBtn = document.querySelector("#close-pop-up-btn");
const CreatePopUpBtn = document.querySelector("#create-pop-up-btn");
const PopUp = document.querySelector(".pop-up");
const CreatePopUp = document.querySelector(".create-pop-up");
const UpdatePopUp = document.querySelector(".update-pop-up");

const CreateBtn = document.querySelector("#create-btn");
const UpdateBtn = document.querySelector("#update-btn");

CreatePopUpBtn.addEventListener("click", () => {
  PopUp.classList.toggle("active");
  CreatePopUp.classList.add("active");
});

const closePopUp = () => {
  PopUp.classList.toggle("active");
  CreatePopUp.classList.remove("active");
  UpdatePopUp.classList.remove("active");
  UpdateBookId = undefined;
  cleanInputs();
};

ClosePopUpBtn.addEventListener("click", () => {
  closePopUp();
});

const findABookWithId = (id) => {
  for (const book of books) {
    if (book.id == id) return book;
  }
  return {};
};

const fillUpdateInputs = (book) => {
  const InputBlock = UpdatePopUp.querySelector(".input-block");
  const inputs = InputBlock.querySelectorAll("input");
  inputs[0].value = book.title;
  inputs[1].value = book.author;
  inputs[2].value = book.year;
  inputs[3].value = book.description;
};

const cleanInputs = () => {
  const inputs = document.querySelectorAll(
    ".create-pop-up input, .update-pop-up input"
  );
  for (const input of inputs) {
    input.value = "";
  }
};

const openUpdatePopUp = (id) => {
  const bookId = id;

  return () => {
    PopUp.classList.toggle("active");
    UpdatePopUp.classList.add("active");
    UpdateBookId = bookId;
    const bookData = findABookWithId(bookId);
    fillUpdateInputs(bookData);
  };
};

const DeleteBook = async (id) => {
  const bookId = id;
  //return async () => {
    result = confirm("Do you want to delete book?");
    if (result) {
      removeBookLineHtml(bookId);
      // here you can write delete request
      try {
        const response = await fetch('service1/delete', {
          method: 'DELETE',
          body: JSON.stringify({id: bookId}),
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        const json = await response.json();
        console.log('Result:', JSON.stringify(json));
      } catch (error) {
        console.error('Error:', error);
      }
      books = books.filter((book) => book.id != bookId);
    }
//  };
};

const removeBookLineHtml = (id) => {
  const trs = tbody.querySelectorAll("tr");
  for (const tr of trs) {
    if (tr.firstElementChild.innerHTML == id) {
      tr.remove();
      return;
    }
  }
};

const addBookLineHtml = (book) => {
  const clone = TableTemplate.content.cloneNode(true);
  const UpdateBtn = document.createElement("button");
  UpdateBtn.textContent = "Update";
  UpdateBtn.addEventListener("click", openUpdatePopUp(book.id));
  const DeleteBtn = document.createElement("button");
  DeleteBtn.textContent = "Del";
  DeleteBtn.addEventListener("click", DeleteBook.bind(null, book.id));
  const td = clone.querySelectorAll("td");
  td[0].textContent = book.id;
  td[1].textContent = book.title;
  td[2].textContent = book.author;
  td[3].textContent = book.year;
  td[4].textContent = book.description;
  td[5].appendChild(DeleteBtn);
  td[5].appendChild(UpdateBtn);

  tbody.appendChild(clone);
};

const createBook = async () => {
  // here you can write create request
  const InputBlock = CreatePopUp.querySelector(".input-block");
  const inputs = InputBlock.querySelectorAll("input");
  const book = {
    id: Math.round(Math.random() * 1000),
    title: inputs[0].value,
    author: inputs[1].value,
    year: inputs[2].value,
    description: inputs[3].value,
  };

  try {
    const response = await fetch('service1/add', {
      method: 'POST',
      body: JSON.stringify(book),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    console.log('Result:', JSON.stringify(json));
  } catch (error) {
    console.error('Error:', error);
  }

  books.push(book);
  addBookLineHtml(book);

  closePopUp();
};

const updateBook = async () => {
  // here you can write update request
  if (UpdateBookId != undefined) {
    const InputBlock = UpdatePopUp.querySelector(".input-block");
    const inputs = InputBlock.querySelectorAll("input");
    const book = {
      id: UpdateBookId,
      title: inputs[0].value,
      author: inputs[1].value,
      year: inputs[2].value,
      description: inputs[3].value,
    };

    try {
      const response = await fetch('service1/update', {
        method: 'PUT',
        body: JSON.stringify(book),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const json = await response.json();
      console.log('Result:', JSON.stringify(json));
    } catch (error) {
      console.error('Error:', error);
    }

    for (let i = 0; i < books.length; i++) {
      if (books[i].id == book.id) {
        books[i] = book;
        break;
      }
    }

    removeBookLineHtml(book.id);
    addBookLineHtml(book);
  }

  closePopUp();
};

CreateBtn.addEventListener("click", createBook);
UpdateBtn.addEventListener("click", updateBook);

window.onload = async () => {
  try {
    const res = await fetch('service1');
    books = await res.json();
  } catch (e) {
    alert(e.message);
  }

  for (const book of books) {
    addBookLineHtml(book);
  }
};
