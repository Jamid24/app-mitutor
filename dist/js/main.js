
$(function(){
  $('#formSignIn').on('submit', function (e) {
    e.preventDefault();
    processLogin();
  });

  $('#menu-final').click(function() {
    e.preventDefault();
    processLogout();
  });
});

function processLogin(){
    $.ajax({
      url: urlWs+"LoginController.php?action=1",
      data:JSON.stringify( {
        "codePerson" : $("#codeInstitution").val()
        ,"passw" : $("#passwordUser").val()
        ,"idInstitution" : $("#selectUniversity").val()
      }),
      type: "POST",
      dataType: "json",
  })
   .done(function( data, textStatus, jqXHR ) {
      console.log( data );
       if ( data.status !==200 ) {
         $('#msg-error-login').text(data.message);
         $('#msg-error-login').show();
       }else{
         sessionStorage.clear();
         sessionStorage.setItem("ID", data.id_user);
         sessionStorage.setItem("IDPROFILE", data.id_profile);
         sessionStorage.setItem("NAMES", data.names);
         sessionStorage.setItem("SURNAMES", data.surnames);
         sessionStorage.setItem("CODEUSER", data.code_user_institution);
         sessionStorage.setItem("INSTITUTION", data.id_institution);
         sessionStorage.setItem("MAILINSTI", data.email_institucional);
         sessionStorage.setItem("MAILOWN", data.email_personal);
         sessionStorage.setItem("PASSW", data.password);
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

function processLogout(){
  sessionStorage.clear();
  location.href = urlRoot;
}
