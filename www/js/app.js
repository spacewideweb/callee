// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('callee', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.factory('API', function($http) {
  var api = {};
  var baseURL = 'https://6a70ffe2.ngrok.io';
  
  api.sendMsg = function(to, text) {

    let body = {
      to: to, 
      text: text
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return $http.post(baseURL + '/sendmsg', JSON.stringify(body), {headers: headers});
  };

  api.triggerCall = function(to) {

    let body = {
      to: to
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return $http.post(baseURL + '/triggercall', JSON.stringify(body),{headers: headers});
  };
  return api;
})

.controller('AppCtrl', function($scope, $ionicLoading, $ionicPopup, API) {
  $scope.processing = false;
  $scope.show = function(message) {
    $ionicLoading.show({
      template: message
    });
  };
  
  $scope.hide = function() {
    $ionicLoading.hide();
  };

  $scope.showAlert = function(msg) {
    $ionicPopup.alert({
      title: msg.title,
      template: msg.message,
      okText: 'Cool',
      okType: 'button-assertive'
    });
  };

  $scope.sendMessage = function() {
    console.log('sendmessage');
    $scope.processing = true;
    $scope.show('Send Message...');
    API.sendMsg($scope.msgTo, $scope.msgText).then(function(data) {
      if (data.data.status == 'success') {
        $scope.msgTo = '';
        $scope.msgText = '';
        $scope.showAlert({
          title: 'Success',
          message: 'Message sent successfully'
        });
      } else {
        $scope.showAlert({
          
          title:'Oops!!',
          message: 'Oops something went wrong! Please try again later.'
        });
      }

      $scope.hide();
      $scope.processing = false;
    });
  };

  $scope.triggerCall = function() {
    console.log('triggercall');
    $scope.processing = true;
    $scope.show('Triggering a call...');
    API.triggerCall($scope.callTo).then(function(data) {
      if (data.data.status == 'success') {
        $scope.callTo = '';
        $scope.showAlert({
          title: 'Success',
          message: 'Call triggered successfully'
        });
      } else {
        $scope.showAlert({
          title: 'Oops!!',
          message: 'Oops something went wrong! Please try again later.'
        });
      }
      $scope.hide();
      $scope.processing = false;
    });
  };

  $scope.navigteCall = function() {
    console.log('navigate');
    $scope.processing = false;
    
  };
});
