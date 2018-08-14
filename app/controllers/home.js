import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({
  ajax: Ember.inject.service(),

  tasks: computed(function () {
    return this.get('store').findAll('task');
  }),

  users: computed(function () {
    return this.get('store').findAll('user');
  }),

  tasktypes: computed(function () {
    return this.get('store').findAll('tasktype');
  }),

  newTask: computed(function () {
    return this.store.createRecord('task');
  }),

  newUser: computed(function () {
    return this.store.createRecord('user');
  }),

  newTasktype: computed(function () {
    return this.store.createRecord('tasktype');
  }),


  tasksFiltered: null,
  isShowingAddTaskModal: false,
  isShowingAddUserModal: false,
  isShowingAddTasktypeModal: false,



  actions: {
    getTasksByTasktypeId(tasktype) {
      this.set('tasksFiltered', tasktype.get('tasks'))
    },

    toggleAddTaskModal: function () {
      this.toggleProperty('isShowingAddTaskModal');
    },

    toggleAddUserModal: function () {
      this.toggleProperty('isShowingAddUserModal');
    },

    toggleAddTasktypeModal: function () {
      this.toggleProperty('isShowingAddTasktypeModal');
    },

    addTask(task) {
      task.save()
    }
  }
});
