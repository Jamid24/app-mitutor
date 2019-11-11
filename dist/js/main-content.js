$(function(){
    $("#navbar").load("navbar.html");
    $("#main-sidebar").load("main-sidebar.html"); 
    $("#footer").load("footer.html"); 

    let body=$('body');
    setTimeout(()=>{
        switch(body.attr('id')){
            case "home":
                $('#menu-1').addClass('active');
                $('#menu-2').removeClass('active');
                $('#menu-3').removeClass('active');
                break;
            case "my-calendar":
                $('#menu-2').addClass('active');
                $('#menu-1').removeClass('active');
                $('#menu-3').removeClass('active');
                break;
            case "settings":
                $('#menu-3').addClass('active');
                $('#menu-2').removeClass('active');
                $('#menu-1').removeClass('active');
                break;
            default:
                break;
        }
    }, 1000);
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#prev-image-user').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}