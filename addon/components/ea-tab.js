import Ember from 'ember'

export default Ember.Component.extend({
  parent: null,
  classNames: ['ea-tab', 'tabs-panel'],
  classNameBindings: ['isActive'],
  isActive: false,
  active: Ember.computed.alias('isActive'),

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
})
