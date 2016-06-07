import Ember from 'ember';
import layout from '../templates/components/ea-tabs';

export default Ember.Component.extend({
  layout,
  titles: Ember.computed.mapBy('children.[]', 'title'),
  children: Ember.A()
});
