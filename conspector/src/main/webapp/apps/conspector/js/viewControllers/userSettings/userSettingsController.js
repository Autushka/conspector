viewControllers.controller('userSettingsView', function($scope, $rootScope, dataSrv, globalSrv, $state) {
	$scope.changeProfileTE = jQuery.i18n.prop('userSettingsView.changeProfileTE');
	$scope.changePasswordTE = jQuery.i18n.prop('userSettingsView.changePasswordTE');

	$scope.oldPasswordTE = jQuery.i18n.prop('changePasswordView.oldPasswordTE');
	$scope.newPasswordTE = jQuery.i18n.prop('changePasswordView.newPasswordTE');
	$scope.confirmNewPasswordTE = jQuery.i18n.prop('changePasswordView.confirmNewPasswordTE');
	$scope.saveTE = jQuery.i18n.prop('global.saveTE');
	$scope.cancelTE = jQuery.i18n.prop('global.cancelTE');

	$scope.localAvatarTE = jQuery.i18n.prop('myProfileView.localAvatarTE');
	$scope.gravatarTE = jQuery.i18n.prop('myProfileView.gravatarTE');
	$scope.userNameTE = jQuery.i18n.prop('myProfileView.userNameTE');
	$scope.emailTE = jQuery.i18n.prop('myProfileView.emailTE');
	$scope.communicationLnTE = jQuery.i18n.prop('myProfileView.communicationLnTE');
	$scope.changeGravatarTE = jQuery.i18n.prop('myProfileView.changeGravatarTE');
	$scope.selectAvatarTE = jQuery.i18n.prop('myProfileView.selectAvatarTE');

	$scope.limitDisplayedValuesTE = "Limit displayed values";	
	$scope.communicationLns = [{}, {}];	
	$scope.communicationLns[0].description = jQuery.i18n.prop('global.englishTE');
	$scope.communicationLns[1].description = jQuery.i18n.prop('global.frenchTE');

	$scope.communicationLns[0].code = "en";
	$scope.communicationLns[1].code = "fr";

	$scope.aLeftSideNavigationLinks = [];

	$scope.aLeftSideNavigationLinks.push({
		linkTE: $scope.changeProfileTE,
		arrowClasses: "arrow-right cnpNotTransparent",
		stateToNavigate: "^.myProfile",
		globalStateObject: $state,
		hash: "#/app/userSettings/userManagement"
	});

	$scope.aLeftSideNavigationLinks.push({
		linkTE: $scope.changePasswordTE,
		arrowClasses: "arrow-right",
		stateToNavigate: "^.changePassword",
		globalStateObject: $state,
		hash: "#/app/userSettings/changePassword"
	});

	var fnSetActiveSideNavigationLink = function(aLinks, oLink){
		if(oLink.arrowClasses.indexOf("cnpNotTransparent") >= 0){
			return;
		}
		for (var i = 0; i < aLinks.length; i++) {
			aLinks[i].arrowClasses = aLinks[i].arrowClasses.replace(" cnpNotTransparent", "");
		}
		oLink.arrowClasses = oLink.arrowClasses + " cnpNotTransparent";
	};	

	for (var i = 0; i < $scope.aLeftSideNavigationLinks.length; i++) {
		if(location.hash.indexOf($scope.aLeftSideNavigationLinks[i].hash) >= 0){
			fnSetActiveSideNavigationLink($scope.aLeftSideNavigationLinks, $scope.aLeftSideNavigationLinks[i]);
		}
	}

	$scope.onLeftSideNavigationLinkClick = function(aLinks, oLink){
		fnSetActiveSideNavigationLink(aLinks, oLink);
		oLink.globalStateObject.go(oLink.stateToNavigate);
	};		
});
