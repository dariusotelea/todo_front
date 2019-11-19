import DS from 'ember-data';
import {buildValidations, validator} from 'ember-cp-validations';

const Validations = buildValidations ({
  name:validator('presence', true),
});

export default DS.Model.extend(Validations, {
  name: DS.attr()
});
