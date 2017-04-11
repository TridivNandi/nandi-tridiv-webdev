/**
 * Created by Tridiv on 04-04-2017.
 */
(function () {

    angular
        .module('MovieAppMaker')
        .controller('ProfileController', ProfileController);

    function ProfileController($stateParams) {

        var vm = this;
        vm.userId = $stateParams.userId;

        function init() {
        }

        init();

    }

})();