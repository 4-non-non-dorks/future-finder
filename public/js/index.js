const deleteJob = (id) =>
  fetch(`/api/jobs/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

document
  .getElementById('delete-btn')
  .addEventListener('click', console.log('clicked'));
