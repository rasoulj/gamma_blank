import {useQuery, cache} from '..';
import {FormulaList} from '../types/formula';
import {useEffect} from 'react';
import {
  create,
  parserDependencies,
  addDependencies,
  divideDependencies,
  bitOrDependencies,
} from 'mathjs';

const math = create({
  parserDependencies,
  addDependencies,
  divideDependencies,
  bitOrDependencies,
});

export default function useFormula() {
  const {data = {}} = useQuery('formula', () => ({}));

  function calculate(formulaList: FormulaList, index?: number) {
    const formula = parseFormula(formulaList, index);

    return evaluate(formula);
  }

  function getFormulaValue(id: string) {
    return data[id];
  }

  function setFormulaValue(id: string, value: string) {
    data[id] = value;

    cache.set('formula', data);
  }

  return {data, calculate, getFormulaValue, setFormulaValue};

  function parseFormula(formulaList: FormulaList, index?: number) {
    return formulaList
      .map(item => {
        if (item.sigma) {
          const firstItem = item.sigma.find(item =>
            Array.isArray(data[item['formula-id']]),
          );

          if (!firstItem) return '0';

          const valueOfFirstItem = data[firstItem['formula-id']];

          const parts = valueOfFirstItem.map((_, index) =>
            parseFormula(item.sigma, index),
          );

          return parts.join('+');
        } else if (item['formula-id']) {
          const value = data[item['formula-id']];

          if (Array.isArray(value)) {
            if (typeof index === 'number') {
              return (value[index] ?? 0).toString().replace(/[^0-9.]/g, '');
            } else {
              return `calc(${JSON.stringify(value)},'${item.option}')`;
            }
          }

          const string = (value ?? 0).toString();
          const isNegative = (string as string).startsWith('-');

          return (isNegative ? '-' : '') + string.replace(/[^0-9.]/g, '');
        }

        return item.value;
      })
      .join('');
  }
}

export function useUpdateFormulaData(props) {
  const formulaId = props['formula-id'];
  const children = props.children;
  const formulaItemIndex = props.formulaItemIndex;
  const data = cache.get('formula').data;

  useEffect(() => {
    if (!formulaId || !data) return;

    if (
      data[formulaId] === children ||
      data[formulaId]?.[formulaItemIndex] === children
    ) {
      return;
    }

    updateFormulaData({
      formulaId,
      formulaItemIndex,
      data,
      children,
    });
  }, [formulaId, children, data, formulaItemIndex]);
}

export function updateFormulaData({
  formulaItemIndex,
  data = cache.get('formula').data || {},
  formulaId,
  children,
}: {
  formulaItemIndex?: number;
  data?: any;
  formulaId: string;
  children: any;
}) {
  if (typeof formulaItemIndex === 'number') {
    if (!Array.isArray(data[formulaId])) data[formulaId] = [];

    data[formulaId][formulaItemIndex] = children;
  } else {
    data[formulaId] = children;
  }

  cache.set('formula', data);
}

function evaluate(formula) {
  const parser = math.parser();

  parser.set('calc', (object, operation) =>
    calculate(JSON.parse(object), operation),
  );

  try {
    return Number(parser.evaluate(formula)).toFixed(2).replace(/\.00$/, '');
  } catch (err) {
    return '0';
  }
}

function calculate(array = [], operation) {
  let result = 0;

  if (array.length === 0) return 0;

  switch (operation) {
    case 'sum':
      result = array.reduce(
        (value, result) => (Number(value) || 0) + Number(result) || 0,
      );
      break;
    case 'minus':
      result = array.reduce(
        (value, result) => (Number(value) || 0) - Number(result) || 0,
      );
      break;
    case 'multiply':
      result = array.reduce(
        (value, result) => (Number(value) || 0) * Number(result) || 0,
      );
      break;
    case 'devide':
      result = array.reduce(
        (value, result) => (Number(value) || 0) / Number(result) || 0,
      );
      break;
    case 'average':
      result = (calculate(array, 'sum') as number) / array.length;
      break;
    case 'minimum':
    case 'min':
      result = Math.min(...array);
      break;
    case 'maximum':
    case 'max':
      result = Math.max(...array);
      break;
    default:
      result = 0;
  }

  if (typeof result !== 'number') result = Number(result || 0);

  return result % 1 !== 0 ? result.toFixed(3) : result || 0;
}
