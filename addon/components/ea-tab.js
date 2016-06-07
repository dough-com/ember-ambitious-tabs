import Ember from 'ember';
import layout from '../templates/components/ea-tab';

export default Ember.Component.extend({
  layout,
  _parentObserver: Ember.on("init", Ember.observer(function(){
    let parent = this.get("parent")
    parent.get("children").pushObject(this)
  }))
});
