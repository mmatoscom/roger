'use strict';

import React from 'react';
import BuildOutput from './buildOutput';
import BuildHistory from './buildHistory';
import actions from '../actions/actions';
import Utils from '../utils/utils';
import axios from 'axios';
import _ from 'lodash';

class ProjectDetails extends React.Component {

  constructor(...props) {
    super(...props);
    this.startBuild = this.startBuild.bind(this);
  }

  startBuild(build) {
    let url = Utils.getProjectUrl(build.project);
    actions.startBuild(url, build.branch);
  }

  render() {
    let data = this.props.project;
    let builds = Utils.filterBuildsByProject(this.props.builds, data.name);
    let currentBuild = _.find(builds, {id: this.props.buildId}) || {};

    return (
      <div className="project-details">
        <div className="container-fluid">
          <div className="row build-header">
            <div className="col-xs-10 col-md-10">
              <h4>
                {Utils.getProjectShortName(data.name)}
                <span className="label label-default project-details__build-branch">Branch: {currentBuild.branch}</span>
                <span
                  className={`label project-details__build-status ${Utils.getBuildStatusClassName(currentBuild.status)}`}>Build: {currentBuild.status}</span>
              </h4>
            </div>
            <div className="col-xs-2 col-md-2">
              {
                data.buildInProgress ?
                  <button className="btn btn-info pull-right" disabled>Build initiated ...</button>
                  :
                  <button className="btn btn-info pull-right" onClick={this.startBuild.bind(this, currentBuild)}>Build</button>
              }
            </div>
          </div>
          <div className="row">
            <div className="well build-output col-xs-10 col-md-10">
              <BuildOutput buildId={currentBuild.id} buildStatus={currentBuild.status}></BuildOutput>
            </div>
            <div className="col-xs-2 col-md-2">
              <BuildHistory builds={builds} buildId={currentBuild.id}></BuildHistory>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectDetails; 