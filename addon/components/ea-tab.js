import Ember from 'ember'

export default Ember.Component.extend({
  parent: null,
  classNames: ['ea-tab', 'tabs-panel'],
  classNameBindings: ['isActive'],
  isActive: false,
  active: Ember.computed.alias('isActive'),
  dasherizedTitle: Ember.computed('title', function () {
    const title = this.get('title')

    if (Ember.isNone(title)) {
      return ''
    }

    return Ember.String.dasherize(title)
  }),

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
