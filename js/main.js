angular
    .module("tariffApp", ['ngSanitize'])

    .controller("mainController", function ($scope, $http) {

        $scope.useroutine = new Array(10);

        $http.get('json/tariff_skills.json')
            .then(function(res){

                $scope.moves = res.data;
                $scope.novice = [];
                $scope.intermediate = [];
                $scope.advanced = [];
                $scope.elite = [];

                $scope.routine = [1,2,3,4,5,6,7,8,9];
                $scope.userRoutine = [1,2,3,4,5,6,7,8,9,10];

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

    })

.filter('parseHtml', ['$sce', function () {
        return function(data){
            console.log(data);
            return $sce.getTrustedHtml(data)
        }
    }])