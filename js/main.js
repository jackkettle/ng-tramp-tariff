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