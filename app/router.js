import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('home');
  this.route('tasktype');
  this.route('users');
  this.route('tasktypeditor');
});

export default Router;
