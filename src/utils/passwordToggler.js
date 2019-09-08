import { HIDE, TEXT, PASSWORD_TYPE } from '../defaults';

const passwordToggler = id => () => {
  const toggleType = document.getElementById(id);
  const showEyeSlashIcon = document.getElementById(`${id}-remove-hide`);
  const hideEyeIcon = document.getElementById(`${id}-add-hide`);

  if (toggleType.type === PASSWORD_TYPE) {
    toggleType.type = TEXT;
    showEyeSlashIcon.classList.remove(HIDE);
    return hideEyeIcon.classList.add(HIDE);
  }
  toggleType.type = PASSWORD_TYPE;
  showEyeSlashIcon.classList.add(HIDE);
  return hideEyeIcon.classList.remove(HIDE);
};

export default passwordToggler;
