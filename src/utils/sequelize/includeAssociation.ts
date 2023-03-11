import { Includeable, IncludeOptions } from 'sequelize';

export const includeAssociation = (
  model: IncludeOptions['model'],
  as: string
): Includeable => ({
  model,
  as,
  attributes: [],
  through: {
    attributes: [],
  },
});
