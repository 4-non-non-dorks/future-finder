const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const emailEl = document.querySelector('#email-login');
  const passwordEl = document.querySelector('#password-login');
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  } else {
    if (emailEl.value === '') {
      emailEl.classList.add('border-dashed', 'border-4', 'border-red-500');
    } else if (emailEl.value !== '') {
      emailEl.classList.remove('border-dashed', 'border-4', 'border-red-500');
    }
    if (passwordEl.value === '') {
      passwordEl.classList.add('border-dashed', 'border-4', 'border-red-500');
    } else if (passwordEl.value !== '') {
      passwordEl.classList.remove('border-dashed', 'border-4', 'border-red-500');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  const nameEl = document.querySelector('#name-signup');
  const emailEl = document.querySelector('#email-signup');
  const passwordEl = document.querySelector('#password-signup');

  const name = document.querySelector('#name-signup').value.trim();
  const company_name =
    document.querySelector('#company-signup').value.trim() || '';
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, company_name }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  } else {
    if (nameEl.value === '') {
      nameEl.classList.add('border-dashed', 'border-4', 'border-red-500');
    } else if (nameEl.value !== '') {
      nameEl.classList.remove('border-dashed', 'border-4', 'border-red-500');
    }
    if (emailEl.value === '') {
      emailEl.classList.add('border-dashed', 'border-4', 'border-red-500');
    } else if (emailEl.value !== '') {
      emailEl.classList.remove('border-dashed', 'border-4', 'border-red-500');
    }
    if (passwordEl.value === '') {
      passwordEl.classList.add('border-dashed', 'border-4', 'border-red-500');
    } else if (passwordEl.value !== '') {
      passwordEl.classList.remove('border-dashed', 'border-4', 'border-red-500');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
