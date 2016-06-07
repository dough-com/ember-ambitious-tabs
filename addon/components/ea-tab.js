import Ember from 'ember';
import layout from '../templates/components/ea-tab';

export default Ember.Component.extend({
  layout,
  classNames: ["ea-tab", "tabs-panel"],
  classNameBindings: ["isActive:is-active:"],

  _parentObserver: Ember.on("init", Ember.observer('parent', function(){
    let parent = this.get("parent")
    parent.get("children").pushObject(this)
  })),
  isActive: Ember.computed('parent.selected', function(){
    return this === this.get('parent.selected')
  })
});
