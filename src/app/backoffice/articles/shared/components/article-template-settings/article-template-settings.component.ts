import { Component, ComponentFactoryResolver, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TemplateSettingsService } from '../../services/template-settings.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ITemplateSettings } from '../../interfaces/template-rules.interface';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ArticleTemplateRuleMethods } from '../../rule-methods/article-template-rule-methods';

@Component({
  selector: 'app-article-template-settings',
  templateUrl: './article-template-settings.component.html',
  styleUrls: ['./article-template-settings.component.scss']
})
export class ArticleTemplateSettingsComponent extends ArticleTemplateRuleMethods implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  rules: ITemplateSettings[] = [];
  ruleKeys: object;
  public articleSettingsForm: FormGroup;
  public selectedRulesForm: FormArray = this.fb.array([])
  public option = new FormControl();
  public selectedRules: ITemplateSettings[] = [];

  @Input() set defaultRules(rules: ITemplateSettings[]){
    if(rules) {
      this.reset();
      setTimeout(() => rules.map(rule => this.addRule(rule)), 500);
    }
  }
  @Output() changes: EventEmitter<object> = new EventEmitter();

  constructor(protected readonly fb: FormBuilder,
              private readonly templateSettingsService: TemplateSettingsService,
              private resolver: ComponentFactoryResolver) {
    super(fb);
  }

  ngOnInit(): void {
    this.rules = this.templateSettingsService.getOptions();
    this.ruleKeys = this.templateSettingsService.getKeys();

    this.articleSettingsForm = this.fb.group({
      options: this.fb.array([]),
    });
    this.selectedRulesForm = this.articleSettingsForm.get('options') as FormArray;

    this.selectedRulesForm.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(data => {
        const result = data.map(item => this.extractConfigData(item));

        this.changes.next(result);
      })
  }

  extractConfigData(item){
    let { data: { config }, data } = JSON.parse(JSON.stringify(item));
    const keys = Object.keys(config);
    keys.forEach(k => config[k] = item[k]);

    return data;
  }

  add(){
    if(this.option.value) {
      this.addRule(this.option.value);
      this.option.setValue(null, {emitEvent: false});
    }
  }

  addRule(rule) {
    this.selectedRules.push(rule);
    this.selectedRulesForm.push(this.createFormItem(rule));
  }

  removeRule(rule, index){
    const { data } = rule;
    this.selectedRules = [...this.selectedRules.filter(r => r.id != data.id)];
    this.selectedRulesForm.removeAt(index);
  }

  createFormItem(data: ITemplateSettings){
    if(this.ruleKeys[data.key]){
      return this[`add${this.ruleKeys[data.key]}Form`](data);
    } else {
      console.error('Missing Rule -> '+data.key, this.ruleKeys)
    }
  }

  reset(){
    this.selectedRules = [];
    this.selectedRulesForm.clear();
  }

  trackByFn(index, control) {
    return control.value.id;
  }

  compFn = ( option, value ) : boolean =>  option && value && option.key === value.key;

  get values(){
    return this.selectedRulesForm.getRawValue();
  }

  get isValid(){
    return this.articleSettingsForm && this.articleSettingsForm.valid;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
