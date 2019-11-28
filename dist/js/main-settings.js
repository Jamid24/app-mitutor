$(function () {

  $('#formSettings').on('submit', function (e) {
    e.preventDefault();
    Swal.fire(
       'Operación exitosa!',
       'Información actualizada',
       'success'
     );
   });

   $('#setting-id').val(sessionStorage.getItem("ID"));
   $('#setting-names').val(sessionStorage.getItem("NAMES"));
   $('#setting-email1').val(sessionStorage.getItem("MAILINSTI"));
   $('#setting-lastname').val(sessionStorage.getItem("SURNAMES"));
   $('#setting-codeUser').val(sessionStorage.getItem("CODEUSER"));
   $('#setting-city').val('Bogotá D.C.');

  })
