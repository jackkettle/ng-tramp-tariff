angular
    .module("tariffApp", ['ngSanitize'])

    .controller("mainController", function ($scope, $http, $sce) {

        $scope.useroutine = new Array(10);

        $http.get('json/tariff_skills.json')
            .then(function(res){
                $scope.moves = res.data;
            });

        $scope.parseHtml = function($scope) {
            return $sce.trustAsHtml($scope);
        };
    })
