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
var MENUS = (function($) {
	var menus = {navigation: {mainNavigation: []}, initialViews: []};
	menus.navigation.mainNavigation.push({
		role: "",
		items: []
	});
	menus.navigation.mainNavigation.push({
		role: "technicalAdministrator",
		items: [{
			lnkText: 'mainView.adminAreaLnkTE',
			lnkHref: "#/adminArea"
		}]
	});
	
	menus.initialViews.push({role: "", initialView: "#/signIn/"});	
	menus.initialViews.push({role: "technicalAdministrator", initialView: "#/adminArea/"});
	
	menus.newUserInitialRole = "user";		
	
	return menus;
}(jQuery));