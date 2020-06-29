define([
  'core/js/adapt',
  'core/js/models/questionModel'
],function(Adapt, QuestionModel) {

  class InstructionError extends Backbone.Controller {

    initialize() {
      this.listenTo(Adapt, 'app:dataReady', this.onDataReady);
    }

    onDataReady() {
      this.config = Adapt.course.get('_instructionError');
      if (!this.config || !this.config._isEnabled) {
        return;
      }
      this.listenTo(Adapt, 'questionView:showInstructionError', this.onInstructionError);
      Adapt.data.forEach(model => {
        if (!(model instanceof QuestionModel)) {
          return;
        }
        model.set('_canSubmit', true, { pluginName: 'InstructionError' });
      });
    }

    onInstructionError({ model }) {
      const data = model.toJSON();
      const notifyObject = Object.assign({}, this.config, {
        title: Handlebars.compile(this.config.title)(data),
        body: Handlebars.compile(this.config.body)(data)
      });
      Adapt.notify.popup(notifyObject);
    }

  }

  new InstructionError();

  return InstructionError;

});
