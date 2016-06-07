import Ember from 'ember';
import layout from '../templates/components/ea-tabs';

export default Ember.Component.extend({
  layout,
  children: Ember.A(),
  classNames: ["ea-tabs"],

  actions: {
    select(tab){
      this.set('selected', tab)
    }
  }
});
