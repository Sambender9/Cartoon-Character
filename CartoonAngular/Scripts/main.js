var url = "https://samsapp.firebaseio.com/.json";
var app = angular.module("mainApp", []);
app.factory("Cartoons", function () {
    return [
    { name: "Bugs Bunny", year: "July 27th, 1940", img: "http://076dd0a50e0c1255009e-bd4b8aabaca29897bc751dfaf75b290c.r40.cf1.rackcdn.com/images/files/000/004/215/original/original.jpg" },
    { name: "Elmer Fudd", year: "June 16th, 1937", img: "http://img4.wikia.nocookie.net/__cb20100329193357/looneytunes/images/c/c0/ElmerFudd.png" },
    { name: "Tom & Jeremy", year: "April 9th, 1965", img: "http://hdwallpapersrc.com/wp-content/uploads/2013/09/Cartoon.jpg" },
    { name: "Yosemitie Sam", year: "April 3, 1943", img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT6rQCX2m8bcPejhdKYAbiUtCXEjneDGoW_chyKB3L6P7sY_Wnc" }
    ];
});
app.controller("CreateController", function ($scope, Cartoons, $http) {
    $scope.cartoons = Cartoons;
    $scope.addCartoon = function () {
        var name = $scope.cartoon.name;
        alert(name);
        var year = $scope.cartoon.year;
        var img = $scope.cartoon.img;
        $scope.cartoons.push({ name: name, year: year, img: img });
        $http.post(url, $scope.cartoon).success(function (data) { }).error(function () { });
    };
});
app.controller("DisplayController", function ($scope, Cartoons) {
    $scope.cartoons = Cartoons;
    $scope.editCartoon = function (cartoon) {
        var index = $scope.cartoons.indexOf(cartoon);
        $('#myModal').modal();
        $scope.modal = {};
        $scope.modal.name = cartoon.name;
        $scope.modal.year = cartoon.year;
        $scope.modal.img = cartoon.img;
        $scope.modal.index = index;
        $http.get(url, $scope.cartoon).success(function (data) { }).error(function () { });
    }
    $scope.saveCartoon = function (cartoon) {
        $scope.cartoons[cartoon.index].name = cartoon.name;
        $scope.cartoons[cartoon.index].year = cartoon.year;
        $scope.cartoons[cartoon.index].img = cartoon.img;
        $('#myModal').modal('hide');
        $http.put(url, $scope.cartoon).success(function (data) { }).error(function () { });
    }
    $scope.deleteCartoon = function (cartoon) {
        var index = $scope.cartoons.indexOf(cartoon);
        $scope.cartoons.splice(index, 1);
        $http.delete(url, $scope.cartoon).success(function (data) { }).error(function () { });
    }
});