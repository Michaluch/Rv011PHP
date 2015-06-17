function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
	return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/uk_UA/sdk.js#xfbml=1&version=v2.3&appId=397110820480643";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));