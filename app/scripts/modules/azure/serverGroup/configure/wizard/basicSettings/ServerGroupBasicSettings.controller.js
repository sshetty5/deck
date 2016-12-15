'use strict';

import {V2_MODAL_WIZARD_SERVICE} from 'core/modal/wizard/v2modalWizard.service';

let angular = require('angular');
import {NAMING_SERVICE} from 'core/naming/naming.service';

module.exports = angular.module('spinnaker.azure.serverGroup.configure.basicSettings', [
  require('angular-ui-router'),
  require('angular-ui-bootstrap'),
  require('./image.regional.filter.js'),
  require('core/serverGroup/configure/common/basicSettingsMixin.controller.js'),
  V2_MODAL_WIZARD_SERVICE,
  require('core/image/image.reader.js'),
  NAMING_SERVICE,
])
  .controller('azureServerGroupBasicSettingsCtrl', function($scope, $controller, $uibModalStack, $state,
                                                          v2modalWizardService, imageReader, namingService) {

    $scope.$watch('form.$valid', function(newVal) {
      if (newVal) {
        v2modalWizardService.markClean('basic-settings');
        v2modalWizardService.markComplete('basic-settings');
      } else {
        v2modalWizardService.markIncomplete('basic-settings');
      }
    });

    this.imageChanged = (image) => {
      $scope.command.imageName = image.imageName;
      $scope.command.selectedImage = image;
      v2modalWizardService.markClean('basic-settings');
    };

    angular.extend(this, $controller('BasicSettingsMixin', {
      $scope: $scope,
      imageReader: imageReader,
      namingService: namingService,
      $uibModalStack: $uibModalStack,
      $state: $state,
    }));
  });
