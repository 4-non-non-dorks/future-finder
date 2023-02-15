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

let saveBookmark = async () => {
  bookMarkEl.classList.toggle('text-amber-500');
  let bookmarks = [];
  let x = getCookie('ppkcookie') || '';
  if (x !== '') {
    bookmarks = x.split(',');
  }

  let selectedBookmark = document
    .querySelector('#job-title')
    .getAttribute('data-id');

  const index = bookmarks.indexOf(selectedBookmark);
  if (index > -1) {
    bookmarks.splice(index, 1);
  } else {
    bookmarks.push(selectedBookmark);
  }
  setCookie('ppkcookie', bookmarks.toString(), 7);
};

// function isHighlighted() {
//   for (let i = 0; i < bookmarks.length; i++) {
//     if (selectedBookmark === bookmarks[i]) {
//       bookMarkEl.classList.add('text-amber-500');
//     }
//   }
// }

bookMarkEl.addEventListener('click', saveBookmark);
