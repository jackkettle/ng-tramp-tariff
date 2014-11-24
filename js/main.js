angular
    .module("tariffApp", ['ngSanitize'])

    .controller("mainController", function ($scope, $http, $sce) {

        $scope.useroutine = new Array(10);

        $http.get('json/tariff_skills.json')
            .then(function(res){

                $scope.moves = res.data;
                $scope.novice = [];
                $scope.intermediate = [];
                $scope.advanced = [];
                $scope.elite = [];

                $scope.moves.forEach(function (move) {

                    if(move.level == 'Elite'){
                        //console.log("Elite: " + move.skill);
                        $scope.elite.push(move);
                    }
                    else if(move.level == 'Advanced') {
                        //console.log("Advanced: " + move.skill);
                        $scope.advanced.push(move);
                    }
                    else if(move.level == 'Intermediate') {
                        //console.log("Intermediate: " + move.skill);
                        $scope.intermediate.push(move);
                    }
                    else if(move.level == 'Novice') {
                        //console.log("Novice: " + move.skill);
                        $scope.novice.push(move);
                    }


                });

            });

        $scope.parseHtml = function($scope) {
            return $sce.trustAsHtml($scope);
        };
    })
