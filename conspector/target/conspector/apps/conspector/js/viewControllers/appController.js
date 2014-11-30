viewControllers.controller('appView', function($scope, $rootScope, $filter, $resource, $q, ngTableParams, dataSrv, globalSrv, $state, customSrv, $window, $timeout) {
	$scope.aboutTE = jQuery.i18n.prop('appView.aboutTE');
	$scope.contactUsTE = jQuery.i18n.prop('appView.contactUsTE');
	$scope.allRightsReservedTE = jQuery.i18n.prop('appView.allRightsReservedTE');
	$scope.adminPanelTE = jQuery.i18n.prop('appView.adminPanelTE');
	$scope.allRightsReservedTE = jQuery.i18n.prop('appView.allRightsReservedTE');
	$scope.contactUsTE = jQuery.i18n.prop('appView.contactUsTE');
	$scope.contractorsTE = jQuery.i18n.prop('appView.contractorsTE');
	$scope.deficienciesTE = jQuery.i18n.prop('appView.deficienciesTE');
	$scope.poweredByConspectorTE = jQuery.i18n.prop('appView.poweredByConspectorTE');
	$scope.settingsTE = jQuery.i18n.prop('appView.settingsTE');
	$scope.unitsTE = jQuery.i18n.prop('appView.unitsTE');
	$scope.welcomeMessageTE = jQuery.i18n.prop('appView.welcomeMessageTE', $scope.globalData.userName);

	$scope.aMainNavigationLinks = [];

	if ($scope.globalData.userRole === "endUser") {
		$scope.aMainNavigationLinks.push({
			linkTE: $scope.deficienciesTE,
			classes: "mainNavLnk tab-deficiencies",
			stateToNavigate: "app.deficienciesListEndUser",
			globalStateObject: $state,
			hash: "#/app/deficienc"
		});
	}

	if ($scope.globalData.userRole === "technicalAdministrator" || $scope.globalData.userRole === "user") {
		$scope.aMainNavigationLinks.push({
			linkTE: $scope.deficienciesTE,
			classes: "mainNavLnk tab-deficiencies",
			stateToNavigate: "app.deficienciesList",
			globalStateObject: $state,
			hash: "#/app/deficienc"
		});

		$scope.aMainNavigationLinks.push({
			linkTE: $scope.unitsTE,
			classes: "mainNavLnk tab-units",
			stateToNavigate: "app.unitsList",
			globalStateObject: $state,
			hash: "#/app/unit"
		});

		$scope.aMainNavigationLinks.push({
			linkTE: $scope.contractorsTE,
			classes: "mainNavLnk tab-clients",
			stateToNavigate: "app.accountsList",
			globalStateObject: $state,
			hash: "#/app/account"
		});
	}

	$scope.aMainNavigationLinks.push({
		linkTE: $scope.settingsTE,
		classes: "mainNavLnk tab-settings",
		stateToNavigate: "app.userSettings.myProfile",
		globalStateObject: $state,
		hash: "#/app/userSettings"
	});

	if ($scope.globalData.userRole === "technicalAdministrator") {
		$scope.aMainNavigationLinks.push({
			linkTE: $scope.adminPanelTE,
			classes: "mainNavLnk tab-admin",
			stateToNavigate: "app.adminArea.userManagement",
			globalStateObject: $state,
			hash: "#/app/adminArea"
		});
	}

	$scope.constructLogoUrl = function() {
		var sUrl = "rest/file/list/settings/settings/_logo_";
		var oGetLogoUrl = dataSrv.httpRequest(sUrl, {});
		oGetLogoUrl.then(function(aData) {
			$scope.sLogoUrl = $window.location.origin + $window.location.pathname + "rest/file/get/" + aData[0].rowId;
		});
	};

	$scope.constructLogoUrl();

	var fnSetActiveMainNavigationLink = function(aLinks, oLink) {
		if (oLink.classes.indexOf(" active") >= 0) {
			return;
		}
		for (var i = 0; i < aLinks.length; i++) {
			aLinks[i].classes = aLinks[i].classes.replace(" active", "");
		}
		oLink.classes = oLink.classes + " active";
	};

	for (var i = 0; i < $scope.aMainNavigationLinks.length; i++) {
		if (location.hash.indexOf($scope.aMainNavigationLinks[i].hash) >= 0) {
			fnSetActiveMainNavigationLink($scope.aMainNavigationLinks, $scope.aMainNavigationLinks[i]);
		}
	}

	$scope.onMainNavigationLinkClick = function(aLinks, oLink) {
		fnSetActiveMainNavigationLink(aLinks, oLink);
		oLink.globalStateObject.transitionTo(oLink.stateToNavigate);
	};

	$rootScope.onLogOut = customSrv.onLogOut;

	$scope.getProjectsAndPhases = function() {
		customSrv.getEntitySet({
			oReadServiceParameters: {
				path: "Version",
				filter: "",
				expand: "project",
				showSpinner: false
			},
			oServiceProvider: customSrv,
			oCashProvider: customSrv,
			oCashProviderAttribute: "aPhases",
			oPendingRequestFor: {
				aEntities: ["oDeficiencyEntity", "oUnitEntity"]
			},
			fnSuccessCallBack: function(aData) {
				aData = $filter('orderBy')(aData, "projectID");
				for (var i = 0; i < aData.length; i++) {
					if (i === 0) {
						$rootScope.oGlobalSelections.aProjects.push({
							name: '<strong>' + aData[i].project.name + '</strong>',
							multiSelectGroup: true
						});

						$rootScope.oGlobalSelections.aProjects.push({
							parentName: aData[i].project.name,
							parentId: aData[i].project.rowId,
							name: aData[i].name,
							rowId: aData[i].rowId,
							ticked: true
						});
					} else {
						if ($rootScope.oGlobalSelections.aProjects.length > 1) {
							if ($rootScope.oGlobalSelections.aProjects[$rootScope.oGlobalSelections.aProjects.length - 1].parentId !== aData[i].project.rowId) {
								$rootScope.oGlobalSelections.aProjects.push({
									multiSelectGroup: false
								});
								$rootScope.oGlobalSelections.aProjects.push({
									name: '<strong>' + aData[i].project.name + '</strong>',
									multiSelectGroup: true
								});
							}
							$rootScope.oGlobalSelections.aProjects.push({
								parentName: aData[i].project.name,
								parentId: aData[i].project.rowId,
								name: aData[i].name,
								rowId: aData[i].rowId,
								ticked: true
							});
						}
					}
					if (i === aData.length - 1) {
						$rootScope.oGlobalSelections.aProjects.push({
							multiSelectGroup: false
						});
					}
				}
			}
		});
	};

	if (customSrv.getJsonCookie("globalSelections") && customSrv.getJsonCookie("globalSelections").aProjects) {
		$rootScope.oGlobalSelections = {};
		angular.copy(customSrv.getJsonCookie("globalSelections"), $rootScope.oGlobalSelections);
	} else {
		$rootScope.oGlobalSelections = {
			aProjects: []
		};
		$scope.getProjectsAndPhases();
	}

	$rootScope.onSelectProjects = function() {
		customSrv.setCookieFromJson("globalSelections", {
			aProjects: $rootScope.oGlobalSelections.aProjects
		});
		$rootScope.$emit('globalSelectionsChanged');
	};
});