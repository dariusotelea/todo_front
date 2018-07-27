import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  tasks: computed(function () {
    return this.get('store').findAll('task');
  }),
});