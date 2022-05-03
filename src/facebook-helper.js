export function initFacebookSdk() {
  return new Promise((resolve) => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '419540283336546',
        xfbml: true,
        version: 'v13.0',
      });
      window.FB.getLoginStatus(({ authResponse }) => {
        // debugger;
        console.log(authResponse);
        if (authResponse) {
        } else {
          resolve('null');
        }
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  });
}
