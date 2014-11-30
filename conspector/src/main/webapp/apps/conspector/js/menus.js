//$.getScript("apps/conspector/js/viewControllers.js");
//
//$.getScript("apps/conspector/js/viewControllers/deficiencies/deficienciesController.js");
//$.getScript("apps/conspector/js/viewControllers/deficiencies/deficienciesListController.js");		
//$.getScript("apps/conspector/js/viewControllers/deficiencies/deficiencyDetailsController.js");
//$.getScript("apps/conspector/js/viewControllers/deficiencies/deficienciesListPrintFormController.js");
//$.getScript("apps/conspector/js/viewControllers/popUps/notSavedDataPopUpController.js");
//
//$.getScript("apps/conspector/js/viewControllers/units/unitsController.js");
//$.getScript("apps/conspector/js/viewControllers/units/unitsListController.js");		
//$.getScript("apps/conspector/js/viewControllers/units/unitDetailsController.js");
//
//$.getScript("apps/conspector/js/viewControllers/accounts/accountsController.js");
//$.getScript("apps/conspector/js/viewControllers/accounts/accountsListController.js");		
//$.getScript("apps/conspector/js/viewControllers/accounts/accountDetailsController.js");	
//
//$.getScript("apps/conspector/js/viewControllers/adminArea/projectsController.js");
//$.getScript("apps/conspector/js/viewControllers/adminArea/phasesController.js");
//$.getScript("apps/conspector/js/viewControllers/adminArea/categoriesController.js");
//$.getScript("apps/conspector/js/viewControllers/adminArea/statusesController.js");
//$.getScript("apps/conspector/js/viewControllers/adminArea/prioritiesController.js");
//$.getScript("apps/conspector/js/viewControllers/adminArea/accountTypesController.js");	
//	
//$.getScript("apps/conspector/js/viewControllers/clientFormController.js");						
//$.getScript("apps/conspector/js/viewControllers/appController.js");

var MENUS = (function($) {
	var menus = {
		navigation : {
			aMainNavigationLinks : []
		},
		initialViews : []
	};
	menus.navigation.aMainNavigationLinks.push({
		role : "",
		items : []
	});
	menus.navigation.aMainNavigationLinks.push({
		role : "technicalAdministrator",
		items : [ {
//			linkTE: "Deficiencies",
//			classes: "mainNavLnk tab-deficiencies",
//			stateToNavigate: "app.deficienciesList",
//			globalStateObject: $state,
//			hash: "#/app/deficienc"
//		}, {
//			linkTE: $scope.unitsTE,
//			classes: "mainNavLnk tab-units",
//			stateToNavigate: "app.unitsList",
//			globalStateObject: $state,
//			hash: "#/app/unit"	
//		}, {
//			linkTE: $scope.contractorsTE,
//			classes: "mainNavLnk tab-clients",
//			stateToNavigate: "app.accountsList",
//			globalStateObject: $state,
//			hash: "#/app/account"
//		}, {
//			linkTE: $scope.settingsTE,
//			classes: "mainNavLnk tab-settings",
//			stateToNavigate: "app.userSettings.myProfile",
//			globalStateObject: $state,
//			hash: "#/app/userSettings"	
//		}, {
//			linkTE: $scope.adminPanelTE,
//			classes: "mainNavLnk tab-admin",
//			stateToNavigate: "app.adminArea.userManagement",
//			globalStateObject: $state,
//			hash: "#/app/adminArea"
		} ]
	});
	menus.navigation.aMainNavigationLinks.push({
		role : "user",
		items :  [ {
//			linkTE: $scope.deficienciesTE,
//			classes: "mainNavLnk tab-deficiencies",
//			stateToNavigate: "app.deficienciesList",
//			globalStateObject: $state,
//			hash: "#/app/deficienc"
//		}, {
//			linkTE: $scope.unitsTE,
//			classes: "mainNavLnk tab-units",
//			stateToNavigate: "app.unitsList",
//			globalStateObject: $state,
//			hash: "#/app/unit"	
//		}, {
//			linkTE: $scope.contractorsTE,
//			classes: "mainNavLnk tab-clients",
//			stateToNavigate: "app.accountsList",
//			globalStateObject: $state,
//			hash: "#/app/account"
//		}, {
//			linkTE: $scope.settingsTE,
//			classes: "mainNavLnk tab-settings",
//			stateToNavigate: "app.userSettings.myProfile",
//			globalStateObject: $state,
//			hash: "#/app/userSettings"	
		}]
	});

	menus.initialViews.push({
		role : "",
		initialView : "#/signIn"
	});
	menus.initialViews.push({
		role : "user",
		initialView : "#/app/deficienciesList"
	});
	menus.initialViews.push({
		role : "test",
		initialView : "#/template/"
	});
	menus.initialViews.push({
		role : "technicalAdministrator",
		initialView : "#/app/deficienciesList"
	});
	
	menus.initialViews.push({
		role : "endUser",
		initialView : "#/app/deficienciesListEndUser"
	});	

	menus.newUserInitialRole = "user";

	menus.appRoles = [ "user", "technicalAdministrator", "endUser" ];

	return menus;
}(jQuery));