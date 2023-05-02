export interface ISectionSettings {
  main_section?: boolean;
}

export class SectionSettings {
  main_section = false;
  min_instances = 1;
  max_instances = 1;

  constructor(item: Partial<ISectionSettings>) {
    Object.assign(this, item)
  }
}

export interface IComplexSectionSettings{
  min_instances: number;
  max_instances: number;
}

export class ComplexSectionSettings {
  min_instances = 1;
  max_instances = 1;

  constructor(item: Partial<IComplexSectionSettings>){
    Object.assign(this, item)
  }
}
