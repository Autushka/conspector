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
viewControllers.controller('changePasswordView', function($scope, $rootScope, dataSrv, globalSrv) {
	$rootScope.viewTitleTE = jQuery.i18n.prop('userSettingsView.changePasswordSubviewTitleTE');
	$rootScope.viewTitleTECode = 'userSettingsView.changePasswordSubviewTitleTE';
	
	var refreshPasswordData = function() {
		$scope.oPasswordData = {oldPassword: "", newPassword: "", confirmedNewPassword: ""};
	};
	
	refreshPasswordData();
	
	$scope.onCancelPasswordClick = function() {
		refreshPasswordData();
	};	
	
	$scope.onSavePasswordClick = function() {
		if ($scope.oPasswordData.newPassword !== $scope.oPasswordData.confirmedNewPassword) {
			noty({
				text: jQuery.i18n.prop('changePasswordView.passwordsDontMatchTE'),
				type: 'error',
				layout: CONSTANTS.messageDisplayLayout,
				timeout: CONSTANTS.messageDisplayTime
			});
			return;
		}
		
		var oPasswordDataForCommit = {};
		oPasswordDataForCommit.oldPassword = CryptoJS.SHA512($scope.oPasswordData.oldPassword).toString();
		oPasswordDataForCommit.newPassword = CryptoJS.SHA512($scope.oPasswordData.newPassword).toString();		
		
		var oChangePasswordSrv = dataSrv.httpRequest("jsp/account/changeProfileData.jsp", oPasswordDataForCommit, "POST", true);
		oChangePasswordSrv.then(function(oData) {
			globalSrv.messagesHandler(oData.messages);
		});		
	};	

});