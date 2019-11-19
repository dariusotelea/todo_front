import Controller from "@ember/controller";
import { computed } from "@ember/object";

export default Controller.extend({
  ajax: Ember.inject.service(),

  statusOptions: ['Not started', 'In progress','Ended'],
  priorityOptions: ["Low", "Medium", "High"],
  selectedUser: null,
  selectedTask: null,
  selectedTasktype: null,

  isShowingEditTaskModal: null,
  isShowingEditTasktypeModal: null,
  isShowingEditUserModal: null,

  isShowingAddTaskModal: false,
  isShowingAddUserModal: false,
  isShowingAddTasktypeModal: false,

  notStartedTasks: computed('tasks.length', 'tasks.@each.status', function() {
    return this.get('tasks').filterBy('status', 'Not started')
  }),
  inProgressTasks: computed('tasks.length', 'tasks.@each.status', function() {
    return this.get('tasks').filterBy('status', 'In progress')
  }),
  endedTasks: computed('tasks.length', 'tasks.@each.status', function() {
    return this.get('tasks').filterBy('status', 'Ended')
  }),

  tasks: computed(function () {
    return this.get("store").findAll("task");
  }),

  users: computed(function () {
    return this.get("store").findAll("user");
  }),

  tasktypes: computed(function () {
    return this.get("store").findAll("tasktype");
  }),

  validTasktypes: computed('tasktypes.length', function(){
    const validTasktypes = [];
    this.get('tasktypes').then(tasktypes => {
      tasktypes.forEach(function(tasktype) {
        if (tasktype.name != null){
          validTasktypes.pushObject(tasktype);
        }
      });
    });
    return validTasktypes;
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

  actions: {
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

    toggleEditTaskModal: function(task) {
      this.set('selectedTask', task);
      this.toggleProperty('isShowingEditTaskModal');
    },
    
    toggleEditUserModal: function(user) {
      this.set('selectedUser', user);
      this.toggleProperty('isShowingEditUserModal');
    },

    toggleEditTasktypeModal: function(tasktype) {
      this.set('selectedTasktype', tasktype);
      this.toggleProperty('isShowingEditTasktypeModal');
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

    deleteTask(taskId) {
      this.store.findRecord('task', taskId, {backgroundReload:false}).then(function(task){
        task.deleteRecord();
        task.get('isDeleted');
        task.save();
      });
    },

    deleteUser(userId) {
      this.store.findRecord('user', userId, { backgroundReload:false }).then(function(user) {
      user.deleteRecord();
      user.get('isDeleted');
      user.save();
      });
    },

    deleteTasktype(tasktypeId) {
      this.store.findRecord('tasktype', tasktypeId, { backgroundReload: false }).then(function(tasktype){
        tasktype.deleteRecord();
        tasktype.get('isDeleted');
        tasktype.save();
      });
    },

    updateTask(selectedTask) {
      selectedTask.save();
      this.toggleProperty('isShowingEditTaskModal');
    },

    updateUser(selectedUser) {
      selectedUser.save();
      this.toggleProperty('isShowingEditUserModal');
    },

    updateTasktype(selectedTasktype) {
      
      selectedTasktype.save();
      this.toggleProperty('isShowingEditTasktypeModal');
    }

   

 




  }


});
