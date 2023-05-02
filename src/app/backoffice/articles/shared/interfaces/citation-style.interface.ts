export interface ICitationStyle {
  id: number;
  name: string;
  title: string;

}

export class CitationStyleAdapter {
  id: number;
  name: string;
  title: string;

  constructor(item: Partial<ICitationStyle>) {
    Object.assign(this, item)
  }
}
