<!DOCTYPE html>
<html lang="en-US">
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <h2>Change Your Password</h2>

        <div>
            Please follow the link below to change your password in your profile
              {{ URL::to('register/reset/'.$msg)}}.<br/>

        </div>

    </body>
</html>