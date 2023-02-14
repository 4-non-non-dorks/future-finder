const searchForm = document.querySelector('#search-form');
const searchBtn = document.querySelector('#search-btn');
const submitBtn = document.querySelector('#submit-btn');
const searchInput = document.querySelector('#search-input');

const newSearchHandler = async (event) => {
  event.preventDefault();
  const jobSearch = searchInput.value.trim();
  console.log(jobSearch);

  if (jobSearch) {
    document.location.replace(`/jobs/search?job=${jobSearch}`);
  }
};

searchForm.addEventListener('submit', newSearchHandler);
