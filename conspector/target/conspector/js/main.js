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
var app = angular.module('projectX', ['customControls', 'ui.router', 'viewControllers', 'ui.bootstrap', 'textAngular', 'ngResource', 'colorpicker.module', 'ngTagsInput', 'ngQuickDate', 'ui.highlight', 'multi-select', 'ngTable'])

.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("/signIn");
	
	$stateProvider.state('signIn', {
		url: '/signIn',
		templateUrl: 'views/signInView.html',
		controller: 'signInView'})
	.state('forgotPassword', {
		url: '/forgotPassword',
		templateUrl: 'views/forgotPasswordView.html',
		controller: 'forgotPasswordView'})
	.state('resetPassword', {
		url: '/resetPassword/:pr',
		templateUrl: 'views/resetPasswordView.html',
		controller: 'resetPasswordView'})
	.state('emailActivation', {
		url: '/emailActivation/:ev',
		templateUrl: 'views/emailActivationView.html',
		controller: 'emailActivationView'})
	.state('about', {
		url: '/about',		
		templateUrl: 'views/aboutView.html',
		controller: 'aboutView'})
		
		
				
	.state('app', {
		url: '/app',			
		templateUrl: 'apps/conspector/views/appView.html',
		controller: 'appView'})	
			
	.state('app.deficienciesList', {
		url: '/deficienciesList',
		templateUrl: 'apps/conspector/views/deficiencies/deficienciesListView.html',
		controller: 'deficienciesListView'})
		
	.state('app.deficienciesListEndUser', {
		url: '/deficienciesListEndUser',
		templateUrl: 'apps/conspector/views/deficiencies/deficienciesListEndUserView.html',
		controller: 'deficienciesListView'})			
		
	.state('app.deficiencyDetails', {
		url: '/deficiencyDetails',
		templateUrl: 'apps/conspector/views/deficiencies/deficiencyDetailsView.html',
		controller: 'deficiencyDetailsView'})	
		
	.state('app.deficiencyDetailsEndUser', {
		url: '/deficiencyDetailsEndUser',
		templateUrl: 'apps/conspector/views/deficiencies/deficiencyDetailsEndUserView.html',
		controller: 'deficiencyDetailsView'})			
		
	.state('deficienciesListPrintForm', {
		url: '/deficienciesListPrintForm',
		templateUrl: 'apps/conspector/views/deficiencies/deficienciesListPrintFormView.html',
		controller: 'deficienciesListPrintFormView'})			
			
	.state('app.unitsList', {
		url: '/unitsList',
		templateUrl: 'apps/conspector/views/units/unitsListView.html',
		controller: 'unitsListView'})	
	.state('app.unitDetails', {
		url: '/unitDetails',
		templateUrl: 'apps/conspector/views/units/unitDetailsView.html',
		controller: 'unitDetailsView'})	

	.state('app.accountsList', {
		url: '/accountsList',
		templateUrl: 'apps/conspector/views/accounts/accountsListView.html',
		controller: 'accountsListView'})	
	.state('app.accountDetails', {
		url: '/accountDetails',
		templateUrl: 'apps/conspector/views/accounts/accountDetailsView.html',
		controller: 'accountDetailsView'})	

	.state('app.adminArea', {
		url: '/adminArea',			
		templateUrl: 'views/adminArea/adminAreaView.html',
		controller: 'adminAreaView'})
	.state('app.adminArea.userManagement', {
		url: '/userManagement',			
		templateUrl: 'views/adminArea/userManagementView.html',
		controller: 'userManagementView'})
	.state('app.adminArea.addNewUser', {
		url: '/addNewUser',			
		templateUrl: 'views/adminArea/addNewUserView.html',
		controller: 'addNewUserView'})
	.state('app.adminArea.projects', { 
		url: '/projects',			
		templateUrl: 'apps/conspector/views/adminArea/projectsView.html',
		controller: 'projectsView'})
	.state('app.adminArea.phases', {
		url: '/phases',			
		templateUrl: 'apps/conspector/views/adminArea/phasesView.html',
		controller: 'phasesView'})
	.state('app.adminArea.statuses', {
		url: '/statuses',			
		templateUrl: 'apps/conspector/views/adminArea/statusesView.html',
		controller: 'statusesView'})
	.state('app.adminArea.priorities', {
		url: '/priorities',			
		templateUrl: 'apps/conspector/views/adminArea/prioritiesView.html',
		controller: 'prioritiesView'})
	.state('app.adminArea.accountTypes', {
		url: '/accountTypes',			
		templateUrl: 'apps/conspector/views/adminArea/accountTypesView.html',
		controller: 'accountTypesView'})	

	.state('app.userSettings', {
		url: '/userSettings',
		templateUrl: 'views/userSettings/userSettingsView.html',
		controller: 'userSettingsView'})
	.state('app.userSettings.myProfile', {
		url: '/myProfile',
		templateUrl: 'views/userSettings/myProfileView.html',
		controller: 'myProfileView'})
	.state('app.userSettings.changePassword', {
		url: '/changePassword',	
		templateUrl: 'views/userSettings/changePasswordView.html',
		controller: 'changePasswordView'});
		
//	.state('clientForm', {
//		url: '/clientForm',	
//		templateUrl: 'apps/conspector/views/clientFormView.html',
//		controller: 'clientFormView'});
		
});




