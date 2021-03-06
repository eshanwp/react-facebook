import React, { useState } from 'react';
import { Button, Card, Spin } from 'antd';

const LikeAFacebookContentComponent = ({ rewardData }) => {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);

  const facebookPageURL = 'https://www.facebook.com/imdb/';

  function loadFbLoginApi() {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 339596424708309,
        cookie: true,
        xfbml: true,
        version: 'v13.0',
      });
      setLoading(false);

      FB.getLoginStatus(function (response) {
        console.log(response);
        if (response.status === 'connected') {
          // The user is logged in and has authenticated your
          // app, and response.authResponse supplies
          // the user's ID, a valid access token, a signed
          // request, and the time the access token
          // and signed request each expire.
          var uid = response.authResponse.userID;
          var accessToken = response.authResponse.accessToken;
        } else if (response.status === 'not_authorized') {
          // The user hasn't authorized your application.  They
          // must click the Login button, or you must call FB.login
          // in response to a user gesture, to launch a login dialog.
        } else {
          // The user isn't logged in to Facebook. You can launch a
          // login dialog with a user gesture, but the user may have
          // to log in to Facebook before authorizing your application.
        }
      });

      FB.login(
        function (response) {
          if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function (response) {
              console.log('Good to see you, ' + response.name + '.');
            });
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
        },
        { scope: 'email,user_likes' }
      );
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  React.useEffect(() => {
    loadFbLoginApi();
  }, []);

  const testAPI = () => {
    window.FB.getLoginStatus(function (response) {
      if (response.status === 'connected') {
        console.log('token = ' + response.authResponse.accessToken);

        window.FB.api('/me/likes', function (response) {
          if (response && !response.error) {
            console.log(response);
            const res = response.data.find((item) => item.name === 'imdb');
            console.log(res);
          }
        });
      }
    });
  };

  return (
    <React.Fragment>
      {isLogin && <Button onClick={testAPI}>Test 1</Button>}

      <Card>
        {loading ? (
          <Spin />
        ) : (
          <div
            className="fb-page"
            data-href="https://www.facebook.com/imdb"
            data-hide-cover="false"
            data-show-facepile="false"
            data-width="500"
            data-height="352"
          ></div>
        )}
      </Card>
    </React.Fragment>
  );
};
export default LikeAFacebookContentComponent;
