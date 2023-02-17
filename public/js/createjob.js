const newFormHandler = async (event) => {
  event.preventDefault();

  const nameEl = document.querySelector('#job-name');
  const locationEl = document.querySelector('#job-location');
  const descriptionEl = document.querySelector('#job-desc');
  const salaryEl = document.querySelector('#job-salary');
  const benefitsEl = document.querySelector('#job-benefits');
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
  } else {
    if (nameEl.value === '') {
      nameEl.classList.add('border-dashed', 'border-4', 'border-red-500');
    } else if (nameEl.value !== '') {
      nameEl.classList.remove('border-dashed', 'border-4', 'border-red-500');
    }
    if (locationEl.value === '') {
      locationEl.classList.add('border-dashed', 'border-4', 'border-red-500');
    } else if (locationEl.value !== '') {
      locationEl.classList.remove(
        'border-dashed',
        'border-4',
        'border-red-500'
      );
    }
    if (descriptionEl.value === '') {
      descriptionEl.classList.add(
        'border-dashed',
        'border-4',
        'border-red-500'
      );
    } else if (descriptionEl.value !== '') {
      descriptionEl.classList.remove(
        'border-dashed',
        'border-4',
        'border-red-500'
      );
    }
    if (salaryEl.value === '') {
      salaryEl.classList.add('border-dashed', 'border-4', 'border-red-500');
    } else if (salaryEl.value !== '') {
      salaryEl.classList.remove('border-dashed', 'border-4', 'border-red-500');
    }
    if (benefitsEl.value === '') {
      benefitsEl.classList.add('border-dashed', 'border-4', 'border-red-500');
    } else if (benefitsEl.value !== '') {
      benefitsEl.classList.remove(
        'border-dashed',
        'border-4',
        'border-red-500'
      );
    }
  }
};

document
  .querySelector('#new-job-form')
  .addEventListener('submit', newFormHandler);
