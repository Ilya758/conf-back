import { Sequelize } from 'sequelize';
import { Fn } from 'sequelize/types/utils';

export const arrayAggregate = (
  colName: string,
  aggregateColName: string
): [Fn, string] => [
  Sequelize.fn(
    'array_remove',
    Sequelize.fn('array_agg', Sequelize.fn('DISTINCT', Sequelize.col(colName))),
    null
  ),
  aggregateColName,
];
