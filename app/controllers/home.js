import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({
  ajax: Ember.inject.service(),

  statusOptions: ['Not started', 'In progress','Ended'],
  priorityOptions: ["Low", "Medium", "High"],

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
    sendRequest() {
      return this.get('ajax').request('tasks/create_report', {
        method: 'GET'       
      });
    },

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
      task.validate()
        .then(({validations}) => {
          if(validations.get('isValid')) {
            task.save()
            .then(() => this.set('showSaved', true));
          }
          this.set('didValidate', true);
          this.send('toggleAddTaskModal')
        });
      
    },

   

    addUser(user) {
      user.validate()
        .then(({validations}) => {
          if(validations.get('isValid')) {
            user.save()
            .then(() => this.set('showSaved', true));
          }
          this.set('didValidate', true);
          this.send('toggleAddUserModal');
        });
      
    },

    addTasktype(tasktype) {
      tasktype.validate()
        .then(({validations}) => {
          if(validations.get('isValid')) {
            tasktype.save()
            .then(() => this.set('showSaved', true));
          }
          this.set('didValidate', true);
          this.send('toggleAddTasktypeModal');
        });
    }
  }
});
