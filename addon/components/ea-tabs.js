import Ember from 'ember';
import layout from '../templates/components/ea-tabs';

export default Ember.Component.extend({
  layout,
  classNames: ['ea-tabs'],

  children: Ember.A(),
  // 'double buffer': http://gameprogrammingpatterns.com/double-buffer.html
  _bufferedChildren: Ember.A(),

  active: null,

  _updateActive: Ember.observer('children.[]', function () {
    let children = this.get('children')
    if (!children.contains(this.get('active'))) {
      this.set('active', children.objectAt(0))
    }
  }),

  addTab (tab) {
    this.get('_bufferedChildren').addObject(tab)
    Ember.run.scheduleOnce('afterRender', this, this._sync)
  },

  removeTab (tab) {
    this.get('_bufferedChildren').removeObject(tab)
    Ember.run.scheduleOnce('afterRender', this, this._sync)
  },

  _sync () {
    let children = this.get('_bufferedChildren')
    this.set('children', children)
    this.set('_bufferedChildren', children.copy())
  },

  actions: {
    select (tab) {
      this.set('active', tab)
    }
  }
});
