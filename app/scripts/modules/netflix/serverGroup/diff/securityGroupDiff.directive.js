'use strict';

// TODO: Consider removing this after 11/15/2006 if nobody has complained about its absence

let angular = require('angular');

import {V2_MODAL_WIZARD_SERVICE} from 'core/modal/wizard/v2modalWizard.service';

module.exports = angular
  .module('spinnaker.netflix.serverGroup.diff.securityGroupDiff.directive', [
    V2_MODAL_WIZARD_SERVICE,
  ])
  .directive('netflixSecurityGroupDiff', function () {
    return {
      restrict: 'E',
      templateUrl: require('./securityGroupDiff.directive.html'),
      scope: {},
      bindToController: {
        command: '=',
      },
      controllerAs: 'vm',
      controller: 'netflixSecurityGroupDiffCtrl',
    };
  }).controller('netflixSecurityGroupDiffCtrl', function (v2modalWizardService) {
    this.acknowledgeSecurityGroupDiff = () => {
      this.command.viewState.securityGroupDiffs = [];
      v2modalWizardService.markClean('security-groups');
    };
  });
