const bookMarkEl = document.querySelector('#bookmark');
const applyBtn = document.querySelector('#apply-btn');
const modalDiv = document.querySelector('#modal-div');
const closeBtn = document.querySelector('#close-btn');
const overlayDiv = document.querySelector('#overlay-div');
const submitForm = document.querySelector('#submit-form');

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

  function showToast() {
    let toast = document.getElementById('toast');

    toast.className = 'show';

    setTimeout(function () {
      toast.className = toast.className.replace('show', '');
    }, 3000);
  }

  function showRemoveToast() {
    let toast = document.getElementById('toast-remove');

    toast.className = 'show';

    setTimeout(function () {
      toast.className = toast.className.replace('show', '');
    }, 3000);
  }

  if (bookMarkEl.classList.contains('text-amber-500')) {
    showToast();
  } else {
    showRemoveToast();
  }
};

function revealModal() {
  modalDiv.classList.remove('hidden');
  overlayDiv.classList.remove('hidden');
}

function closeModal() {
  modalDiv.classList.add('hidden');
  overlayDiv.classList.add('hidden');
}

function myFunction() {
  let toast = document.getElementById('snackbar');

  toast.className = 'show';

  setTimeout(function () {
    toast.className = toast.className.replace('show', '');
  }, 3000);
}

const handleSubmitApplication = async (event) => {
  event.preventDefault();

  let first_nameEl = document.querySelector('#first-name');
  let last_nameEl = document.querySelector('#last-name');
  let emailEl = document.querySelector('#email');
  let street_addressEl = document.querySelector('#street-address');
  let phone_numberEl = document.querySelector('#phone-number');

  const first_name = document.querySelector('#first-name').value.trim();
  const last_name = document.querySelector('#last-name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const street_address = document.querySelector('#street-address').value.trim();
  const phone_number = document.querySelector('#phone-number').value.trim();
  const job_id = document.querySelector('#job-title').getAttribute('data-id');

  if (
    first_name &&
    last_name &&
    email &&
    street_address &&
    phone_number &&
    job_id
  ) {
    const response = await fetch(`/api/jobs/applications`, {
      method: 'POST',
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        street_address,
        phone_number,
        job_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    if (response.ok) {
      closeModal();
      myFunction();
      first_nameEl.value = '';
      last_nameEl.value = '';
      emailEl.value = '';
      street_addressEl.value = '';
      phone_numberEl.value = '';
    } else {
      console.log('fail!');
    }
  } else {
    if (first_nameEl.value === '') {
      first_nameEl.classList.add('border-dashed', 'border-4', 'border-red-500');
    } else if (first_nameEl.value !== '') {
      first_nameEl.classList.remove(
        'border-dashed',
        'border-4',
        'border-red-500'
      );
    }
    if (last_nameEl.value === '') {
      last_nameEl.classList.add('border-dashed', 'border-4', 'border-red-500');
    } else if (last_nameEl.value !== '') {
      last_nameEl.classList.remove(
        'border-dashed',
        'border-4',
        'border-red-500'
      );
    }
    if (emailEl.value === '') {
      emailEl.classList.add('border-dashed', 'border-4', 'border-red-500');
    } else if (emailEl.value !== '') {
      emailEl.classList.remove('border-dashed', 'border-4', 'border-red-500');
    }
    if (street_addressEl.value === '') {
      street_addressEl.classList.add(
        'border-dashed',
        'border-4',
        'border-red-500'
      );
    } else if (street_addressEl.value !== '') {
      street_addressEl.classList.remove(
        'border-dashed',
        'border-4',
        'border-red-500'
      );
    }
    if (phone_numberEl.value === '') {
      phone_numberEl.classList.add(
        'border-dashed',
        'border-4',
        'border-red-500'
      );
    } else if (phone_numberEl.value !== '') {
      phone_numberEl.classList.remove(
        'border-dashed',
        'border-4',
        'border-red-500'
      );
    }
  }
};
function isHighlighted() {
  let bookmarks = [];
  let x = getCookie('ppkcookie') || '';
  if (x !== '') {
    bookmarks = x.split(',');
  }

  let selectedBookmark = document
    .querySelector('#job-title')
    .getAttribute('data-id');

  for (let i = 0; i < bookmarks.length; i++) {
    if (selectedBookmark === bookmarks[i]) {
      bookMarkEl.classList.add('text-amber-500');
    }
  }
}

isHighlighted();

bookMarkEl.addEventListener('click', saveBookmark);
applyBtn.addEventListener('click', revealModal);
closeBtn.addEventListener('click', closeModal);
submitForm.addEventListener('click', handleSubmitApplication);
