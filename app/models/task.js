import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations ({
  name: validator('presence', true),
  status: validator('presence', true),
  priority: validator('presence', true),
});

export default DS.Model.extend(Validations, {
  name: DS.attr(),
  status: DS.attr(),
  priority: DS.attr(),
  
  user: DS.belongsTo('user'),
  tasktype: DS.belongsTo('tasktype')
});