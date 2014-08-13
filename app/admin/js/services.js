/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('myAdminApp.services', ['ngResource'])
        .factory('SlideAdmin', function($resource){
            return $resource (server+'slides/:Id',{},{
			'query': {method: 'GET', isArray: true,
				headers: {
					'Content-Type': 'application/json'
				}
			},
			'delete': { method: 'DELETE',
							headers: {
					'Content-Type': 'application/json'
				},
				params: {Id: 'Id'} }            
			});
        })
		.factory('ActivityAdmin', function($resource){
            return $resource (server+'activity/:Id',{},{
			
				'query': {method: 'GET', isArray: true,
					headers: {
					'Content-Type': 'application/json'
					}
				},
				'save':{
				    method: 'POST', 
					headers:{
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;',
						'Accept': '*/*',
						
					}
				}
			})
        })
		.factory ('Activity',  function($resource){  
            return  $resource(server+'activities/:keyboard',{},{
			'query': {method: 'GET', isArray: true,
				headers: {
					'Content-Type': 'application/json'
				}
				},
			'delete':{
				    method: 'DELETE'
				}

			});
        }) 
		.factory ('User',  function($resource){  
            return  $resource(server+'admin/:login/:pass',{},{
			'query': {method: 'GET', isArray: false,
				headers: {
					'Content-Type': 'application/json'
				}
				},
			'get': {method: 'GET', isArray: true,
				headers: {
					'Content-Type': 'application/json'
				}
				}
				
			});
        }) 
		.factory('UserService', [function() {
			var sdo = {
				isLogged: false,
				username: '',
				type: 0
		};
	return sdo;
}])
		;
        
        
        
          var server="http://localhost/fingertips/app/api/";
 