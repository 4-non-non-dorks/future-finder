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
