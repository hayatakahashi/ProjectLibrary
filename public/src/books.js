function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id ===id)
}


function partitionBooksByBorrowedStatus(books) {
  const checkedOutBooks = []
  const returnedBooks = []

  books.forEach(book => {
    if (book.borrows[0].returned) {
      returnedBooks.push(book)
    } else {
      checkedOutBooks.push(book)
    }
  })
  return [checkedOutBooks, returnedBooks]
}

/*function partitionBooksByBorrowedStatus(books) {
  const checkedOutBooks = [];
  const returnedBooks = [];

  books.forEach(book => {
    if (book.borrows[0].returned) {
      returnedBooks.push(book);
    } else {
      checkedOutBooks.push(book);
    }
  });

  return [checkedOutBooks, returnedBooks];
} */


// This function wants me to return an array with TWO arrays inside it.
// All of the books that come inside here are in either ONE of these TWO arrays.
// The first array contains book objects that is CURRENTLY CHECKED OUT
// The second one contains book objects of ones that are RETURNED

/*The `partitionBooksByBorrowedStatus()` function in `public/src/books.js` has a single parameter:

- An array of book objects.

It returns an array with two arrays inside of it. All of the inputted books are present in either the first or second array.

The first array contains book objects that represent the books _that are currently checked out_, while the second array contains book objects that represent the books _that have been returned._ You can check for the return status by looking at the first transaction object in the `borrows` array.

**Example:**

```javascript
partitionBooksByBorrowedStatus(books);
/*
  [
    [
      {
        id: "5f447132d487bd81da01e25e",
        title: "sit eiusmod occaecat eu magna",
        genre: "Science",
        authorId: 8,
        borrows: [
          {
            id: "5f446f2e2cfa3e1d234679b9",
            returned: false,
          },
          ...
        ]
      },
      ...
    ],
    [
      {
        id: "5f44713265e5d8d17789beb0",
        title: "tempor occaecat fugiat",
        genre: "Travel",
        authorId: 16,
        borrows: [
          {
            id: "5f446f2e4eff1030e7316861",
            returned: true,
          },
          ...
        ]
      },
      ...
    ]
  ]
*/




function getBorrowersForBook(book, accounts) {
  const borrowers = [];

  for (let transaction of book.borrows) {
    if (borrowers.length >= 10) {
      break;
    }

    const account = accounts.find((account) => account.id === transaction.id);

    if (account) {
      account.returned = transaction.returned;
      borrowers.push(account);
    }
  }

  return borrowers;
}



/*#### getBorrowersForBook()

The `getBorrowersForBook()` function in `public/src/books.js` has two parameters, in the following order:

- A book object.
- An array of all account objects.

It should return an array of ten or fewer account objects that represents the accounts given by the IDs in the provided book's `borrows` array. However, each account object should include the `returned` entry from the corresponding transaction object in the `borrows` array.

**Example:**

```javascript
getBorrowersForBook(book, accounts);
/*
  [
    {
      id: "5f446f2e4eff1030e7316861",
      returned: true,
      picture: "https://api.adorable.io/avatars/75/barber.waters@kegular.biz",
      age: 37,
      name: {
        first: "Barber",
        last: "Waters",
      },
      company: "KEGULAR",
      email: "barber.waters@kegular.biz",
      registered: "Tuesday, April 14, 2020 9:15 PM",
    },
    {
      id: "5f446f2ecc5c4787c403f844",
      returned: true,
      picture: "https://api.adorable.io/avatars/75/dyer.trevino@slax.io",
      age: 34,
      name: {
        first: "Dyer",
        last: "Trevino",
      },
      company: "SLAX",
      email: "dyer.trevino@slax.io",
      registered: "Saturday, August 1, 2015 8:13 PM",
    },
  ]
*/

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
