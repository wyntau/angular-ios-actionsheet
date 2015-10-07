angular.module('angular-ios-actionsheet', [])
.directive('iosActionSheet', function(){
  return {
    restrict: 'AE',
    replace: true,
    template: [
      '<div class="ios-actionsheet-overlay" ng-click="onClick($event)">',
        '<div class="ios-actionsheet">',
          '<div class="ios-actionsheet-group" ng-repeat="group in buttons">',
            '<div ng-click="onClick($event, button, $index, $parent.$index)" ng-repeat="button in group" ng-class="{\'ios-actionsheet-label\': (button.label && $index == 0), \'ios-actionsheet-button\': !button.label, \'ios-actionsheet-button-color\': button.color, \'ios-actionsheet-button-bold\': button.bold, \'ios-actionsheet-button-disable\': button.disable}">{{ button.text }}</div>',
          '</div>',
        '</div>',
      '</div>'
    ].join('')
  };
})
.factory('iosActionSheet', [
  '$rootScope',
  '$compile',
  '$animate',
  '$q',
  '$document',
  '$log',
  function($rootScope, $compile, $animate, $q, $document, $log){
    function iosActionSheet(buttons){

      if(!angular.isArray(buttons)){
        $log.error('iosActionSheet expect an array of buttons');
        return $q.when();
      }

      // makes button groups
      if(!angular.isArray(buttons[0])){
        buttons = [buttons];
      }

      var deferred = $q.defer();
      var $scope = $rootScope.$new(true);
      var $element = $compile('<div ios-action-sheet></div>')($scope);

      $scope.buttons = buttons;

      $scope.onClick = function($event, button, $index, $parentIndex){

        $event.preventDefault();
        $event.stopPropagation();

        var cbkData;

        // click button
        if(button){
          // if button is disabled or is label, just return
          if(button.disable || button.label){
            return;
          }
          cbkData = {
            button: button,
            index: $index,
            parentIndex: $parentIndex
          };
          if(angular.isFunction(button.onClick)){
            button.onClick(cbkData);
          }
        }

        $animate.leave($element).then(function(){
          if(cbkData){
            deferred.resolve(cbkData);
          }else{
            deferred.reject();
          }
        });
      };

      $animate.enter($element, $document[0].body, $document[0].body.lastChild);

      return deferred.promise;
    }
    return iosActionSheet;
  }
]);
