import swal from 'sweetalert2';

const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000,
});

const toaster = (type, title) => {
  toast({
    type,
    title
  });
};

export default toaster;