'use strict';

/* Controllers */
angular.module('myApp.controllers', ['ngResource', 'ui.bootstrap'])
        .controller('SliderController', ['$scope', 'Slide',
            function($scope, Slide) {
                $scope.images = Slide.query();
            }])
        .controller('ActivityController', ['$scope', '$routeParams', 'Activity', '$filter','$rootScope',
            function($scope, $routeParams, Activity,$rootScope) {
                $scope.items = Activity.query({keyboard: $routeParams.keyboard});
                $rootScope.$broadcast("ActivitiesSetListEvent", {items: $scope.items});
            }])
        .controller('ServicesListController', ['$scope', '$routeParams', '$filter', 'Activity', '$location','$timeout','$rootScope',
            function($scope, $routeParams, $filter, Activity, $location,$timeout,$rootScope) {
                //$scope.items = [{"id": "1", "name": "Restaurant Kapi", "details": "Ce restaurante fdkfsdfsdf\ndsfsdfsdf", "keyboard": "A", "type": "Ambiance"}, {"id": "3", "name": "Restaurant du Lys", "details": "bla vladasdfq\nfdqf\nsd\nfsd\nfqfq", "keyboard": "A", "type": "Ambiance"}];
                $scope.items = Activity.query({keyboard: $routeParams.keyboard});
				
				$timeout(function () {
					var path="img/keyboard/";
					if($scope.items.length>0)
						$scope.path = path+$scope.items[0].type+".png"
					},1000);
                //alert((typeof ($scope.items) !== 'undefined') + " " + $scope.items.length);
                if ((typeof ($scope.items) !== 'undefined')) {
                    $scope.itemsPerPage = 4;
                    $scope.currentPage = 0;
                    $rootScope.$broadcast("CurrenValsEvent", {currentPage: $scope.currentPage, tailleItems: $scope.items.length, keyboard: $routeParams.keyboard});
                    $scope.numberOfPages = function() {
                        return Math.ceil($scope.items.length / $scope.itemsPerPage);
                    };
                    $scope.setPage = function() {
                        $scope.currentPage = this.n;
                        index = 0;
                    };
                    $scope.prevPage = function() {
                        if ($scope.currentPage > 0) {
                            $scope.currentPage--;
                            $rootScope.$broadcast("CurrenValsEvent", {currentPage: $scope.currentPage, tailleItems: $scope.items.length, keyboard: $routeParams.keyboard});
                        }
                    };

                    $scope.pageCount = function() {
                        return Math.ceil($scope.items.length / $scope.itemsPerPage) - 1;
                    };

                    $scope.nextPage = function() {
                        //alert($scope.currentPage+" "+$scope.pageCount());
                        if ($scope.currentPage < $scope.pageCount()) {
                            $scope.currentPage++;
                            $rootScope.$broadcast("CurrenValsEvent", {currentPage: $scope.currentPage, tailleItems: $scope.items.length, keyboard: $routeParams.keyboard});
                        }
                    };


                    $scope.$root.$on("PagesEvent", function(event, args) {
                        //alert("PagesEvent");
                        if (args.method === 'nextPage')
                            $scope.nextPage();
                        else
                            $scope.prevPage();

                    });
                    $scope.$root.$on("RouteDetailsEvent", function(event, args) {

                        //alert(args.indSelect);
                        //alert($scope.items);
                        if ($scope.items.length > args.indSelect && $scope.items[args.indSelect] !== 'undefined' && $scope.items !== 'undefined') {
                            var idActivity = $scope.items[args.indSelect].id;
                            //alert("RouteDetailsEventvv "+$scope.indSel+"  "+args.currentPage+" "+idActivity);
                            //$scope.$root.$broadcast("ActivitiesDtlsEvent", {annimation: Out});
							$("#divAct").addClass("animated bounceOutRight");
                            $location.path("/detailsactivities/" + idActivity);
                        }
                    });

                }
            }
        ])
        .controller('AnyKeyPressedEventCtrl', ['$scope', '$location', '$modal','$rootScope',
            function($scope, $location, $modal,$rootScope) {
                //var pressedKey = $event.type;
                $scope.menuIndex = 0;
                $scope.onKeyPress = function($event) {
                    //alert("onKeyPress " + $event.keyCode);
                    var KeyCode = [8, 13, 37, 38, 39, 40, 49, 50, 51, 52, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100];
                    if (KeyCode.indexOf($event.keyCode) >= 0)
                    {
                        // une touche est apuyer
                        //alert("onKeyPress " + $event.keyCode + " DocumentURL " + document.URL);
                        clearTimeout($scope.veille);
                        $rootScope.$broadcast("VeilleEvent", {location: $location});

                        if ((document.URL + "").search("/slides") >= 0 && $event.keyCode < 91 && $event.keyCode > 64)
                        {
                            //Redirect from slides to Activities page
                            var charP = String.fromCharCode($event.keyCode);
                            $location.path("/activities/" + charP);
                        }
                        else
                        if ((document.URL + "").search("/activities") >= 0)
                        {
                            var charP = String.fromCharCode($event.keyCode);
                            //alert("onKeyPress " + charP + "  " + $event.keyCode+" "+(document.URL + "").charAt(document.URL.length - 1).toUpperCase());
                            if ((document.URL + "").charAt(document.URL.length - 1).toUpperCase() !== charP &&  $event.keyCode!=40 &&$event.keyCode!=38  )
                            {//if is not the same touch
                                //alert(' onKeyPress currentPage '+$scope.currentPage+" "+$event.keyCode);
                                //$scope.$root.$broadcast("PagesEvent", { method: "nextPage"});
                                $scope.RouteForActivityList($event.keyCode);
                            }
                        }
                        else if ((document.URL + "").search("/detailsactivities/") >= 0) {
                            //var charP = String.fromCharCode($event.keyCode);
                            //alert("onKeyPress detailsactivities" + $event.keyCode );
                            var idActivity = (document.URL + "").charAt(document.URL.length - 1).toUpperCase()
                            if (($event.keyCode) === 37)
                            {
                                //var keyboard=
                                if ($scope.keyboard === undefined)
                                    $scope.keyboard = 'A';
                                $location.path("/activities/" + $scope.keyboard);
                            }
                            $scope.RouteForDtsActivity($event.keyCode);
                        }
                        else if ((document.URL + "").search("/products/") >= 0) {
                            //alert($event.keyCode);
                            var k = [27, 37, 38, 39, 40, 13, 8];
                            if (k.indexOf($event.keyCode) >= 0) {
                                $rootScope.$broadcast('ngGridEventData', {touch: $event.keyCode, location: $location, modal: $modal})
                            }
                        }
                        else if ((document.URL + "").search("/rdv/") >= 0) {
                            //alert($event.keyCode);
                            var k = [27, 37, 39, 40, 13];
                            if (k.indexOf($event.keyCode) >= 0) {
                                $rootScope.$broadcast('ngGridEventDataRDV', {touch: $event.keyCode, location: $location, modal: $modal})
                            }
                        }
//ngGridEventData
//ngGridEventDataRDV
                    }
                };
                $scope.RouteForActivityList = function($keyevent) {
                    var charP;
                    switch ($keyevent) {

                        case 97:
                        case 98:
                        case 99:
                        case 100:
                            charP = String.fromCharCode($keyevent - 48);
                        case 49:
                        case 50:
                        case 51:
                        case 52:
                            {//Utilisation du pavet numerique
								charP = String.fromCharCode($keyevent );
                                //alert("chr "+charP+" ke "+$keyevent+" "+$scope.currentPage);
                                $scope.indSel = $scope.currentPage * 4 + parseInt(charP) - 1;
                                //alert(" RouteForActivityList"+$scope.indSel+" "+parseInt(charP));
                                $rootScope.$broadcast("RouteDetailsEvent", {currentPage: $scope.currentPage, indSelect: $scope.indSel});
                                break;
                            }
                        case 39:
                            {

                                $rootScope.$broadcast("PagesEvent", {method: "nextPage"});
                                break;
                            }
                        case 37:
                            {
                                $rootScope.$broadcast("PagesEvent", {method: "prevPage"});
                                break;
                            }

                        default:
                            var charP = String.fromCharCode($keyevent);
                            $location.path("/activities/" + charP);
                    }
                };

                $scope.RouteForDtsActivity = function($keyevent) {
                    //alert("RouteForDtsActivity " + $keyevent);
                    if ($keyevent === 13) {
                        $rootScope.$broadcast("RouteMenuEvent", {menuIndex: $scope.menuIndex, key: "null"});
                    } else if ($keyevent === 38) {
                        $rootScope.$broadcast("RouteMenuEvent", {menuIndex: 1, key: "up"});
                        $scope.menuIndex++;
                    } else if ($keyevent === 40) {
                        $rootScope.$broadcast("RouteMenuEvent", {menuIndex: 1, key: "down"});
                        $scope.menuIndex++;
                    }
                };
                $rootScope.$on("CurrenValsEvent", function(event, args) {
                    //alert(" CurrenValsEvent "+args.currentPage);
                    $scope.currentPage = args.currentPage;
                    $scope.tailleItems = args.tailleItems;
                    $scope.keyboard = args.keyboard;
                });
                $rootScope.$on("VeilleEvent", function(event, args) {
					//console.log(event, timeoutVeille);
                    $scope.veille = setTimeout(function() {
						//console.log(timeoutVeille, args);
                        $location.path("/slides").replace();$scope.$apply()
                    }, timeoutVeille);
                });
            }])
        .controller('PictureActController', ['$scope', '$routeParams', 'PictureAct',
            function($scope, $routeParams, PictureAct) {
                //$scope.pictures =[{"path":"img\/img_a_1_1","id_activity":"1","id_product":null,"type_activity":null},{"path":"img\/img_a_1_2","id_activity":"1","id_product":null,"type_activity":null},{"path":"img\/qrcode_a_1","id_activity":"1","id_product":null,"type_activity":null}];
                //$scope.pictures = PictureAct.query();

            }])
        .controller('ActivityDtlsController', ['$scope', '$routeParams', 'OneActivity', '$location','$timeout',
            function($scope, $routeParams, OneActivity, $location,$timeout) {
                $scope.activity = OneActivity.get({idActivity: $routeParams.idActivity});
                //RouteMenuEvent
				$timeout(function () {
						var path="img/keyboard/";
						$scope.path = path+$scope.activity.type+".png"
					},1000);
   
                $scope.menuIndex = 0;
                $scope.$root.$on("RouteMenuEvent", function(event, args) {
                    //alert("RouteMenuEvent"+args);
                    if (args.menuIndex === 0 && $scope.menuIndex === 0) {
                        $scope.dynamicPopover = "Utiliser les flêches pour selectionner";
                    }
                    else if (args.key === "up")
                    {
                        $scope.menuIndex -= 1;
                        if ($scope.menuIndex <= 0)
                            $scope.menuIndex = 2;
                    }
                    else if (args.key === "down")
                    {
                        $scope.menuIndex += 1;
                        if ($scope.menuIndex > 2)
                            $scope.menuIndex = 1;
                    } else if (args.key === "null") {
                        switch ($scope.menuIndex) {
                            case 1 :
                                $location.path("/products/" + $routeParams.idActivity);
                                break;
                            case 2 :
                                $location.path("/rdv/" + $routeParams.idActivity);
                                break;
                        }
                        //$location
                    }
                    ;
                    $scope.isSelectM1 = $scope.isSelect(1);
                    $scope.isSelectM2 = $scope.isSelect(2);
                    $scope.isSelectM3 = $scope.isSelect(3);
                    //alert($scope.menuIndex+" "+$scope.isSelectM1);

                });
                $scope.isSelect = function(id) {
                    return ($scope.menuIndex === id);
                };

            }])
        .controller('ProductsListController', ['$scope', '$routeParams', '$modal', '$log', '$location', 'SomeProducts',
            function($scope, $routeParams, $modal, $log, $location, SomeProducts) {
                $scope.products = SomeProducts.query({idActivity: $routeParams.idActivity});
                $scope.products = [{"id": "1", "name": "Repas de Midi", "details": "Menu \u00e0 10\u20ac", "price": "10", "qrcode": "img\/activities\/qrcode_p_1.png", "images": [{"path": "img\/activities\/img_p_1_1.png"}, {"path": "img\/activities\/qrcode_p_1.png"}]}, {"id": "2", "name": "Buffet", "details": "Repas du soir et les week end \u00e0 25\u20ac", "price": "25", "qrcode": "img\/activities\/qrcode_p_2.png", "images": [{"path": "img\/activities\/qrcode_p_2.png"}]}];
                $scope.mySelections = [];
                $scope.totalPrice = 0;
                $scope.indexSel = 0;
                $scope.gridOptions = {
                    data: 'products',
                    selectedItems: $scope.mySelections,
                    //showSelectionCheckbox: true,
                    showFooter: true,
//                    footerTemplate: '<div class="ngTotalSelectContainer" >        <div class="ngFooterTotalItems"  > <span class="ngLabel">Total :   {{totalPrice}} €</span>        </div>        <div class="ngFooterSelectedItems" ng-show="multiSelect">           <span class="ngLabel">Nombre d\'articles sélectionnés {{selectedItems.length}}</span></div> </div>',

                    footerTemplate: '<div class="total" >        <div class=""  > <span class="ngLabel">Total :   {{totalPrice}} €</span>        </div>        <div class="ngFooterSelectedItems" ng-show="multiSelect">           <span class="ngLabel">Nombre d\'articles sélectionnés {{selectedItems.length}}</span></div> </div>',
                    headerClass: 'headerStyle',
                    multiSelect: true,
                    rowHeight: '45',
                    afterSelectionChange: function(theRow, evt) {
                        //alert(theRow.name);
                        $scope.totalPrice = 0;
                        $scope.selectedIDs = [];
                        $scope.imagesProduits = [];
                        angular.forEach($scope.mySelections, function(item) {
                            //alert(item.id);
                            $scope.totalPrice += parseInt(item.price);
                            $scope.selectedIDs.push(item.id);
                            //$scope.qrcodeProduit=item.qrcode;
                            $scope.imagesProduits = item.images;
                            $scope.nomProduit = item.name;
                        });
                    },
                    columnDefs: [{
                            field: 'name',
                            displayName: 'Produit',
                            cellTemplate: 'partials/productsTemplate.html'
                        },
                        {
                            field: 'price',
                            displayName: 'Prix',
                            cellTemplate: 'partials/priceTemplate.html'
                        }
                    ]
                };
                //ngGridEventData gets emitted after all functions in watch for data changes 
                $scope.isValidate = false;
                $scope.$root.$on('ngGridEventData', function(event, args) {
                    var k = [38, 40];
                    //alert($scope.indexSel);
                    if ($scope.mySelections.length === 0 && k.indexOf(args.touch) >= 0) {
                        $scope.indexSel = 0;
                        $scope.gridOptions.selectItem($scope.indexSel, true);
                    }
                    else if (args.touch === 39) {
                        $scope.isValidate = true;
                    }
                    else if (args.touch === 8) {//Tab
                        //alert($scope.indexSel);
                        $scope.isValidate = false;
                        $scope.gridOptions.selectItem($scope.indexSel, $scope.isValidate);
                    }
                    else if (args.touch === 38) {
                        $scope.gridOptions.selectItem($scope.indexSel, $scope.isValidate);
                        $scope.indexSel--;
                        if ($scope.indexSel < 0)
                            $scope.indexSel = $scope.products.length - 1;
                        $scope.gridOptions.selectItem($scope.indexSel, true);
                    } else if (args.touch === 40) {
                        $scope.gridOptions.selectItem($scope.indexSel, $scope.isValidate);
                        $scope.indexSel++;
                        if ($scope.indexSel >= $scope.products.length)
                            $scope.indexSel = 0;
                        $scope.gridOptions.selectItem($scope.indexSel, true);
                    }
                    else if (args.touch === 13) {
                        //args.location.path("/users");
                        $scope.open(args.modal);
                    }
                    else if (args.touch === 37) {
                        //alert("rootParams.IdActivities "+$routeParams.idActivity.substring(1));
                        args.location.path("/detailsactivities/" + $routeParams.idActivity);
                    }
                    //alert($scope.indexSel);

                    //$scope.gridOptions.selectRow(0, true);
                });
                $scope.open = function(modal) {

                    var modalInstance = modal.open({
                        templateUrl: 'partials/modalUser.html',
                        controller: ModalInstanceCtrl1
                    });

                    modalInstance.result.then(function(selectedItem) {
                        $scope.selected = selectedItem;
                    }, function() {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };

            }])
        .controller('RDVController', ['$scope', '$routeParams', '$modal', 'SomeRDVProducts',
            function($scope, $modal, $routeParams, SomeRDVProducts) {
                $scope.productsrdv = SomeRDVProducts.query({idActivity: $routeParams.idActivity});
                //$scope.products = [{"id": "1", "name": "Repas de Midi", "details": "Menu \u00e0 10\u20ac", "price": "10", "qrcode": "img\/activities\/qrcode_p_1.png", "images": [{"path": "img\/activities\/img_p_1_1.png"}, {"path": "img\/activities\/qrcode_p_1.png"}]}, {"id": "2", "name": "Buffet", "details": "Repas du soir et les week end \u00e0 25\u20ac", "price": "25", "qrcode": "img\/activities\/qrcode_p_2.png", "images": [{"path": "img\/activities\/qrcode_p_2.png"}]}];
                $scope.mySelections = [];
                $scope.totalPrice = 0;
                $scope.indexSel = 0;
                $scope.gridOptionsRDV = {
                    data: 'productsrdv',
                    selectedItems: $scope.mySelections,
                    //showSelectionCheckbox: true,
                    showFooter: true,
                    //footerTemplate: '<div class="ngTotalSelectContainer" >        <div class="ngFooterTotalItems"  > <span class="ngLabel">Total :   {{totalPrice}} €</span>        </div>        <div class="ngFooterSelectedItems" ng-show="multiSelect">           <span class="ngLabel">Nombre d\'articles sélectionnés {{selectedItems.length}}</span></div> </div>',
                    multiSelect: false,
                    rowHeight: '45',
                    afterSelectionChange: function(theRow, evt) {
                        //alert(theRow.id);
                        $scope.totalPrice = 0;
                        $scope.selectedIDs = [];
                        $scope.imagesProduits = [];
                        angular.forEach($scope.mySelections, function(item) {
                            //$scope.totalPrice += parseInt(item.price);
                            $scope.selectedIDs.push(item.id);
                            $scope.qrcodeProduit = item.qrcode;
                            $scope.imagesProduits = item.images;
                            $scope.nomProduit = item.name;
                        });
                    },
                    columnDefs: [{
                            field: 'name',
                            displayName: 'Products',
                            //cellTemplate: 'partials/productsTemplate.html'
                        },
                        {
                            field: 'details',
                            displayName: 'Description',
                            //cellTemplate: 'partials/detailsTemplate.html'
                        }
                    ]
                };
                //ngGridEventData gets emitted after all functions in watch for data changes 
                $scope.isValidate = false;
                $scope.$root.$on('ngGridEventDataRDV', function(event, args) {
                    var k = [38, 40];
                    //alert($scope.indexSel);
                    if ($scope.mySelections.length === 0 && k.indexOf(args.touch) >= 0) {
                        $scope.indexSel = 0;
                        $scope.gridOptions.selectItem($scope.indexSel, true);
                    }
                    else if (args.touch === 38) {
                        $scope.gridOptions.selectItem($scope.indexSel, false);
                        $scope.indexSel--;
                        if ($scope.indexSel < 0)
                            $scope.indexSel = $scope.products.length - 1;
                        $scope.gridOptions.selectItem($scope.indexSel, true);
                    } else if (args.touch === 40) {
                        $scope.gridOptions.selectItem($scope.indexSel, false);
                        $scope.indexSel++;
                        if ($scope.indexSel >= $scope.products.length)
                            $scope.indexSel = 0;
                        $scope.gridOptions.selectItem($scope.indexSel, true);
                    }
                    else if (args.touch === 13) {
                        //args.location.path("/users");
                        $scope.open(args.modal);
                    }
                    else if (args.touch === 37) {
                        //alert("rootParams.IdActivities "+$routeParams.idActivity.substring(1));
                        args.location.path("/detailsactivities/" + $routeParams.idActivity);
                    }
                    //alert($scope.indexSel);

                    //$scope.gridOptions.selectRow(0, true);
                });
                $scope.open = function(modal) {

                    var modalInstance = modal.open({
                        templateUrl: 'partials/modalUser.html',
                        controller: ModalInstanceCtrl1
                    });

                    modalInstance.result.then(function(selectedItem) {
                        $scope.selected = selectedItem;
                    }, function() {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };

            }])
        .controller('ModalInstanceCtrl', ['$scope', '$modalInstance',
            function($scope, $modalInstance) {

            }])
        .controller('AdminSlideCtrl', ['$scope',
            function($scope) {
                /*    $scope.onFileSelect = function($files) {
                 //$files: an array of files selected, each file has name, size, and type.
                 for (var i = 0; i < $files.length; i++) {
                 var file = $files[i];
                 $scope.upload = $upload.upload({
                 url: 'api/upload.php', //upload.php script, node.js route, or servlet url
                 method: 'POST',
                 headers: {'header-key': 'header-value'},
                 //withCredentials: true,
                 data: {myObj: $scope.myModelObj},
                 file: file, // or list of files ($files) for html5 only
                 //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
                 // customize file formData name ('Content-Desposition'), server side file variable name. 
                 //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
                 // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
                 //formDataAppender: function(formData, key, val){}
                 }).progress(function(evt) {
                 console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                 }).success(function(data, status, headers, config) {
                 // file is uploaded successfully
                 console.log(data);
                 });
                 //.error(...)
                 //.then(success, error, progress); 
                 // access or attach event listeners to the underlying XMLHttpRequest.
                 //.xhr(function(xhr){xhr.upload.addEventListener(...)})
                 }
                 /* alternative way of uploading, send the file binary with the file's content-type.
                 Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
                 It could also be used to monitor the progress of a normal http post/put request with large data
                 $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
                 };*/
                $scope.setFiles = function(element) {
                    $scope.$apply(function($scope) {
                        //console.log('files:', element.files);
                        // Turn the FileList object into an Array
                        $scope.files = [];
                        for (var i = 0; i < element.files.length; i++) {
                            $scope.files.push(element.files[i]);
                        }
                        $scope.progressVisible = false;
                    });
                };

                $scope.uploadFile = function() {
                    var fd = new FormData()
                    for (var i in $scope.files) {
                        fd.append("uploadedFile", $scope.files[i])
                    }
                    var xhr = new XMLHttpRequest()
                    xhr.upload.addEventListener("progress", uploadProgress, false)
                    xhr.addEventListener("load", uploadComplete, false)
                    xhr.addEventListener("error", uploadFailed, false)
                    xhr.addEventListener("abort", uploadCanceled, false)
                    xhr.open("POST", "/fileupload")
                    $scope.progressVisible = true
                    xhr.send(fd)
                }

                $scope.uploadProgress= function (evt) {
                    $scope.$apply(function() {
                        if (evt.lengthComputable) {
                            $scope.progress = Math.round(evt.loaded * 100 / evt.total)
                        } else {
                            $scope.progress = 'unable to compute'
                        }
                    })
                }

                $scope.uploadComplete=function(evt) {
                    /* This event is raised when the server send back a response */
                    alert(evt.target.responseText)
                }

                $scope.uploadFailed=function(evt) {
                    alert("There was an error attempting to upload the file.")
                }

                $scope.uploadCanceled= function(evt) {
                    $scope.$apply(function() {
                        $scope.progressVisible = false
                    })
                    alert("The upload has been canceled by the user or the browser dropped the connection.")
                }
            }]);

//
var ModalInstanceCtrl1 = function($scope, $modalInstance) {
    $scope.ok = function() {
        $modalInstance.close($scope.selected.item);
        alert("En construction");
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
};

//ctrlRead.$inject = ['$scope', '$filter'];

var timeoutVeille = 10000 * 120; //10 sec * 120=2min
var server = "http://localhost/dev/api/";