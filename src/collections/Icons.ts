import { CollectionConfig } from 'payload'

export const Icons: CollectionConfig = {
  slug: 'icons',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'value',
      type: 'text',
      required: true,
    },
  ],
  access: {
    read: () => true,
  },
}
