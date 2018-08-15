import Controller from "@ember/controller";
import { computed } from "@ember/object";

export default Controller.extend({


  selectedUser: null,
  selectedTask: null,
  selectedTasktype: null,

  isShowingEditTaskModal: null,
  isShowingEditTasktypeModal: null,
  isShowingEditUserModal: null,

  tasks: computed(function () {
    return this.get("store").findAll("task");
  }),

  users: computed(function () {
    return this.get("store").findAll("user");
  }),

  tasktypes: computed(function () {
    return this.get("store").findAll("tasktype");
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
      debugger
      this.set('selectedTask', task);
      this.toggleProperty('isShowingEditTaskModal');
    },

    toggleEditUserModal: function() {
      this.toggleProperty('isShowingEditUserModal');
    },

    toggleEditTasktypeModal: function() {
      this.toggleProperty('isShowingEditTasktypeModal');
    },

    updateTask(selectedTask) {
      selectedTask.save();
      this.toggleProperty('isShowingEditTaskModal');
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
