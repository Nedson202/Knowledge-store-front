const passwordToggler = id => () => {
  const toggleType = document.getElementById(id);
  const showEyeSlashIcon = document.getElementById('remove-hide');
  const hideEyeIcon = document.getElementById('add-hide');

  if (toggleType.type === 'password') {
    toggleType.type = 'text';
    showEyeSlashIcon.classList.remove('hide');
    hideEyeIcon.classList.add('hide');
  } else {
    toggleType.type = 'password';
    showEyeSlashIcon.classList.add('hide');
    hideEyeIcon.classList.remove('hide');
  }
};

export default passwordToggler;
