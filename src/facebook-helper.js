export function initFacebookSdk() {
  return new Promise((resolve) => {
    // wait for facebook sdk to initialize before starting the react app
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '339596424708309',
        cookie: true,
        xfbml: true,
        status: false,
        oauth: true,
        version: 'v13.0',
      });
      // auto authenticate with the api if already logged in with facebook
      window.FB.getLoginStatus(({ authResponse }) => {
        // debugger;
        if (authResponse) {
          resolve(authResponse);
        } else {
          resolve('null');
        }
      });
    };

    // load facebook sdk script
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src =
        'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v13.0';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  });
}
