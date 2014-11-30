/*
 * #%L
 * ProjectX2013_03_23_web
 * %%
 * Copyright (C) 2013 - 2014 Powered by Sergey
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */
angular.module('customControls', [])

	.directive('staticInclude', function($http, $templateCache, $compile) {
	    return function(scope, element, attrs) {
	        var templatePath = attrs.staticInclude;
	        $http.get(templatePath, { cache: $templateCache }).success(function(response) {
	            var contents = element.html(response).contents();
	            $compile(contents)(scope);
	        });
	    };
	})
	.directive('stPhotoGallery', function() {
		return {
			restrict: 'E',
			scope: true,
			controller: function($scope, $rootScope) {
				var IMAGE_WIDTH = 400;
				$scope.stopPropagation = function($event) {
					$event.stopPropagation();
				};
				$scope.scrollTo = function(image, ind) {
					$rootScope.galleryListPosition = {
						left: (IMAGE_WIDTH * ind * -1) + "px"
					};
					$rootScope.selectedPhotoID = image.image;
					$rootScope.selectedPhoto = image;
				};
			},
			templateUrl: 'controls/stPhotoGallery.html',
		};
	})

.directive('stPlayBack', function() {
	return {
		restrict: 'E',
		link: function($scope, $element, $attr) {

			var sTemplte = '<object width=' + $attr.stWidth + ' height=' + $attr.stHeight + ' >';
			sTemplte = sTemplte + '<param name="movie" value="http://fpdownload.adobe.com/strobe/FlashMediaPlayback.swf" onError="onError()">';
			sTemplte = sTemplte + '</param>';
			sTemplte = sTemplte + '<param name="flashvars" value="src=' + $scope.streamPath + '&expandedBufferTime=0.1&autoPlay=true">';
			sTemplte = sTemplte + '</param>';
			sTemplte = sTemplte + '<param name="allowFullScreen" value="true">';
			sTemplte = sTemplte + '</param>';
			sTemplte = sTemplte + '<param name="allowscriptaccess" value="always">';
			sTemplte = sTemplte + '</param>';
			sTemplte = sTemplte + '<param name="wmode" value="direct">';
			sTemplte = sTemplte + '</param>';
			sTemplte = sTemplte + '<embed src="http://fpdownload.adobe.com/strobe/FlashMediaPlayback.swf" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="direct" width="470" height="320" flashvars="src=' + $attr.stSrc + '&expandedBufferTime=0.1&autoPlay=true">';
			sTemplte = sTemplte + '</embed>';
			sTemplte = sTemplte + '</object>';
			$element.replaceWith(sTemplte);
		}
	};
	})
	
//	.directive('fixedTableHeaders', ['$timeout', function($timeout){
//		return{
//			restrict: 'A',
//			link: function(scope, element, attrs){
//            $timeout(function () {
//               //element.stickyTableHeaders();
//            	$("#" + element.attr("id")).stickyTableHeaders();
//            }, 0);				
//			}
//		};
//	}])
	
    .directive('ngThumb', ['$window', function($window) {
   var helper = {
         support: !!($window.FileReader && $window.CanvasRenderingContext2D),
         isFile: function(item) {
             return angular.isObject(item) && item instanceof $window.File;
         },
         isImage: function(file) {
             var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
             return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
         }
     };

     return {
         restrict: 'A',
         template: '<canvas/>',
         link: function(scope, element, attributes) {
             if (!helper.support) return;

             var params = scope.$eval(attributes.ngThumb);

             if (!helper.isFile(params.file)) return;
             if (!helper.isImage(params.file)) return;

             var canvas = element.find('canvas');
             var reader = new FileReader();

             reader.onload = onLoadFile;
             reader.readAsDataURL(params.file);

             function onLoadFile(event) {
                 var img = new Image();
                 img.onload = onLoadImage;
                 img.src = event.target.result;
             }

             function onLoadImage() {
                 var width = params.width || this.width / this.height * params.height;
                 var height = params.height || this.height / this.width * params.width;
                 canvas.attr({ width: width, height: height });
                 canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
             }
         }
     };}]);
// });