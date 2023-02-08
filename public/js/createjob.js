const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#job-name').value.trim();
  const location = document.querySelector('#job-location').value.trim();
  const description = document.querySelector('#job-desc').value.trim();
  const salary = document.querySelector('#job-salary').value.trim();
  const benefits = document.querySelector('#job-benefits').value.trim();

  if (name && location && description && salary && benefits) {
    const response = await fetch(`/api/jobs`, {
      method: 'POST',
      body: JSON.stringify({ name, location, description, salary, benefits }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create job');
    }
  }
};

document
  .querySelector('#new-job-form')
  .addEventListener('submit', newFormHandler);
