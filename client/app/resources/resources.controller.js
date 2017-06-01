'use strict';
(function () {
	function ResourcesController($scope, $stateParams, $resource,$state,$http) {
		$scope.resources = $resource('/api/resource/getresourcelist?rno=' + $stateParams.rno).query(function (data) {
			var s = data.map(function (x) {
				x.docTypeCode = x.doctype && x.doctype.length >= 2 ? x.doctype.substring(0, 2) : '未定义';
				return x;
			});
			groupByDocTYpe(s);
		});
		function groupByDocTYpe(s){
			$scope.docTypes = _.groupBy(s, function (y) {
				return y.docTypeCode;
			});
		}
		$scope.MainrestInfo = $resource('/api/health/getmainres/'+$stateParams.rno).get();
		$scope.refresh=function(){
			$state.go('resource',null,{reload:true});
		};
		$scope.save=function(){
			if(confirm("确定要修改吗？")){
				$http.put('/api/health/updatemainrest/'+$stateParams.rno,$scope.MainrestInfo).success(function(){
					$scope.refresh();
				})
			}
		};
		$scope.goCourseList=function(){
			$state.go('main');
		}
	}

	angular.module('metelHealthWebApp')
		.controller('ResourcesController', ResourcesController);
})();
