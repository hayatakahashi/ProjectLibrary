function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  return books.reduce((count, book) => {
    return count + (book.borrows[0].returned ? 0 : 1)
  }, 0)
}




function getMostCommonGenres(books) {
  // Step 1: Count the occurrences of each genre in the input array
  const genreCount = {};
  for (let i = 0; i < books.length; i++) {
    const genre = books[i].genre;
    if (genreCount[genre]) {
      genreCount[genre]++;
    } else {
      genreCount[genre] = 1;
    }
  }

  // Step 2: Convert the genreCount object into an array of objects with 'name' and 'count' keys
  const genreArray = Object.entries(genreCount).map(([name, count]) => ({ name, count }));

  // Step 3: Sort the genreArray by count, in descending order
  genreArray.sort(function(a, b) {
    return b.count - a.count;
  });

  // Step 4: Return the top 5 genres or all genres if there are fewer than 5
  return genreArray.slice(0, 5);
}




function getMostPopularBooks(books) {
  // Sort the books array by the borrow count in descending order
  const sortedBooks = books.sort((a, b) => b.borrows.length - a.borrows.length);

  // Map the sortedBooks array to an array of objects with 'name' and 'count' keys
  const result = sortedBooks.map(book => ({ name: book.title, count: book.borrows.length }));

  // Return the first five elements (or fewer) of the result array
  return result.slice(0, 5);
}


function getMostPopularAuthors(books, authors) {
  const authorPopularity = authors.map(author => {
    const authorBooks = books.filter(book => book.authorId === author.id);
    const borrowCount = authorBooks.reduce((acc, book) => acc + book.borrows.length, 0);
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: borrowCount
    };
  });

  const sortedAuthors = authorPopularity.sort((a, b) => b.count - a.count);
  return sortedAuthors.slice(0, 5);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
