viewControllers.controller('deficienciesListView', function($scope, $sce, $modal, $rootScope, $filter, $resource, $q, ngTableParams, dataSrv, globalSrv, $state, customSrv, $window, $timeout) {
	
	$scope.accountTE = jQuery.i18n.prop('deficienciesListView.accountTE');
	$scope.actionsTE = jQuery.i18n.prop('deficienciesListView.actionsTE');
	$scope.clearSortingTE = jQuery.i18n.prop('deficienciesListView.clearSortingTE');
	$scope.countPerPageTE = jQuery.i18n.prop('deficienciesListView.countPerPageTE');
	$scope.durationTE = jQuery.i18n.prop('deficienciesListView.durationTE');
	$scope.imagesTE = jQuery.i18n.prop('deficienciesListView.imagesTE');
	$scope.locationTE = jQuery.i18n.prop('deficienciesListView.locationTE');
	$scope.newTE = jQuery.i18n.prop('deficienciesListView.newTE');
	$scope.noDataSelectedTE = jQuery.i18n.prop('deficienciesListView.noDataSelectedTE');
	$scope.pageTE = jQuery.i18n.prop('deficienciesListView.pageTE');
	$scope.phasesTE = jQuery.i18n.prop('deficienciesListView.phasesTE');
	$scope.phaseTE = jQuery.i18n.prop('deficienciesListView.phaseTE');
	$scope.printTE = jQuery.i18n.prop('deficienciesListView.printTE');
	$scope.projectsTE = jQuery.i18n.prop('deficienciesListView.projectsTE');
	$scope.projectTE = jQuery.i18n.prop('deficienciesListView.projectTE');
	$scope.searchTE = jQuery.i18n.prop('deficienciesListView.searchTE');
	$scope.statusesTE = jQuery.i18n.prop('deficienciesListView.statusesTE');
	$scope.statusTE = jQuery.i18n.prop('deficienciesListView.statusTE');
	$scope.tagsTE = jQuery.i18n.prop('deficienciesListView.tagsTE');
	$scope.totalTE = jQuery.i18n.prop('deficienciesListView.totalTE');
	$scope.unitTE = jQuery.i18n.prop('deficienciesListView.unitTE');
	$scope.viewTitleTE = jQuery.i18n.prop('deficienciesListView.viewTitleTE');
	
	$scope.dueDateInTE = jQuery.i18n.prop('deficienciesListView.dueDateInTE');


	$scope.oTableData = {};
	$scope.filter = {};
	$scope.bShowFilters = true;

	$scope.oTableDisplayParameters = {
		bShowSearchBox: true,
		bShowFilterButton: false,
		bShowClearFilterButton: true,
		bShowSaveAllButton: false,
		bShowPrintButton: true
	};

	if ($scope.globalData.userRole === "endUser") {
		$scope.newTE = "Report a new Deficiency";
		$scope.oTableDisplayParameters.bShowFilterButton = false;
		$scope.oTableDisplayParameters.bShowClearFilterButton = false;
		$scope.oTableDisplayParameters.bShowPrintButton = false;
		$scope.oTableDisplayParameters.bShowSearchBox = false;
	}

	$scope.getStatuses = function() {
		customSrv.getEntitySet({ // get Statuses
			oReadServiceParameters: {
				path: "Status",
				filter: "",
				expand: "",
				showSpinner: false
			},
			oServiceProvider: customSrv,
			oCashProvider: customSrv,
			oCashProviderAttribute: "aStatuses",
			oPendingRequestFor: {
				aEntities: ["oDeficiencyEntity"]
			},
			fnSuccessCallBack: function(aData) {
				$scope.aStatuses = $filter('orderBy')(aData, 'sortingSequence');
				$scope.oSelectCriterias.aStatuses = [];
				var sImg = "";

				for (var i = 0; i < $scope.aStatuses.length; i++) {
					switch ($scope.aStatuses[i].associatedIcon) {
						case "icon-status conforme":
							sImg = "apps/conspector/img/icon_done.png";
							break;
						case "icon-status no-conforme":
							sImg = "apps/conspector/img/icon_noconforme.png";
							break;
						case "icon-status new_status":
							sImg = "apps/conspector/img/icon_new_status.png";
							break;

						case "icon-status pending":
							sImg = "apps/conspector/img/icon_pending.png";
							break;
						case "icon-status in-progress":
							sImg = "apps/conspector/img/icon_inprogress.png";
							break;
						case "icon-status contractor-conforme":
							sImg = "apps/conspector/img/icon_done_contractor.png";
							break;
					}
					var bTicked = true;
					if (sImg === "apps/conspector/img/icon_done.png") {
						bTicked = false;
					}
					$scope.oSelectCriterias.aStatuses.push({
						rowId: $scope.aStatuses[i].rowId,
						icon: "<img src=" + sImg + ">",
						name: $scope.aStatuses[i].name,
						ticked: bTicked
					});
				}
			}
		});
	};

	$scope.oSelectCriterias = {};
	angular.copy(customSrv.oDeficiencyEntity.oSelectCriterias, $scope.oSelectCriterias);

	if(angular.equals($scope.oSelectCriterias, {})){
		$scope.getStatuses();
	}

	$scope.selectData = function() {
		if($scope.oSelectCriterias.aStatuses !== undefined){
			$scope.constructGetDeficienciesFilter();
			$scope.refreshDeficiencies();			
		}
	};

	$scope.reloadDeficienciesTable = function() {
		var sGroupTableBy = '_projectAndPhase';
		if ($scope.globalData.userRole === "endUser") {
			sGroupTableBy = "";
		}

		if (!$scope.oListTable) {
			$scope.oListTable = customSrv.createNgTableParams({
				oTableDataArrays: $scope.oTableData,
				oTableData: $scope.oTableData,
				sSourceDataArrayAttribute: "aAllListItems",
				sTargerObjectAttribute: "aDisplayedListItems",
				scope: $scope,
				groupTableBy: sGroupTableBy
			});
			customSrv.oDeficiencyEntity.oCurrentListTable = $scope.oListTable;

		} else {
			customSrv.oDeficiencyEntity.oCurrentListTable = $scope.oListTable;
			$scope.oListTable.reload();
		}
	};

	$scope.formatTags = function(sTags) {
		if (sTags) {
			while (sTags.indexOf('|') >= 0) {
				sTags = sTags.replace('|', '');
			}
		}
		return sTags;
	};

	$scope.prepareDataForTable = function(aData) {
		var aAllListItems = [];
		for (var i = 0; i < aData.length; i++) {
			var oTableItem = {};
			oTableItem._rowId = aData[i].rowId;
			//Duration
			if (aData[i].createdDate) {
				var sDate = aData[i].createdDate.substring(6, aData[i].createdDate.length - 2);
				var dDate = new Date(parseInt(sDate));
				var dCurrentDate = new Date();
				var timeDiff = Math.abs(dCurrentDate.getTime() - dDate.getTime());
				oTableItem._durationNumber = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1;
				oTableItem._duration = oTableItem._durationNumber + "d";
			}
			
			if (aData[i].dueDate) {
				var sDate = aData[i].dueDate.substring(6, aData[i].createdDate.length - 2);
				var dDate = new Date(parseInt(sDate));
				var dCurrentDate = new Date();
				var timeDiff = dDate.getTime() - dCurrentDate.getTime();
				oTableItem._dueDateInNumber = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1;
				oTableItem._dueDateIn = oTableItem._dueDateInNumber + "d";
			}			
			//Tags
			oTableItem.labels = $scope.formatTags(aData[i].labels);
			oTableItem.trHtmlLabels = $sce.trustAsHtml($scope.formatTags(aData[i].labels));

			//Locations
			oTableItem.environment = $scope.formatTags(aData[i].environment);
			oTableItem.trHtmlEnvironment = $sce.trustAsHtml($scope.formatTags(aData[i].environment));

			if (aData[i].priority) {
				oTableItem.trHtmlPriorityName = $sce.trustAsHtml(aData[i].priority.name);
				oTableItem._associatedColor = aData[i].priority.associatedColor;
				oTableItem._prioritySortingSequence = aData[i].priority.sortingSequence;
			} else {
				oTableItem._associatedColor = "";
				oTableItem._prioritySortingSequence = 999;
			}
			if (aData[i].component) {
				oTableItem.unitName = customSrv.convertStringToInt(aData[i].component.name);
				oTableItem.trHtmlUnitName = $sce.trustAsHtml(aData[i].component.name);
			} else {
				oTableItem.unitName = "";
			}
			if (aData[i].status) {
				oTableItem._associatedStatusIcon = aData[i].status.associatedIcon;
				oTableItem._associatedStatusName = aData[i].status.name;
				oTableItem._sortingSequence = aData[i].status.sortingSequence;
				var sImg = "";
				switch (oTableItem._associatedStatusIcon) {
					case "icon-status conforme":
						sImg = "apps/conspector/img/icon_done.png";
						break;
					case "icon-status no-conforme":
						sImg = "apps/conspector/img/icon_noconforme.png";
						break;
					case "icon-status new_status":
						sImg = "apps/conspector/img/icon_new_status.png";
						break;

					case "icon-status pending":
						sImg = "apps/conspector/img/icon_pending.png";
						break;
					case "icon-status in-progress":
						sImg = "apps/conspector/img/icon_inprogress.png";
						break;
					case "icon-status contractor-conforme":
						sImg = "apps/conspector/img/icon_done_contractor.png";
						break;
				}
				oTableItem._iconImgPath = sImg;
			} else {
				oTableItem._associatedStatusIcon = "";
				oTableItem._associatedStatusName = "";
			}

			if (aData[i].assigneeContact) {
				oTableItem.accountFirstName = aData[i].assigneeContact.firstName;
				oTableItem.trHtmlAccountFirstName = $sce.trustAsHtml(aData[i].assigneeContact.firstName);
			} else {
				oTableItem.accountFirstName = "";
			}

			if (aData[i].project) {
				oTableItem._projectId = aData[i].project.rowId;
				oTableItem._projectName = aData[i].project.name;
			}
			if (aData[i].version) {
				oTableItem._phaseId = aData[i].version.rowId;
				oTableItem._phaseName = aData[i].version.name;
				oTableItem._phaseSortingSequence = aData[i].version.sortingSequence;
			} else {
				oTableItem._phaseSortingSequence = 999;
			}

			oTableItem.trHtmlNote = $sce.trustAsHtml(aData[i].description);
			oTableItem._note = aData[i].description;

			oTableItem._attachmentsNumber = aData[i].attachmentsNumber;
			oTableItem._filesGuid = aData[i].filesGuid;
			oTableItem._createdBy = aData[i].createdBy;

			oTableItem._projectAndPhase = oTableItem._projectName + " " + oTableItem._phaseName;

			aAllListItems.push(oTableItem);
		}
		return aAllListItems;
	};

	$scope.constructGetDeficienciesFilter = function() {
		var sFilter = customSrv.constructFilterBasedOnGlobalSelections();

		var bIsFirstFilter = false;
		if (sFilter === "") {
			bIsFirstFilter = true;
		}

		sFilter = sFilter + customSrv.constractFilterBasedOnMultipleSelect({
			aArray: $scope.oSelectCriterias.aStatuses,
			sArrayKey: "rowId",
			sFilterKey: "statusId",
			bIsFirstFilter: bIsFirstFilter
		});

		sFilter = sFilter + " and isDeleted ne 'true'";
		if ($scope.globalData.userRole === "endUser") {
			sFilter = sFilter + " and createdBy eq '" + $scope.globalData.userName + "'";
		}

		$scope.oTableData.sFilter = sFilter;
	};

	$scope.refreshDeficiencies = function() {
		customSrv.getEntitySet({
			oReadServiceParameters: {
				path: "Task",
				filter: $scope.oTableData.sFilter,
				expand: "status,priority,assigneeContact,component,project,version",
				showSpinner: true
			},
			oServiceProvider: customSrv,
			fnSuccessCallBack: function(aData) {
				$scope.aDeficiencies = aData;
				$scope.oTableData.aAllListItems = $scope.prepareDataForTable(aData);
				$scope.oTableData.aAllListItems = $filter('orderBy')($scope.oTableData.aAllListItems, ["_phaseSortingSequence", "unitName", "_prioritySortingSequence", "_rowId"]);
				$scope.reloadDeficienciesTable();
			}
		});
	};

	if (customSrv.oDeficiencyEntity.iPendingRequestsForGetEntitySet === 0) {
		$scope.selectData();
	}

	var offEventPendingRequestsFinishedForoDeficiencyEntity = $rootScope.$on("pendingRequestsFinishedForoDeficiencyEntity", function() {
		$scope.selectData();
	});

	var offEventGlobalSelectionsChanged = $rootScope.$on("globalSelectionsChanged", function() {
		$scope.selectData();
	});	

	$scope.$watch("filter.$", function() {
		if ($scope.filter && $scope.oListTable) {
			$scope.oListTable.parameters().filter.$ = $scope.filter.$;
			$scope.reloadDeficienciesTable();
		}
	});

	$scope.onClearFiltering = function() {
		$scope.oListTable.sorting({});
		$scope.oListTable.filter({});
		$scope.filter = {};
		$scope.oTableData.aAllListItems = $filter('orderBy')($scope.oTableData.aAllListItems, ["_phaseSortingSequence", "unitName", "_prioritySortingSequence", "_rowId"]);
		$scope.reloadDeficienciesTable();
	};

	$scope.onRefreshList = function() {
		$scope.refreshDeficiencies();
	};

	$scope.setCurrentDeficiency = function(deficiency) {
		var oDeficiency = {
			obj: {}
		};
		customSrv.setAttributeFromArrayByKey({
			aArray: $scope.aDeficiencies,
			oObject: deficiency,
			sArrayKey: "rowId",
			sObjectKey: "_rowId",
			sTargetAttribute: "obj",
			oTargetObject: oDeficiency
		});
		customSrv.oDeficiencyEntity.oCurrentDeficiency = jQuery.extend(true, {}, oDeficiency.obj);
	};

	$scope.goToDisplayDetails = function(deficiency) {
		customSrv.oDeficiencyEntity.bDeficiencyDisplayMode = true;
		$scope.setCurrentDeficiency(deficiency);
		if ($scope.globalData.userRole === "endUser") {
			$state.go('^.deficiencyDetailsEndUser');
		} else {
			$state.go('^.deficiencyDetails');
		}

		if ($scope.globalData.userRole === "endUser") {
			customSrv.backNavigationFromDeficiencyDetailsTo = '^.deficienciesListEndUser';
		} else {
			customSrv.backNavigationFromDeficiencyDetailsTo = '^.deficienciesList';
		}
	};

	$scope.goToEditDetails = function(deficiency) {
		customSrv.oDeficiencyEntity.bDeficiencyDisplayMode = false;
		$scope.setCurrentDeficiency(deficiency);
		if ($scope.globalData.userRole === "endUser") {
			$state.go('^.deficiencyDetailsEndUser');
		} else {
			$state.go('^.deficiencyDetails');
		}
		if ($scope.globalData.userRole === "endUser") {
			customSrv.backNavigationFromDeficiencyDetailsTo = '^.deficienciesListEndUser';
		} else {
			customSrv.backNavigationFromDeficiencyDetailsTo = '^.deficienciesList';
		}
	};

	$scope.onAddNew = function() {
		customSrv.oDeficiencyEntity.oCurrentDeficiency = {};
		customSrv.oDeficiencyEntity.bDeficiencyDisplayMode = false;
		customSrv.oDeficiencyEntity.bCreateNewMode = true;

		if ($scope.globalData.userRole === "endUser") {
			$state.go('^.deficiencyDetailsEndUser');
		} else {
			$state.go('^.deficiencyDetails');
		}

		if ($scope.globalData.userRole === "endUser") {
			customSrv.backNavigationFromDeficiencyDetailsTo = '^.deficienciesListEndUser';
		} else {
			customSrv.backNavigationFromDeficiencyDetailsTo = '^.deficienciesList';
		}
	};

	$scope.$on("$destroy", function() {
		offEventPendingRequestsFinishedForoDeficiencyEntity();
		offEventGlobalSelectionsChanged();

		customSrv.oDeficiencyEntity.listSearchFilter = $scope.filter.$;

		if ($scope.oListTable) {
			customSrv.oDeficiencyEntity.listColumnsFilters = $scope.oListTable.parameters().filter;
			customSrv.oDeficiencyEntity.listColumnsSorting = $scope.oListTable.parameters().sorting;
			customSrv.oDeficiencyEntity.oSelectCriterias = jQuery.extend(true, {}, $scope.oSelectCriterias);
			$scope.oListTable.settings().setGroupsInfo();
			customSrv.oDeficiencyEntity.listColumnsGrouping = $scope.oListTable.settings().$scope.aGroupsInfo;
		}
	});

	$scope.$on("ngTableAfterReloadData", function() {
		if ($scope.oTableData && $scope.oTableData.aDisplayedListItems) {
			$scope.tableInfoTotal = customSrv.getTableTotalInfo({
				aItems: $scope.oTableData.aDisplayedListItems,
				sAttribute: "_associatedStatusName"
			});
		}

		if ($scope.oListTable && customSrv.oDeficiencyEntity.listSearchFilter !== "" && customSrv.oDeficiencyEntity.listSearchFilter !== undefined) {
			$scope.filter.$ = customSrv.oDeficiencyEntity.listSearchFilter;
			customSrv.oDeficiencyEntity.listSearchFilter = "";
		}

		delete customSrv.oDeficiencyEntity.listColumnsFilters.$;
		if ($scope.oListTable && JSON.stringify(customSrv.oDeficiencyEntity.listColumnsFilters) !== JSON.stringify({})) {
			$scope.oListTable.parameters().filter = customSrv.oDeficiencyEntity.listColumnsFilters;
			$scope.bShowFilters = true;
			customSrv.oDeficiencyEntity.listColumnsFilters = {};
		}

		if ($scope.oListTable && JSON.stringify(customSrv.oDeficiencyEntity.listColumnsSorting) !== JSON.stringify({})) {
			$scope.oListTable.parameters().sorting = customSrv.oDeficiencyEntity.listColumnsSorting;
			customSrv.oDeficiencyEntity.listColumnsSorting = {};
		}

		if ($scope.oListTable && customSrv.oDeficiencyEntity.listColumnsGrouping && customSrv.oDeficiencyEntity.listColumnsGrouping.length > 0) {
			$scope.oListTable.settings().$scope.aGroupsInfo = customSrv.oDeficiencyEntity.listColumnsGrouping;
			customSrv.oDeficiencyEntity.listColumnsGrouping = [];
		}
	});

	$scope.onPrint = function() {
		$scope.$destroy();
		$state.go('deficienciesListPrintForm');
	};

	$scope.getDeficiencyPhotos = function(sFilesGuid) {
		var sPhotosUrl = "rest/file/list/deficiency/" + sFilesGuid + "/_attachments_";

		var oGetDeficienciesPhotos = dataSrv.httpRequest(sPhotosUrl, {});
		oGetDeficienciesPhotos.then(function(aData) {
			$scope.aPhotos = [];
			for (var i = 0; i < aData.length; i++) {
				if (aData[i].isDeleted !== true && (aData[i].fileExtention.toUpperCase() === ".JPG" || aData[i].fileExtention.toUpperCase() === ".JPEG" || aData[i].fileExtention.toUpperCase() === ".PNG" || aData[i].fileExtention === ".GIF" || aData[i].fileExtention === ".BMP")) {
					$scope.aPhotos.push(aData[i]);
				}
			}
			//temporary before Lin's fix
			sPhotosUrl = "rest/file/list/deficiency/" + sFilesGuid + "/_photo_";
			oGetDeficienciesPhotos = dataSrv.httpRequest(sPhotosUrl, {});
			oGetDeficienciesPhotos.then(function(aData) {
				for (var i = 0; i < aData.length; i++) {
					if (aData[i].isDeleted !== true && (aData[i].fileExtention.toUpperCase() === ".JPG" || aData[i].fileExtention.toUpperCase() === ".JPEG" || aData[i].fileExtention.toUpperCase() === ".PNG" || aData[i].fileExtention === ".GIF" || aData[i].fileExtention === ".BMP")) {
						$scope.aPhotos.push(aData[i]);
					}
				}
				if ($scope.aPhotos.length) {
					customSrv.setUpPhotoGallery($scope.aPhotos);
				}
			});
		});
	};

	$scope.showDeficiencyPhotos = function($event, deficiency) {
		$event.stopPropagation();
		$scope.getDeficiencyPhotos(deficiency._filesGuid);
	};
});