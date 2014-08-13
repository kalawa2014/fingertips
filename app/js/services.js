'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('myApp.services', ['ngResource'])
        .factory('Slide', function($resource){
            return $resource (server+'api/slides/:Id',{},{
			'query': {method: 'GET', isArray: true,
				headers: {
					'Content-Type': 'application/json'
				}
			}});
		})
       .factory ('Activity',  function($resource){  
            return  $resource(server+'api/activities/:keyboard',{},{
			'query': {method: 'GET', isArray: true,
				headers: {
					'Content-Type': 'application/json'
				}
			}});
        }) 
        .factory ('OneActivity',  function($resource ){  
            return $resource (server+'api/activity/:idActivity',{
                query: {method: 'GET', isArray:false}
            });
        })   
       .factory ('PictureAct',  function($resource ){  
            return $resource (server+'api/picact/:idActivity',{
                query: {method: 'GET', isArray:true}
            });
        })
        .factory ('SomeProducts',  function($resource){  
            return  $resource(server+'api/products/:idActivity',{
                    query: {method: 'GET', isArray:true}
            });
        })
        .factory ('SomeRDVProducts',  function($resource){  
            return  $resource(server+'api/rdv/:idActivity',{
                    query: {method: 'GET', isArray:true}
            });
        })
;
//
    var server="http://localhost/fingertips/app/";
            ////"http://andrekalawa.com/keyboard/";