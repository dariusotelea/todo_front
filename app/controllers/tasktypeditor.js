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

  tasks: computed(function () {
    return this.get("store").findAll("task");
  }),

  users: computed(function () {
    return this.get("store").findAll("user");
  }),

  tasktypes: computed(function () {
    return this.get("store").findAll("tasktype");
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
      this.toggleProperty('isShowingAddTaskModal');
    },

    toggleAddUserModal: function () {
      this.toggleProperty('isShowingAddUserModal');
    },

    toggleAddTasktypeModal: function () {
      this.toggleProperty('isShowingAddTasktypeModal');
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
