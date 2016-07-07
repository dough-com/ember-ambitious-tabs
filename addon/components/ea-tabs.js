import Ember from 'ember';
import layout from '../templates/components/ea-tabs';

export default Ember.Component.extend({
  layout,
  classNames: ['ea-tabs'],

  children: Ember.computed(() => Ember.A()),
  // 'double buffer': http://gameprogrammingpatterns.com/double-buffer.html
  _bufferedChildren: Ember.computed(() => Ember.A()),

  _actives: Ember.computed.filterBy('children', 'isActive'),

  _fixActives: Ember.observer('_actives.[]', 'children.[]', function () {
    Ember.run.once(this, this._doFixActives)
  }),

  // There can be only one
  _doFixActives () {
    let activesLength = this.get('_actives.length')
    if (activesLength === 1) {
      // Success!
    } else if (activesLength < 1) {
      let child = this.get('children.firstObject')
      child && child.set('isActive', true)
    } else if (activesLength > 1) {
      let extraActives = this.get('_actives').slice(1)
      this.beginPropertyChanges()
      extraActives.forEach((child) => child.set('isActive', false))
      this.endPropertyChanges()
    }
  },

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
    this.setProperties({
      children: children,
      _bufferedChildren: children.copy()
    })
  },

  actions: {
    select (tab) {
      if (tab.get('isActive')) {
        return
      }

      this.beginPropertyChanges()
      this.get('_actives').setEach('isActive', false)
      tab.set('isActive', true)
      this.endPropertyChanges()
    }
  }
});
