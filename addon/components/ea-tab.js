import Ember from 'ember'

export default Ember.Component.extend({
  parent: null,
  classNames: ['ea-tab', 'tabs-panel'],
  classNameBindings: ['isActive'],

  didInsertElement () {
    this._super(...arguments)
    let parent = this.get('parent')
    parent.addTab(this)
  },

  willDestroyElement () {
    this._super(...arguments)
    let parent = this.get('parent')
    parent.removeTab(this)
  },

  isActive: Ember.computed('parent.selected', function () {
    return this === this.get('parent.selected')
  })
})
