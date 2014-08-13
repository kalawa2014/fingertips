'use strict';

/* Directives */

angular.module('myApp.directives', []).
        directive('appVersion', ['version', function(version) {
                return function(scope, elm, attrs) {
                    elm.text(version);
                };
            }])
        //directive slider
        .directive('slider', function($timeout) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    images: '='
                },
                link: function(scope) {

                    scope.currentIndex = 0;

                    scope.next = function() {
                        if (typeof (scope.images) !== 'undefined') {
                            scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
                        }
                    };

                    scope.prev = function() {
                        if (typeof (scope.images) !== 'undefined') {
                            scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
                        }
                    };

                    scope.$watch('currentIndex', function() {
                        if (typeof (scope.images) !== 'undefined') {
                            scope.images.forEach(function(image) {
                                image.visible = false;
                            });
                            try {
                                scope.images[scope.currentIndex].visible = true;
                            }
                            catch (Exception)
                            {
                            }
                        }
                    });

                    /* Start: For Automatic slideshow*/

                    var timer;

                    var sliderFunc = function() {
                        timer = $timeout(function() {
                            scope.next();
                            timer = $timeout(sliderFunc, 2000);
                        }, 2000);
                    };

                    sliderFunc();

                    scope.$on('$destroy', function() {
                        $timeout.cancel(timer);
                    });

                    /* End : For Automatic slideshow*/

                },
                templateUrl: 'partials/sliderTemplate.html'
            };
        })
        //Direcive Paginator
        .directive('paginator', function() {
            var pageSizeLabel = "Page size";
            return {
                priority: 0,
                restrict: 'A',
                scope: {items: '&'},
                template:
                        '<button ng-disabled="isFirstPage()" ng-click="decPage()">&lt;</button>'
                        + '{{paginator.currentPage+1}}/{{numberOfPages()}}'
                        + '<button ng-disabled="isLastPage()" ng-click="incPage()">&gt;</button>'
                        + '<span>' + pageSizeLabel + '</span>'
                        + '<select ng-model="paginator.pageSize" ng-options="size for size in pageSizeList"></select>',
                replace: false,
                compile: function compile(tElement, tAttrs, transclude) {
                    return {
                        pre: function preLink(scope, iElement, iAttrs, controller) {
                            scope.pageSizeList = [10, 20, 50, 100];
                            scope.paginator = {
                                pageSize: 10,
                                currentPage: 0
                            };

                            scope.isFirstPage = function() {
                                return scope.paginator.currentPage === 0;
                            };
                            scope.isLastPage = function() {
                                return scope.paginator.currentPage
                                        >= scope.items().length / scope.paginator.pageSize - 1;
                            };
                            scope.incPage = function() {
                                if (!scope.isLastPage()) {
                                    scope.paginator.currentPage++;
                                }
                            };
                            scope.decPage = function() {
                                if (!scope.isFirstPage()) {
                                    scope.paginator.currentPage--;
                                }
                            };
                            scope.firstPage = function() {
                                scope.paginator.currentPage = 0;
                            };
                            scope.numberOfPages = function() {
                                return Math.ceil(scope.items().length / scope.paginator.pageSize);
                            };
                            scope.$watch('paginator.pageSize', function(newValue, oldValue) {
                                if (newValue !== oldValue) {
                                    scope.firstPage();
                                }
                            });

                            // ---- Functions available in parent scope -----

                            scope.$parent.firstPage = function() {
                                scope.firstPage();
                            };
                            // Function that returns the reduced items list, to use in ng-repeat
                            scope.$parent.pageItems = function() {
                                var start = scope.paginator.currentPage * scope.paginator.pageSize;
                                var limit = scope.paginator.pageSize;
                                return scope.items().slice(start, start + limit);
                            };
                        },
                        post: function postLink(scope, iElement, iAttrs, controller) {
                        }
                    };
                }
            };
        })
        .directive('grid', function() {
            return {
                restrict: 'E',
                scope: {
                    break: '=break',
                    source: '=source'
                },
                controller: function($scope) {
                    var total = Math.ceil($scope.source.length / $scope.break);
                    $scope.data = new Array(total);
                    for (var i = 0; i < total; ++i) {
                        $scope.data[i] = $scope.source.slice(i * $scope.break, (i + 1) * $scope.break);
                    }
                },
                template:
                        '<div class="ui grid">' +
                        '  <div class="row" ng-repeat="row in data">' +
                        '    <div class="column" ng-repeat="item in row">' +
                        '      <div class="ui segment">' +
                        '        {{item.name}}' +
                        '      </div>' +
                        '    </div>' +
                        '  </div>' +
                        '</div>',
                replace: true
            };
        });

