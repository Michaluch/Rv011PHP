// use jQuery
// function for change attr src of image on sign up form. We can see picture which we will upload
function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
// here we notice when input #imgInp change and run function readURL
$(document).ready(function(){
    $("#imgInp").change(function(){
    readURL(this);
});
});