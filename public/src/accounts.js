function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
    return accounts.sort((accountA, accountB) => {
      const LastNameA = accountA.name.last
      const LastNameB = accountB.name.last

      if (LastNameA < LastNameB) {
        return -1;
      }
      if (LastNameA > LastNameB) {
        return 1;
      }
      return 0;
    })
}


function getTotalNumberOfBorrows(account, books) {
    return books.reduce((acc, book) => {
      return acc + book.borrows.filter((borrow) => {
          return borrow.id === account.id
      }).length;
    }, 0);
}


/*#### getTotalNumberOfBorrows()

The `getTotalNumberOfBorrows()` function in `public/src/accounts.js` has two parameters, in the following order:

- An account object.
- An array of all book objects.

It returns a _number_ that represents the number of times the account's ID appears in any book's `borrows` array.

**Example:**

```javascript
getTotalNumberOfBorrows(account, books); // 22
*/

function addAuthorHelper(authors, books) {
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < authors.length; j++) {
      if (books[i].authorId === authors[j].id) {
        books[i].author = authors[j]
      }
    }
  }
  return books
}

function getBooksPossessedByAccount(account, books, authors) {
  let result = books.reduce((acc, book) => {
    for (let i = 0; i < book.borrows.length; i++) {
      if (book.borrows[i].id === account.id && book.borrows[i].returned === false) {
        acc.push(book)
      }
    }
    return acc
  }, [])
  let answer = addAuthorHelper(authors, result)
  return answer
}


/* #### getBooksPossessedByAccount()

The `getBooksPossessedByAccount` function in `public/src/accounts.js` has three parameters, in the following order:

- An account object.
- An array of all book objects.
- An array of all author objects.

It returns an array of book objects, including author information, that represents all books _currently checked out_ by the given account. _Look carefully at the object below,_ as it's not just the book object; the author object is nested inside of it.

**Example:**

```javascript
getBooksPossessedByAccount(account, books, authors);
/*
  [
    {
      id: "5f447132320b4bc16f950076",
      title: "est voluptate nisi",
      genre: "Classics",
      authorId: 12,
      author: {
        id: 12,
        name: {
          first: "Chrystal",
          last: "Lester",
        },
      },
      borrows: [
        {
          id: "5f446f2e6059326d9feb9a68",
          returned: false,
        },
        ...
      ],
    },
  ]
*/

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
