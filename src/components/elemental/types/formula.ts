export type FormulaItem = {
  text?: string;
  value?: string;
  operation?: boolean;
  option?: string;
  element?: boolean;
  'formula-id'?: string;
};

export type FormulaList = Array<FormulaItem>;
