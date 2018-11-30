const passwordToggler = id => () => {
  const toggleType = document.getElementById(id);
  const showEyeSlashIcon = document.getElementById(`${id}-remove-hide`);
  const hideEyeIcon = document.getElementById(`${id}-add-hide`);

  if (toggleType.type === 'password') {
    toggleType.type = 'text';
    showEyeSlashIcon.classList.remove('hide');
    return hideEyeIcon.classList.add('hide');
  }
  toggleType.type = 'password';
  showEyeSlashIcon.classList.add('hide');
  return hideEyeIcon.classList.remove('hide');
};

export default passwordToggler;
