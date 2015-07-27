// use jQuery
// function for change attr src of image on sign up form. We can see picture which we will upload

function readURL(input) {

    alert(input[0]);
    if (input[0].files && input[0].files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

         reader.readAsDataURL(input[0].files[0]);
    }
}
// here we notice when input #imgInp change and run function readURL
$(document).ready(function(){
    $("#imgInp").change(function(){
    readURL(this);
});
});

     function uploadFile()
        {       
            var f = document.getElementById('imgInp').file;
            var reader = new FileReader();     

            // Keep a reference to the File in the FileReader so it can be accessed in callbacks
            reader.file = f; 

            reader.onerror = function(e) 
            {
                switch(e.target.error.code) 
                {
                    case e.target.error.NOT_FOUND_ERR:
                        alert('File Not Found!');
                        break;
                    case e.target.error.NOT_READABLE_ERR:
                        alert('File is not readable');
                        break;
                    case e.target.error.ABORT_ERR:
                        break; // noop
                    default:
                        alert('An error occurred reading this file.');
                };
            };     

            reader.onabort = function(e) 
            {
                alert('File read cancelled');
            };

            reader.onload = function(e) 
            {
                var att = new sforce.SObject("Attachment");
                att.Name = this.file.name;
                att.ContentType = this.file.type;
                att.ParentId = parentId;

                att.Body = (new sforce.Base64Binary(e.target.result)).toString();

                sforce.connection.create([att],
                {
                    onSuccess : function(result, source) 
                    {
                        if (result[0].getBoolean("success")) 
                        {
                            console.log("new attachment created with id " + result[0].id);
                        } 
                        else 
                        {
                            console.log("failed to create attachment " + result[0]);
                        }
                    }, 
                    onFailure : function(error, source) 
                    {
                        console.log("An error has occurred " + error);
                    }
                });
            };

            reader.readAsBinaryString(f);
        }