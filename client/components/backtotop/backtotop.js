'use strict';
angular.module('wwyzWebApp')
	.directive("backToTop", function () {
		return {
			restrict: "E",
			link: function (scope, element, attr) {
				var e = $(element);
				$(window).scroll(function () {
					if ($(document).scrollTop() > 600) {
						//获取滚动条到顶部的垂直高度,到相对顶部300px高度显示
						e.fadeIn(1000)
					} else {
						e.fadeOut(1000);
					}
				});
				/*点击回到顶部*/
				e.click(function () {
					$('html, body').animate({                 //添加animate动画效果
						scrollTop: 0
					}, 500);
				});
			}
		};
	});
