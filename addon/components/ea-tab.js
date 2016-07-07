import Ember from 'ember'

export default Ember.Component.extend({
  classNames: ['ea-tab', 'tabs-panel'],
  classNameBindings: ['isActive'],

  _parentObserver: Ember.on('init', Ember.observer('parent', function () {
    let parent = this.get('parent')
    parent.get('children').pushObject(this)
  })),
  isActive: Ember.computed('parent.selected', function () {
    return this === this.get('parent.selected')
  })
})
