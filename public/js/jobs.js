const bookMarkEl = document.querySelector('#bookmark');

function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
  let nameEQ = name + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// function checkBookmark() {
//   let x = getCookie('ppkcookie');
//   console.log('x', x);
//   console.log(x.split(','));

//   let bookmarks = x.split(',');

//   if (bookmarks.indexOf('1') > -1) {
//     alert('bookmark works');
//   }
// }

let saveBookmark = async () => {
  bookMarkEl.classList.toggle('text-amber-500');
  let bookmarks = [];
  let x = getCookie('ppkcookie');

  if (x !== null) {
    bookmarks.push(x.split(','));
  }
  console.log(bookmarks);
  //   // Checks if the bookmark ID is already in cookie
  function isBookmarkDuplicate(bookmark) {
    for (let i = 0; i < bookmarks.length; i++) {
      console.log(bookmarks[i]);
      if (
        bookmarks[i] ===
        document.querySelector('#job-title').getAttribute('data-id')
      ) {
        return true;
      }
    }
    return false;
  }
  console.log(isBookmarkDuplicate());

  //   // Removes the bookmark if the ID is the same
  function removeBookmark(bookmark) {
    for (let i = 0; i < bookmarks.length; i++) {
      if (
        bookmarks[i] ===
        document.querySelector('#job-title').getAttribute('data-id')
      ) {
        let index = bookmarks.indexOf(bookmarks[i]);
        bookmarks.splice(index, 1);
      }
    }
  }
  //   // Checks if the bookmark is a duplicate, if so, it will remove the bookmark, else it will add it to local storage
  if (
    isBookmarkDuplicate(
      document.querySelector('#job-title').getAttribute('data-id')
    )
  ) {
    removeBookmark(
      document.querySelector('#job-title').getAttribute('data-id')
    );
  } else {
    bookmarks.push(
      document.querySelector('#job-title').getAttribute('data-id')
    );
    setCookie('ppkcookie', bookmarks, 7);
  }
};

// checkBookmark();
bookMarkEl.addEventListener('click', saveBookmark);
