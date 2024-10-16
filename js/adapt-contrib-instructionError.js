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
      model.on('change:_isSubmitted', this.resetInstruction.bind(this));
    });
  }

  onInstructionError({ model }) {
    if (this.config._showAsPopup) {
      this.showPopup(model);
      return;
    }

    this.showInlineError(model);
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
    const data = model.toJSON();
    model.toggleClass('has-error', true);

    // Update instruction text
    const dataWithInitial = Object.assign(data, { instruction: model.get('instructionInitial') });
    const instruction = Handlebars.compile(this.config.body)(dataWithInitial);
    model.set('instruction', instruction);

    // Focus on instruction text element
    const $instruction = $(`.${data._id}`).find('.component__instruction').first();
    a11y.focusFirst($instruction, { defer: true });
  }

  resetInstruction(model) {
    model.toggleClass('has-error', false);
    model.set('instruction', model.get('instructionInitial'));
  }

  get config() {
    return Adapt.course.get('_instructionError');
  }
}

export default new InstructionError();
