import { IReferenceDefinition } from '../../reference-definitions/interfaces/reference-definition.interface';
import { IUsers } from '../../../users/interfaces/users.interface';

export interface IReferenceItem {
  title: string;
  data: any;
  reference_definition: IReferenceDefinition;
  user: IUsers;
  updated_at: string;
  created_at: string;
}

export class ReferenceItemAdapter {
  title = '';
  data = {};
  reference_definition: IReferenceDefinition;
  user: IUsers;
  updated_at: string;
  created_at: string;

  constructor(props? : IReferenceItem) {
    Object.assign(this, props)
  }
}


export interface IReferenceItemOutputResult {
  data: IReferenceItem;
}
