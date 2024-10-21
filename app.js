const title = document.querySelector('#title')
const author = document.querySelector('#author')
const isbn = document.querySelector('#isbn')
const form = document.querySelector('#form')
const msg = document.querySelector('.msg')
const bookTable = document.querySelector('#Books')
const submit = document.querySelector('#submit')
const books = []

class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

function sendMessage(message, type) {
    const del = document.querySelectorAll('#delete')
    msg.classList.add(type);
    msg.innerHTML = `<p>${message}</p>`;
    title.disabled = true; author.disabled = true; isbn.disabled = true; submit.disabled = true;
    del.forEach((d) => d.disabled = true)
    setTimeout(() => {
        msg.innerHTML = '';
        msg.classList.remove(type)
        title.disabled = false; author.disabled = false; isbn.disabled = false; submit.disabled = false;
        del.forEach((d) => d.disabled = false)
    }, 2000);
}

function onDelete() {
    del = document.querySelectorAll('#delete')
    del.forEach((d) => {
        d.addEventListener('click', (e) => {
            e.preventDefault();
            bookRows = document.querySelectorAll('.book');
            for (let i = 0; row = bookRows[i]; i++) {
                if (d.parentNode.parentNode === row) {
                    books.splice(i, 1);
                    localStorage.clear();
                    for (let book of books) {
                        b = new Book(book.title, book.author, book.isbn);
                        localStorage.setItem(`${localStorage.length + 1}`, JSON.stringify(b));
                    }
                    d.parentNode.parentNode.remove()
                }
            }
            sendMessage('Book successfully removed', 'info');
        })
    })
}

function addRow(book) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><input id='delete' class='btn' type='button' value='Remove'></td>
    `
    tr.classList.add('book');
    bookTable.appendChild(tr);
    books.push({'title': book.title, 'author': book.author, 'isbn': book.isbn})
    onDelete()
}

function onSubmit(e) {
    e.preventDefault()
    if(title.value === '' || author.value === '' || isbn.value === '') {
        sendMessage('Please enter all fields', 'error');
    }
    else {
        b = new Book(title.value, author.value, isbn.value)
        title.value = '';
        author.value = '';
        isbn.value = '';

        addRow(b)
        sendMessage('Book successfully added', 'info');
        localStorage.setItem(`${localStorage.length + 1}`, JSON.stringify(b))
        onDelete()
    }
}

// books = []
// localStorage.clear()
const keys = Object.keys(localStorage).reverse();
for (const key of keys) {
    addRow(JSON.parse(localStorage.getItem(key)))
}

form.addEventListener('submit', onSubmit);
