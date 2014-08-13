/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('myAdminApp.controllers', ['ngResource','angularFileUpload'])
.controller ('AdminSlideCtrl',['$scope', function ($scope) {
            $scope.setFiles = function(element) {
            $scope.$apply(function($scope) {
              console.log('files:', element.files);
              // Turn the FileList object into an Array
                $scope.files = [];
                for (var i = 0; i < element.files.length; i++) {
                  $scope.files.push(element.files[i]);
                }
              $scope.progressVisible = true;
              });
            };

            $scope.uploadFile = function() {
                var fd = new FormData();
                for (var i in $scope.files) {
                    fd.append("image", $scope.files[i])
                }
                fd.append("typeimage","slide");
                var xhr = new XMLHttpRequest()
                xhr.upload.addEventListener("progress", uploadProgress, false)
                xhr.addEventListener("load", uploadComplete, false)
                xhr.addEventListener("error", uploadFailed, false)
                xhr.addEventListener("abort", uploadCanceled, false)
                //alert("uploadFile");
                xhr.open("POST", "server/upload.php");
                $scope.progressVisible = true;
                xhr.send(fd);
            }

            function uploadProgress(evt) {
                $scope.$apply(function(){
                    if (evt.lengthComputable) {
                        $scope.progress = Math.round(evt.loaded * 100 / evt.total)
                    } else {
                        $scope.progress = 'unable to compute'
                    }
                })
            }

            function uploadComplete(evt) {
                /* This event is raised when the server send back a response */
                alert(evt.target.responseText)
            }

            function uploadFailed(evt) {
                alert("There was an error attempting to upload the file.")
            }

            function uploadCanceled(evt) {
                $scope.$apply(function(){
                    $scope.progressVisible = false
                })
                alert("The upload has been canceled by the user or the browser dropped the connection.")
            }
}])
.controller('AdminSlideCtrl', ['$scope', 'FileUploader', function($scope, FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
            url: 'server/uploadSlides.php',
        });

        // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

 
        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        //console.info('uploader', uploader);
    }])
.controller('DelSlidesCtrl', ['$scope',  'SlideAdmin', function($scope,  SlideAdmin) {
        $scope.slides=SlideAdmin.query();
		
        $scope.removeSlide=function ( index){
			var id= $scope.slides[index].id;
            SlideAdmin.delete({'Id': id});
			$scope.slides.splice( index,1);
        }
}])
.controller('AdminCharteCtrl', ['$scope','FileUploader', function($scope,FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
            url: 'server/uploadChartes.php',
        });
  	       // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

 
        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
 
	}
])
.controller('AdminCharteCtrlB', ['$scope','FileUploader', function($scope,FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
            url: 'server/uploadChartesB.php',
        });
  	       // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

 
        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
 
	}
])
.controller('AdminCharteCtrlM', ['$scope','FileUploader', function($scope,FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
            url: 'server/uploadChartesM.php',
        });
  	       // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

 
        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
 
	}
])
.controller('AdminCharteCtrlT1', ['$scope','FileUploader', function($scope,FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
            url: 'server/uploadChartesTB1.php?imgname=bandeau6.jpg',
        });
  	       // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

 
        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
 
	}
])
.controller('AddActivityController', ['$scope','FileUploader', 'ActivityAdmin','$location','$routeParams',function($scope, FileUploader,ActivityAdmin,$location,$routeParams) {
    
		var uploader = $scope.uploader = new FileUploader({
            url: 'server/uploadPictures.php?id='+$routeParams.id,
        });
		var uploader1 = $scope.uploader1 = new FileUploader({
            url: 'server/uploadPictures.php?id='+$routeParams.id+"&qrcode=1",
        }); 
		$scope.activity = {"id":"-1"};
		$scope.createActivity=function(){
			$scope.activity.id_user="0";
			//console.dir($scope.activity);
			ActivityAdmin.save($scope.activity, function(data){
				$scope.activity.id=data.id;
				//console.dir($scope.activity);
				$location.path( "/addActFile/"+data.id);
			}, function(erno){
				//console.dir(erno);
			});
			//console.log(succVal);
			/*.success(function(data){
			console.log(data);
			}).error(function(data){
			    console.log(data);
			});*/
		}
		$scope.openAddActFile=function(){
			if($scope.activity.id!=-1){
				$location.path( "#/addActFile/");
			}
		}
		$scope.createActivitya=function (){
			$http({
				method : 'POST',
				url : server+'activity',
				data : $scope.activity,
				headers: {'contentType': 'application/json'}				
			})
			.success(function(data) {
				console.log(data);
			})
			.error(function() {
				console.log( "Failure");
			})
			alert("activity "+ $scope.activity.name);
		}
  	       // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

 
        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll '+uploader.progress);
			if(uploader.progress===100)
				$location.path( "/delActivites/");
        };

        console.info('uploader', uploader);


 
	}
]).controller('DelActiviteCtrl', ['$scope','Activity', function($scope,Activity) {

	$scope.activities= Activity.query();
	$scope.removeActivity= function(index, id){
		Activity.delete({keyboard:id}, function(data){
			 $scope.activities.splice(index, 1);
			//console.dir(data);
		},function(erno){
			//console.dir(erno);
		});
	}
//DelUsersCtrl
}
]).controller('LoginController', ['$scope','$location','User','UserService', function($scope,$location,User,UserService) {
	$scope.message="";
	$scope.user={};
	$scope.UserService = UserService;
	$scope.connect=function(){//:login/:pass
			User.query({login:$scope.user.login,pass:$scope.user.passws},
				function(data){
					//console.log(data);
					if(data.$resolved){
						console.log(data);
						UserService.isLogged = true;
						UserService.username = data.login;
						UserService.type= data.type;
						$location.path("/menu/");
					}
					else{
	
						UserService.isLogged = false;
						UserService.username = '';
						//console.log(data);
						$scope.message=data.msg;
		
					}
				},
				function(erno){

					//console.log(erno);
					UserService.isLogged= false;						
					UserService.username = '';
					$scope.message=erno.data.msg;
				} );
	
	}
	$scope.deconnect=function(){
		//console.log(UserService);
		UserService.isLogged=false;
		UserService.username="";
		$location.path("/login/");
	}
	$scope.routeMethods=function(){
		if(!UserService.isLogged){
			$location.path("/login/");
		}
	}
	$scope.goMenu=function(){
		$location.path("/menu/");
	}
}]).controller('DelUsersCtrl', ['$scope','User', function($scope,User) {
	$scope.users= User.get();
	$scope.removeUsers= function(index){
		Activity.delete({mail:$scope.users[index].mail}, function(data){
			 $scope.activities.splice(index, 1);
			//console.dir(data);
		},function(erno){
			//console.dir(erno);
		});
	}
//
}
]).controller('AddUsersCtrl', ['$scope','User', function($scope,User) {
	//$scope.users= User.query();
	$scope.addUser=function(){
	}
//
}
]);
 var server="http://localhost/fingertips/app/api/";
 //var ConnUser={login:"", mail:"", type:0};
//AdminCharteCtrl