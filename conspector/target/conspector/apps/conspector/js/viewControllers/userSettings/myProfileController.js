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
viewControllers.controller('myProfileView', function($scope, $rootScope, dataSrv, globalSrv, $window, $timeout) {
	$rootScope.viewTitleTE = jQuery.i18n.prop('userSettingsView.changeProfileSubviewTitleTE');
	$rootScope.viewTitleTECode = 'userSettingsView.changeProfileSubviewTitleTE';
	
	$scope.avatarType = "gravatar";
	$scope.isSelectAvatarOptionHidden = true;
	$scope.avatarPath = "";
	$scope.sUrl = "rest/file/list/user/" + $scope.globalData.userName + "/_avatar_";

	var refreshProfileData = function() {
		var oGetProfileDataSrv = dataSrv.httpRequest("jsp/account/getProfileData.jsp", {});
		oGetProfileDataSrv.then(function(aData) {
			$scope.oProfileData = aData[0];
			$scope.sProfileAvatarURL = CryptoJS.MD5($scope.oProfileData.email).toString();

			if ($scope.oProfileData.avatarFileId) {
				$scope.avatarType = "local";
				$scope.avatarPath = $window.location.origin + $window.location.pathname + "rest/file/get/";
				$rootScope.selectedPhotoID = $scope.oProfileData.avatarFileId;
			} else {
				$scope.avatarType = "gravatar";
				$scope.avatarPath = "img/noAvatar.jpg";
				$rootScope.selectedPhotoID = "";
			}

			switch ($scope.oProfileData.language) {
				case "en":
					$scope.communicationLn = $scope.communicationLns[0];
					break;
				case "fr":
					$scope.communicationLn = $scope.communicationLns[1];
					break;
			}
		});

		var oGetProfileAvatar = dataSrv.httpRequest($scope.sUrl, {});
		oGetProfileAvatar.then(function(aData) {
			if (aData.length > 1) {
				$scope.isSelectAvatarOptionHidden = false;
			}
		});

	};

	refreshProfileData();

	$scope.onSaveClick = function() {
		var oProfileDataForCommit = {};
		oProfileDataForCommit.email = $scope.oProfileData.email;
		oProfileDataForCommit.language = $scope.communicationLn.code;

		var saveProfileData = function() {
			var oChangeProfileDataSrv = dataSrv.httpRequest("jsp/account/changeProfileData.jsp", oProfileDataForCommit, "POST", true);
			oChangeProfileDataSrv.then(function(oData) {
				var bNoErrorMessages = globalSrv.messagesHandler(oData.messages);
				if (bNoErrorMessages) {
					$scope.sProfileAvatarURL = CryptoJS.MD5($scope.oProfileData.email).toString();
				}
			});
		};

//		if ($scope.file != undefined) {
//
//			var sUrl = "rest/file/upload/user/" + $scope.globalData.userName + "/_avatar_";
//			$scope.upload = $fileUploader.upload({
//				url: sUrl, // upload.php script, node.js route, or servlet url
//				method: "POST",// or PUT,
//				headers: {
//					'Content-Type': 'multipart/form-data'
//				},
//				// headers: {'header-key': 'header-value'},
//				// withCredentials: true,
//				data: {
//
//				},
//				file: $scope.file, // or list of files: $files for html5 only
//			/* set the file formData name ('Content-Desposition'). Default is 'file' */
//			// fileFormDataName: myFile, //or a list of names for multiple files (html5).
//			/* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
//			// formDataAppender: function(formData, key, val){}
//			}).progress(function(evt) {
//				// console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
//			}).success(function(data, status, headers, config) {
//				$scope.file = undefined;
//				var oGetProfileAvatar = dataSrv.httpRequest($scope.sUrl, {});
//				oGetProfileAvatar.then(function(aData) {
//					oProfileDataForCommit.avatarFileId = aData[aData.length - 1].rowId;
//
//					$scope.avatarPath = $window.location.origin + $window.location.pathname + "rest/file/get/";
//					$rootScope.selectedPhotoID = oProfileDataForCommit.avatarFileId;
//					saveProfileData();
//				});
//			});
//		} else {
//			oProfileDataForCommit.avatarFileId = $rootScope.selectedPhotoID;
//			if ($scope.avatarType === "gravatar") {
//				oProfileDataForCommit.avatarFileId = 0;
//				$scope.avatarPath = "";
//				$rootScope.selectedPhotoID = "img/noAvatar.jpg";
//			}
//			saveProfileData();
//		}

	};

	$scope.onSelectAvatar = function() {
		var sUrl = "rest/file/list/user/" + $scope.globalData.userName + "/_avatar_";
		var oGetProfileAvatar = dataSrv.httpRequest(sUrl, {});
		oGetProfileAvatar.then(function(aData) {
			$rootScope.galleryPhotosLocation = $window.location.origin + $window.location.pathname + "rest/file/get/";
			$scope.avatarPath = $window.location.origin + $window.location.pathname + "rest/file/get/";
			$rootScope.galleryData = [];
			for (var i = 0; i < aData.length; i++) {
				$rootScope.galleryData.push({
					image: aData[i].rowId
				});
			}
			$rootScope.selectedPhoto = $rootScope.galleryData[0];
			$rootScope.selectedPhotoID = $rootScope.galleryData[0].image;

			$rootScope.galleryListPosition = {
				left: "0px"
			};

			if (!$rootScope.isGalleryFadeAnimationOn) {
				$rootScope.isGalleryFadeAnimationOn = true;
				$timeout(function() {
					$rootScope.isGalleryHidden = false;
				}, 5);
			} else {
				$rootScope.isGalleryHidden = false;
			}
		});
	};

//	$scope.file = undefined;
//	$scope.onFileSelect = function($files) {
//		// $files: an array of files selected, each file has name, size, and type.
//		for (var i = 0; i < $files.length; i++) {
//			$scope.file = $files[i];
//
//			// .error(...)
//			// .then(success, error, progress);
//			// .xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to
//			// XMLHttpRequest.
//		}
//		/*
//		 * alternative way of uploading, send the file binary with the file's content-type. Could be used to upload files
//		 * to CouchDB, imgur, etc... html5 FileReader is needed. It could also be used to monitor the progress of a normal
//		 * http post/put request with large data
//		 */
//		// $scope.upload = $upload.http({...}) see 88#issuecomment-31366487 for sample code.
//	};

	$scope.onCancelClick = function() {
		refreshProfileData();
	};

});