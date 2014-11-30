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
app.factory('dataSrv', function($http, $q, $rootScope) {
	return {
		aUsers: [],
		aRoles: [],
		httpRequest: function(sServicePath, oParams, sType, bShowBusyIndicator) {
			if(!sType){
				sType = "GET";
			}
			
			sContentType = 'application/x-www-form-urlencoded';
			var sData = "";

			var aParametersNames = [];
			var aParametersValues = [];
			
			for ( var param in oParams) {
				aParametersNames.push(param);
				aParametersValues.push(oParams[param]);
			}

			for (var i = 0; i < aParametersNames.length; i++) {
				sData = sData + aParametersNames[i] + "=" + aParametersValues[i];// + "&";
				if(i!==aParametersNames.length - 1){
					sData = sData + "&";
				}
			}
			var deffered = $q.defer();
			
			if(bShowBusyIndicator){
				$rootScope.$emit('LOAD');				
			}
			var oHttp = $http({
				url: sServicePath,
				method: sType,
				headers: {
					'Content-Type': sContentType
				},
				data: sData,
			});

			oHttp.success(function(oData, status, headers, config) {
				$rootScope.$emit('UNLOAD');
				deffered.resolve(oData);
			});

			oHttp.error(function(oData, status, headers, config) {
				$rootScope.$emit('UNLOAD');
				deffered.reject(oData);
				if (status === 401) {
					window.location.href = "#/signIn/";
					$scope.globalData.userName = jQuery.i18n.prop('mainView.guestTE');
				}
			});

			return deffered.promise;
		},
		
      getFakeData: function(fileName, bShowBusyIndicator){
			var deffered = $q.defer();
			
			if(bShowBusyIndicator){
				$rootScope.$emit('LOAD');				
			}			
         $http.get(fileName).
         success(function(data) {
				$rootScope.$emit('UNLOAD');         	
         	deffered.resolve(data);
             //callback(data);
         });
			return deffered.promise;
      },         

		ajaxRequest: function(sUrl, oData, bAsync, oEventHandeler, sRequestType) {
			if(!sRequestType){
				sRequestType = "POST";
			}
			$.ajax({
				type: sRequestType,
				async: bAsync,
				url: sUrl,
				data: oData,
				beforeSend: function() {
				},
				success: function(data) {
					if (oEventHandeler && oEventHandeler.onSuccess) {
						oEventHandeler.onSuccess(data);
					}
				},
				error: function(data) {
					if (oEventHandeler && oEventHandeler.onError) {
						oEventHandeler.onError(data);
					}
				}
			});
		},
	};
});

app.factory('globalSrv', function($http, $q, $rootScope, $modal, dataSrv) {
	return {
		setMenus: function(sRole, $scope) {
			for ( var prop in MENUS.navigation) {
				for ( var i = 0; i < MENUS.navigation[prop].length; i++) {
					if (MENUS.navigation[prop][i].role === sRole) {
						$scope[prop] = [];
						for ( var j = 0; j < MENUS.navigation[prop][i].items.length; j++) {
							$scope[prop].push(MENUS.navigation[prop][i].items[i]);
						}
					}
				}
			}
		},
		getRoleInitialView: function(sRole) {
			for ( var i = 0; i < MENUS.initialViews.length; i++) {
				if (MENUS.initialViews[i].role === sRole) {
					return MENUS.initialViews[i].initialView;
				}
			}
		},
		refreshMenuTE: function(sRole, $scope) {
			for ( var prop in MENUS.navigation) {
				for ( var i = 0; i < MENUS.navigation[prop].length; i++) {
					if (MENUS.navigation[prop][i].role === sRole) {
						for ( var j = 0; j < MENUS.navigation[prop][i].items.length; j++) {
							$scope[prop][j].lnkText = jQuery.i18n.prop(MENUS.navigation[prop][i].items[j].lnkText);
						}
					}
				}
			}				
		},
		setUserRoles: function($scope, aRoles) {
			for ( var i = 0; i < aRoles.length; i++) {
				for(var j = 0; j < MENUS.appRoles.length; j++){
					if(MENUS.appRoles[j]===aRoles[i].role){
						$scope.globalData.userRoles.push({
							description: aRoles[i].role
						});								
					}
				}				
			}

		},		
		// temporary: this info should be stored in DB
		getNewUserInitialRole: function() {
			return MENUS['newUserInitialRole'];
		},
		convertJsonArrayToString: function(aObj) {
			sReturn = '[';
			for ( var i = 0; i < aObj.length; i++) {
				sReturn = sReturn + '{';
				var aProp = [];
				for ( var propt in aObj[i]) {
					aProp.push(propt);
				}
				for ( var j = 0; j < aProp.length; j++) {
					if (j != (aProp.length - 1)) {
						sReturn = sReturn + '\"' + aProp[j] + '\":' + '\"' + aObj[i][aProp[j]] + '\", ';
					} else {
						sReturn = sReturn + '\"' + aProp[j] + '\":' + '\"' + aObj[i][aProp[j]] + '\"';
					}
				}
				if (i != (aObj.length - 1)) {
					sReturn = sReturn + '}, ';
				} else {
					sReturn = sReturn + '}';
				}
			}
			sReturn = sReturn + ']';
			return sReturn;
		},

		getParameterByName: function(sName) {
			var sURL = window.location.href.replace("#", "");
			sName = sName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regexS = "[\\?&]" + sName + "=([^&#]*)";
			var regex = new RegExp(regexS);
			var results = regex.exec(sURL);
			if (results == null)
				return "";
			else
				return decodeURIComponent(results[1].replace(/\+/g, " "));
		},

		messagesHandler: function(aMessages) {
			var notifyFunction = function(sMessageText, sMessageType) {
				noty({
					text: sMessageText,
					type: sMessageType,
					layout: CONSTANTS.messageDisplayLayout,
					timeout: CONSTANTS.messageDisplayTime
				});
			};
			var bNoErrorMessages = true;

			for ( var i = 0; i < aMessages.length; i++) {
				var sMessageCode = aMessages[i].messageCode.toString();
				var sMessageText = jQuery.i18n.prop('messages.m' + aMessages[i].messageCode);

				switch (sMessageCode[i].substring(0, 1)) {// 1 - success; 2 - warning; 3 - error;
					case '1':// success
						notifyFunction(sMessageText, 'success');
						break;
					case '2':// error
						notifyFunction(sMessageText, 'error');
						bNoErrorMessages = false;
						break;
					case '3':// warning
						notifyFunction(sMessageText, 'warning');
						break;
				}
			}
			return bNoErrorMessages;
		}
	};
});