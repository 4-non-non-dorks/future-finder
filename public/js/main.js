const searchForm = document.querySelector('#search-form');
const searchBtn = document.querySelector('#search-btn');
const submitBtn = document.querySelector('#submit-btn');
const searchInput = document.querySelector('#search-input');
// const bookMarkEl = document.querySelector('#bookmark');

const newSearchHandler = async (event) => {
  event.preventDefault();
  const jobSearch = searchInput.value.trim();
  console.log(jobSearch);

  if (jobSearch) {
    document.location.replace(`/jobs/search?job=${jobSearch}`);
  }
};

// let bookmarksArray = JSON.parse(localStorage.getItem('bookmarks')) || [];

// let saveBookmark = async () => {
//   bookMarkEl.classList.toggle('text-amber-500');

//   let jobID = window.location.href.split('/')[4];

//   let bookmarksObject = {
//     id: jobID,
//   };
//   // Checks if the bookmark ID is already in local storage
//   function isBookmarkDuplicate(bookmark) {
//     for (let i = 0; i < bookmarksArray.length; i++) {
//       if (bookmarksArray[i].id === bookmark.id) {
//         return true;
//       }
//     }
//     return false;
//   }
//   // Removes the bookmark if the ID is the same
//   function removeBookmark(bookmark) {
//     for (let i = 0; i < bookmarksArray.length; i++) {
//       if (bookmarksArray[i].id === bookmark.id) {
//         let index = bookmarksArray.indexOf(bookmarksArray[i]);
//         bookmarksArray.splice(index, 1);
//         localStorage.setItem('bookmarks', JSON.stringify(bookmarksArray));
//       }
//     }
//   }
//   // Checks if the bookmark is a duplicate, if so, it will remove the bookmark, else it will add it to local storage
//   if (isBookmarkDuplicate(bookmarksObject)) {
//     removeBookmark(bookmarksObject);
//   } else {
//     bookmarksArray.push(bookmarksObject);
//     localStorage.setItem('bookmarks', JSON.stringify(bookmarksArray));
//   }
// };

searchForm.addEventListener('submit', newSearchHandler);
// bookMarkEl.addEventListener('click', saveBookmark);
