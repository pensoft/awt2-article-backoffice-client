import { ITemplateSettings } from '../interfaces';
import { getUniqueIdWithPrefix } from '@metronic/kt/_utils';
import { FormBuilder, Validators } from '@angular/forms';
import { atLeastOne } from '@shared/validators/form-validators/at-least-one.validators';

export class ArticleTemplateRuleMethods {

  constructor(protected readonly fb: FormBuilder) {
  }

  addRuleConfigBasicForm(data: ITemplateSettings){
    return this.fb.group({
      data,
      id: getUniqueIdWithPrefix('rule'),
      value: this.fb.control(data.config.value || 0, [Validators.required])
    })
  }

  addRuleConfigParameterForm(data: ITemplateSettings){
    return this.fb.group({
      data,
      id: getUniqueIdWithPrefix('rule'),
      value: this.fb.control(data.config.value || 0, [Validators.required]),
      amount: this.fb.control(data.config.amount || 0, [Validators.required]),
      parameterName: this.fb.control(data.config.parameterName || null, [Validators.required])
    })
  }

  addRuleConfigMinMaxBasicForm(data: ITemplateSettings){
    return this.fb.group({
      data,
      id: getUniqueIdWithPrefix('rule'),
      min: this.fb.control(data.config.min, []),
      max: this.fb.control(data.config.max, []),
    }, { validator: atLeastOne('min','max') })
  }

  addRuleConfigMinMaxSectionInstancesForm(data: ITemplateSettings){
    return this.fb.group({
      data,
      id: getUniqueIdWithPrefix('rule'),
      min: this.fb.control(data.config.min, []),
      max: this.fb.control(data.config.max, []),
      names: this.fb.control(data.config.names || null, [Validators.required]),
      expressions: this.fb.control(data.config.expressions || null, [Validators.required])
    }, { validator: atLeastOne('min','max') })
  }

  addRuleConfigPositionSectionsForm(data: ITemplateSettings){
    return this.fb.group({
      data,
      id: getUniqueIdWithPrefix('rule'),
      names: this.fb.control(data.config.names || null, [Validators.required]),
      expressions: this.fb.control(data.config.expressions || null, [Validators.required])
    })
  }
}
