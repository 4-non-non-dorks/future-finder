let bookmarkDiv = document.querySelector('#bookmarks');
let appliedDiv = document.querySelector('#applied');
let bookmarkTextEl = document.querySelector('#bookmark-text');
let appliedTextEl = document.querySelector('#applied-text');

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete job');
    }
  }
};

let deleteBtnEl = document.querySelectorAll('.delete-btn');

for (let i = 0; i < deleteBtnEl.length; i++) {
  deleteBtnEl[i].addEventListener('click', delButtonHandler);
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

let x = getCookie('ppkcookie') || '';
let cookie = [];
if (x !== '') {
  cookie = x.split(',');
}

fetch(`/api/jobs/bookmarks`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    bookmarks: cookie,
  }),
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    if (data.length < 1) {
      bookmarkTextEl.classList.remove('hidden');
    }
    //loop through data and put in bookmark div in profile
    for (let i = 0; i < data.length; i++) {
      bookmarkDiv.innerHTML += `<a href="/jobs/${data[i].id}"> <div
      class='border-2 border-[#114B5F] rounded-lg p-8 m-4 bg-gradient-to-b from-white to-green-200 to-[#88D498] h-52 w-52 transition ease-in-out hover:scale-110 duration-300'>
      <h1 class='text-[#114B5F] font-bold text-xl text-center fancy'>${data[i].name}</h1>
      <h2 class='text-[#114B5F] font-bold text-md text-center'>${data[i].user.company_name}</h2>
      <div class="text-center pt-7"> </a>`;
    }
  });

function handleAppliedDisplay() {
  fetch(`/api/jobs/applications`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.length < 1) {
        appliedTextEl.classList.remove('hidden');
      }
      for (let i = 0; i < data.length; i++) {
        fetch(`/api/jobs/applied`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            job_id: `${data[i].job_id}`,
          }),
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (jobs) {
            console.log(jobs);
            for (let i = 0; i < jobs.length; i++) {
              appliedDiv.innerHTML += `<a href="/jobs/${jobs[i].id}"> <div
      class='border-2 border-[#114B5F] rounded-lg p-8 m-4 bg-gradient-to-b from-white to-green-200 to-[#88D498] h-52 w-52 transition ease-in-out hover:scale-110 duration-300'>
      <h1 class='text-[#114B5F] font-bold text-xl text-center fancy'>${jobs[i].name}</h1>
      <h2 class='text-[#114B5F] font-bold text-md text-center'>${jobs[i].user.company_name}</h2>
      <div class="text-center pt-7"> </a>`;
            }
          });
      }
    });
}

handleAppliedDisplay();
