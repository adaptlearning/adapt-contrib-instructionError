import Adapt from 'core/js/adapt';
import data from 'core/js/data';
import QuestionModel from 'core/js/models/questionModel';
import notify from 'core/js/notify';

class InstructionError extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, 'app:dataReady', this.onDataReady);
  }

  onDataReady() {
    this.config = Adapt.course.get('_instructionError');
    if (!this.config?._isEnabled) return;

    this.listenTo(Adapt, 'questionView:showInstructionError', this.onInstructionError);
    data.forEach(model => {
      if (!(model instanceof QuestionModel)) return;
      model.set('_canSubmit', true, { pluginName: 'InstructionError' });
    });
  }

  onInstructionError({ model }) {
    const data = model.toJSON();
    const notifyObject = Object.assign({}, this.config, {
      title: Handlebars.compile(this.config.title)(data),
      body: Handlebars.compile(this.config.body)(data)
    });
    notify.popup(notifyObject);
  }

}

export default new InstructionError();
