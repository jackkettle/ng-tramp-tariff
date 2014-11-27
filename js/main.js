angular
    .module("tariffApp", ['ngSanitize'])

    .controller("mainController", function ($scope, $http, $sce, $compile) {

        $scope.useroutine = new Array(10);

        $http.get('json/tariff_skills.json')
            .then(function(res){

                $scope.moves = res.data;

                $scope.userRoutine = [1,2,3,4,5,6,7,8,9,10];
                var sum = 0;
                for (var i = 0 ; i < $scope.userRoutine.length; i++) {
                    if($scope.userRoutine[i].tariff){
                        sum += $scope.userRoutine[i].tariff;
                    }
                }
                $scope.sum = sum;
                
                $scope.onChange = function () {
  
                    // check for repeat skills
                    for (var i = $scope.userRoutine.length - 1; i >= 1; i--) {
                        // check if skill is set
                        if($scope.userRoutine[i].skill){
                            // check moves below move i
                            for (var j = i ; j >= 0; j--) {
                                // if its set and is the same as the move i
                                if($scope.userRoutine[j].skill && 
                                $scope.userRoutine[i].skill == $scope.userRoutine[j].skill){
                                    // copy new move and set tariff to 0
                                    var newMove =  angular.copy($scope.userRoutine[i]);
                                    newMove.tariff = 0;
                                    $scope.userRoutine[i]= newMove;
                                    // mark move as a repeated move
                                    $scope.userRoutine[i].repeatMove = true;

                                }
                            }
                        }
                    }
                    checkTariff($scope.userRoutine);
                }
                
                function checkTariff (userRoutine) {
                    var sum = 0.0;
                    for (var i = 0 ; i < userRoutine.length; i++) {
                        if(userRoutine[i].tariff){
                            sum += userRoutine[i].tariff;
                        }
                    }
                    $scope.sum = Math.round( sum * 10) / 10;
                }
                
            });
    
    })