import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  status: DS.attr(),
  priority: DS.attr(),
  user: DS.belongsTo('user'),
  category: DS.belongsTo('category')
});