import Ember from 'ember';
import layout from '../templates/components/ea-tabs';

export default Ember.Component.extend({
  layout,
  classNames: ['ea-tabs'],

  children: Ember.A(),
  // 'double buffer': http://gameprogrammingpatterns.com/double-buffer.html
  _bufferedChildren: Ember.A(),

  addTab (tab) {
    this.get('_bufferedChildren').addObject(tab)
    Ember.run.scheduleOnce('afterRender', this, this._sync)
  },

  removeTab (tab) {
    this.get('_bufferedChildren').removeObject(tab)
    Ember.run.scheduleOnce('afterRender', this, this._sync)
  },

  _sync () {
    let bufferedChildren = this.get('_bufferedChildren')
    this.set('children', bufferedChildren)
    this.set('_bufferedChildren', bufferedChildren.copy())
  },

  actions: {
    select (tab) {
      this.set('selected', tab)
    }
  }
});
