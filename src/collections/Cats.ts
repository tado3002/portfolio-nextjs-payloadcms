import { CollectionConfig } from 'payload'

export const Cats: CollectionConfig<'cats'> = {
  slug: 'cats',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'age',
      type: 'number',
      required: true,
    },
  ],
  hooks: {
    beforeChange: [async ({ data, operation }) => {}],
  },
}
