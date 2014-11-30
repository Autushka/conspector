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
var roleSelectorPopUpController = function($scope, $modalInstance, roles, currentRole) {

	$scope.roles = roles;
	
	if(currentRole != ""){
		$scope.selectedRole = currentRole;		
	}
	else{
		$scope.selectedRole = roles[0].description;		
	}

	$scope.header = jQuery.i18n.prop('roleSelectorPopUp.headerTE');
	$scope.cancelTE = jQuery.i18n.prop('global.cancelTE');
	$scope.okTE = jQuery.i18n.prop('global.okTE');

	$scope.ok = function() {
		$modalInstance.close($scope.selectedRole);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	$scope.onRBClick = function($event) {// for some reason regular binding didn't work out here...
		if ($event.toElement) {
			$scope.selectedRole = $event.toElement.value;
		} else {
			$scope.selectedRole = $event.target.value; // Fire Fox
		}
	};
};