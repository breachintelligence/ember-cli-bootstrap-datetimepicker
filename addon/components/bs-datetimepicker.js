import Ember from 'ember';
import layout from '../templates/components/bs-datetimepicker';

const {
  $,
  Component
} = Ember;

export default Component.extend({
  layout,
  tagName: 'div',
  classNames: ['input-group date'],
  iconClasses: ['glyphicon glyphicon-calendar'],
  iconText: '',

  didInsertElement() {
    this._super(...arguments);
    let { defaults } = $.fn.datetimepicker;

    this.$().datetimepicker({
      date: this.getWithDefault('date', defaults.defaultDate),
      focusOnShow: this.getWithDefault('focusOnShow', defaults.focusOnShow),
      format: this.getWithDefault('format', defaults.format),
      locale: this.getWithDefault('locale', defaults.locale),
      maxDate: this.getWithDefault('maxDate', defaults.maxDate),
      minDate: this.getWithDefault('minDate', defaults.minDate),
      showClear: this.getWithDefault('showClear', defaults.showClear),
      showClose: this.getWithDefault('showClose', defaults.showClose),
      showTodayButton: this.getWithDefault('showTodayButton', defaults.showTodayButton),
      useCurrent: this.getWithDefault('useCurrent', false),
      viewMode: this.getWithDefault('viewMode', defaults.viewMode),
      icons: {
        time: this.getWithDefault('iconTime', defaults.icons.time),
        date: this.getWithDefault('iconDate', defaults.icons.date),
        up: this.getWithDefault('iconUp', defaults.icons.up),
        down: this.getWithDefault('iconDown', defaults.icons.down),
        previous: this.getWithDefault('iconPrevious', defaults.icons.previous),
        next: this.getWithDefault('iconNext', defaults.icons.next),
        today: this.getWithDefault('iconToday', defaults.icons.today),
        clear: this.getWithDefault('iconClear', defaults.icons.clear),
        close: this.getWithDefault('iconClose', defaults.icons.close)
      }
    }).on('dp.change', e => {
      // Convert moment to js date or default to null
      let newDate = e.date && e.date.toDate() || null;

      this.set('date', newDate);
      this.sendAction('change', newDate);
    });

    this.addObserver('date', function() {
      this.$().data('DateTimePicker').date(this.get('date'));
    });

    this.addObserver('maxDate', function() {
      this.$().data('DateTimePicker').maxDate(this.get('maxDate'));
    });

    this.addObserver('minDate', function() {
      this.$().data('DateTimePicker').minDate(this.get('minDate'));
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    this.removeObserver('date');
    this.removeObserver('maxDate');
    this.removeObserver('minDate');

    this.$().data('DateTimePicker').destroy();
  }
});
