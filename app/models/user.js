import DS from 'ember-data';
import {buildValidations, validator} from 'ember-cp-validations';

const Validations = buildValidations ({
  name: [
    validator('presence', true),
    validator('length', {
      min: 4
    })
  ]
});

export default DS.Model.extend(Validations, {
  name: DS.attr()
});
