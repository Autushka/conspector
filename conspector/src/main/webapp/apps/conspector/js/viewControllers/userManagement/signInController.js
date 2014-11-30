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
viewControllers.controller('signInView', function($scope, $state, $rootScope, dataSrv, $modal, globalSrv) {
	$scope.userNameTE = jQuery.i18n.prop('signInView.userNameTE');
	$scope.loginTE = jQuery.i18n.prop('signInView.loginTE');
	$scope.passwordTE = jQuery.i18n.prop('signInView.passwordTE');
	$scope.forgotPasswordTE = jQuery.i18n.prop('signInView.forgotPasswordTE');
	$scope.createUserTE = jQuery.i18n.prop('signInView.createUserTE');

	$rootScope.viewTitleTE = jQuery.i18n.prop('signInView.viewTitleTE');

	$scope.viewData = {
		userName: "",
		password: ""
	};

	$scope.login = function() {
		var oData = {
			userName: $scope.viewData.userName,
			password: CryptoJS.SHA512($scope.viewData.password).toString()
		};
		var oSignInSrv = dataSrv.httpRequest("jsp/account/login.jsp", oData, "POST", true);
		oSignInSrv.then(function(oData) {
			var bNoErrorMessages = globalSrv.messagesHandler(oData.messages);
			if (bNoErrorMessages) {
				var oGetProfileSrv = dataSrv.httpRequest("jsp/account/getProfileData.jsp", {});
				oGetProfileSrv.then(function(oData) {
					$scope.globalData.userRoles = [];
					
					globalSrv.setUserRoles($scope, oData[0].usersRolesRelations);
					
					if ($scope.globalData.userRoles.length > 1) {
						$scope.selectRole($rootScope);
					}
					if ($scope.globalData.userRoles.length === 1) {
						$scope.globalData.userRole = $scope.globalData.userRoles[0].description;

						var oSetCurrentRoleSrv = dataSrv.httpRequest("jsp/account/setCurrentRole.jsp", {
							role: $scope.globalData.userRole
						}, "POST");
						oSetCurrentRoleSrv.then();

						globalSrv.setMenus($scope.globalData.userRole, $rootScope);
						//window.location.href = globalSrv.getRoleInitialView($scope.globalData.userRole);
						window.location.href = globalSrv.getRoleInitialView($scope.globalData.userRole);
						//window.location.href = "#/app/deficienciesList";//"#/app/deficienciesList";

					}
					if ($scope.globalData.userRoles.length === 0) {
						noty({
							text: jQuery.i18n.prop('signInView.userLockedTE'),
							type: 'error',
							layout: CONSTANTS.messageDisplayLayout,
							timeout: CONSTANTS.messageDisplayTime
						});
						return;
					}
					$scope.globalData.userName = $scope.viewData.userName;
				});
			}
		});
	};

	$scope.passwordFldKeyDown = function(event) {
		if (event.keyCode === 13) {
			$("#passwordFld").blur();
			this.login();
		}
	};

	$scope.onSignInClick = function() {
		this.login();
	};
});
