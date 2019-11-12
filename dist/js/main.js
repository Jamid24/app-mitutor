const urlWs ='http://localhost/ws-basic-mi-tutor/controller/';
$(function(){
  $('#formSignIn').on('submit', function (e) {
    e.preventDefault();
    processLogin();
  });
});

function processLogin(){
    $.ajax({
      url: urlWs+"LoginController.php?action=1",
      data:JSON.stringify( {
        "codePerson" : $("#codeInstitution").val()
        ,"passPerson" : $("#passwordUser").val()
        ,"idInstitution" : $("#selectUniversity").val()
      }),
      type: "POST",
      dataType: "json",
  })
   .done(function( data, textStatus, jqXHR ) {
       if ( data.status !==200 ) {
         $('#msg-error-login').text(data.message);
         $('#msg-error-login').show();
         console.log( data );
       }else{
         sessionStorage.clear();
         sessionStorage.setItem("IUD", "ROGERS");
         sessionStorage.setItem("NAMES", "ROGERS");
         sessionStorage.setItem("SURNAMES", "ROGERS");
         sessionStorage.setItem("MAILINS", "ROGERS");
         sessionStorage.setItem("CODE", "ROGERS");
         sessionStorage.setItem("CITY", "ROGERS");
         $(location).attr('href','pages/home.html');
       }
   })
   .fail(function( jqXHR, textStatus, errorThrown ) {
     $('#msg-error-login').text("Lo sentimos no se pudo iniciar la sesión. Por favor intente más tarde.");
     $('#msg-error-login').show();
       if ( console && console.log ) {
           console.log( "La solicitud a fallado: " +  textStatus);
       }
  });
}
