'use strict';

/**
 * @ngdoc overview
 * @name devigetApp
 * @description
 * # devigetApp
 *
 * Main module of the application.
 */
angular
  .module('devigetApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ui.router',
    'ngSanitize'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/games');
    
    $stateProvider
      .state('main', {
        url: '/games',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })

      .state('game', {
        url: '/games/:playerId',
        templateUrl: 'views/game.html',
        controller: 'GameCtrl',
        resolve: {
          playerId: function($stateParams) {
            return $stateParams.playerId;
          }
        }
      });
      
  });
