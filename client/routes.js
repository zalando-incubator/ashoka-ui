import React from 'react';
import client from 'api/client';
import {
  Route,
  IndexRedirect,
  browserHistory
} from 'react-router';

import {
  App,
  SurveyPage,
  SurveysPage,
  SurveyEditorPage,
  NotFound,
  LoginPage,
  NomineePage,
  NomineesPage,
  OrganizationPage,
  OrganizationsPage,
  PageFlowWrapper
} from 'containers';

const isAuthenticated = () => {
  return client.authenticated((user) => {
    if (!user) {
      browserHistory.replace('/login');
    }
  });
};

const OrganizationPages = PageFlowWrapper({
  create: OrganizationPage,
  edit: OrganizationPage,
  view: OrganizationPage,
  list: OrganizationsPage,
  defaultMode: 'list'
});

export default (
  <div>
    <Route path="/login" component={LoginPage} />

    <Route path="/" component={App} onEnter={isAuthenticated}>
      <IndexRedirect to="nominees" />
      <Route path="surveys" component={SurveysPage} />
      <Route path="surveys/:surveyKey" component={SurveyPage} />
      <Route path="survey-editor" component={SurveyEditorPage} />
      <Route path="survey-org-editor" component={SurveyEditorPage} />
      <Route path="nominees" component={NomineesPage} />
      <Route path="nominees/:nomineeKey" component={NomineePage} />
      <Route path="organizations(/:organizationKey)" component={OrganizationPages} />
    </Route>

    <Route path="/*" component={NotFound} />
  </div>
);
