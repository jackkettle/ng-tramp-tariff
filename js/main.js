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
                    console.log("-------------On change--------------");
                    for (var i = $scope.userRoutine.length - 1; i >= 1; i--) {
                        
                        // check if skill is set
                        if($scope.userRoutine[i].skill){
                            for (var j = i ; j >= 0; j--) {
                                if($scope.userRoutine[j].skill){
                                    for (var j = i - 1 ; j >= 0; j--) {
                                        if($scope.userRoutine[i].skill == $scope.userRoutine[j].skill){
                                            console.log($scope.userRoutine[i].skill + " - " + $scope.userRoutine[j].skill);
                                            console.log(i + ": " +$scope.userRoutine[i].skill);
                                            console.log(j + ": " +$scope.userRoutine[j].skill);
                                            var newMove =  angular.copy($scope.userRoutine[i]);
                                            newMove.tariff = 0;
                                            console.log(newMove.tariff);
                                            console.log($scope.userRoutine[i].tariff);
                                            $scope.userRoutine[i]= newMove;
                                            $scope.userRoutine[i].repeatMove = true;
                                        }
                                    }
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