/* put js code here */
console.log('this file is running.');
var redditApp = angular.module('RedditApp', []);

redditApp.controller('redditCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.searchTerm = '';
  $scope.articles = [];

  if(localStorage.length === 0) {
    $scope.history = [];
  } else {
    $scope.history = JSON.parse(localStorage.getItem('$scope.history'));
  }

  $scope.search = function() {
    var req = {
      url: "http://www.reddit.com/search.json?q=" + $scope.searchTerm,
      method: 'GET'
    }

    $http(req).then(function success(res) {
      var redditData = res.data.data.children
      console.log(redditData);
      $scope.history.push($scope.searchTerm);
      localStorage.setItem('$scope.history', JSON.stringify($scope.history));

      for(var i =0; i < redditData.length; i++ ) {
        var info = redditData[i].data
        $scope.articles.push(info);
      }
      
    }, function error(res) {
      console.log(res);
    })
  }
  
}]);