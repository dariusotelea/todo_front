import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { filter, filterBy } from '@ember/object/computed';

export default Controller.extend({
  ajax: Ember.inject.service(),

  statusOptions: ['Not started', 'In progress','Ended'],
  priorityOptions: ["Low", "Medium", "High"],

  notStartedTasks: computed('tasks.length', 'tasks.@each.status', function() {
    return this.get('tasks').filterBy('status', 'Not started')
  }),
  
  inProgressTasks: computed('tasks.length', 'tasks.@each.status', function() {
    return this.get('tasks').filterBy('status', 'In progress')
  }),

  endedTasks: computed('tasks.length', 'tasks.@each.status', function() {
    return this.get('tasks').filterBy('status', 'Ended')
  }),

  allTasks: computed('notStartedTasks', 'inProgressTasks', 'endedTasks', function() {
    return this.get('notStartedTasks').length + this.get('inProgressTasks').length + this.get('endedTasks').length;
  }),

  tasks: computed('users', function () {
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

  tasksInProgress: filterBy('tasks', 'status', "In progress"),
  tasksEnded: filterBy('tasks', 'status', 'Ended'),
  tasksNotStarted: filterBy('tasks', 'status', "Not started"),




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
      this.set('isShowingAddTaskModal', true);
    },

    cancelAddTaskModal: function () {
      this.set('isShowingAddTaskModal', false);
      this.get('newTask').deleteRecord();
      
    },

    toggleAddUserModal: function () {
      this.set('isShowingAddUserModal', true);
    },

    cancelAddUserModal: function() {
      this.set('isShowingAddUserModal', false);
      this.get('newUser').deleteRecord();
    },

    toggleAddTasktypeModal: function () {
      this.set('isShowingAddTasktypeModal', true);
    },

    cancelAddTasktypeModal: function() {
      this.set('isShowingAddTasktypeModal', false);
      this.get('newTasktype').deleteRecord();
    },
    
    addTask(task) {
      task.validate()
        .then(({ validations }) => {
          if(validations.get('isValid')) {
            task.save()
            .then(() => this.set('showSaved', true));
            this.set('isShowingAddTaskModal', false);
            this.set('newTask', this.store.createRecord('task'));
          }
          this.set('didValidate', true);
        });   
    },
    
    addUser(user) {
      user.validate()
        .then(({validations}) => {
          if(validations.get('isValid')) {
            user.save()
            .then(() => this.set('showSaved', true));
            this.set('isShowingAddUserModal', false);
            this.set('newUser', this.store.createRecord('user'));
          }
          this.set('didValidate', true);
          
        });
      
    },
    addTasktype(tasktype) {
      tasktype.validate()
        .then(({validations}) => {
          if(validations.get('isValid')) {
            tasktype.save()
            .then(() => this.set('showSaved', true));
            this.set('isShowingAddTasktypeModal', false);
            this.set('newTasktype', this.store.createRecord('tasktype'));
          }
          this.set('didValidate', true);
          
        });
    },
  }
});
