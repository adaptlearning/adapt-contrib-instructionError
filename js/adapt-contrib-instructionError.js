import Adapt from 'core/js/adapt';
import a11y from 'core/js/a11y';
import data from 'core/js/data';
import QuestionModel from 'core/js/models/questionModel';
import notify from 'core/js/notify';

class InstructionError extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, 'app:dataReady', this.onDataReady);
  }

  onDataReady() {
    if (!this.config?._isEnabled) return;

    this.listenTo(Adapt, 'questionView:showInstructionError', this.onInstructionError);
    data.forEach(model => {
      if (!(model instanceof QuestionModel)) return;
      model.set('_canSubmit', true, { pluginName: 'InstructionError' });
      model.set('instructionInitial', model.get('instruction'));
      model.on('change:_isComplete', this.resetInstruction.bind(this));
    });
  }

  onInstructionError({ model }) {
    if (this.config._disablePopup) {
      this.showInlineError(model);
      return;
    }
    this.showPopup(model);
  }

  showPopup(model) {
    const data = model.toJSON();
    const notifyObject = Object.assign({}, this.config, {
      title: Handlebars.compile(this.config.title)(data),
      body: Handlebars.compile(this.config.body)(data)
    });
    notify.popup(notifyObject);
  }

  showInlineError(model) {
    this.addErrorClass(model);

    // Update instruction text
    const dataWithInitial = Object.assign(data, { instruction: model.get('instructionInitial') });
    const instruction = Handlebars.compile(this.config.body)(dataWithInitial);
    model.set('instruction', instruction);

    // Focus on instruction text element
    const $instruction = $(`.${data._id}`).find('.component__instruction').first();
    a11y.focusFirst($instruction, { defer: true });
  }

  addErrorClass(model) {
    const data = model.toJSON();
    const classes = [
      data._classes,
      'has-error'
    ].filter(Boolean).join(' ');
    model.set('_classes', classes);
  }

  removeErrorClass(model) {
    const data = model.toJSON();
    const classesArr = data._classes.split(' ');
    const classes = classesArr.filter(name => name !== 'has-error').join(' ');
    model.set('_classes', classes);
  }

  resetInstruction(model) {
    this.removeErrorClass(model);
    model.set('instruction', model.get('instructionInitial'));
  }

  get config() {
    return Adapt.course.get('_instructionError');
  }
}

export default new InstructionError();
