import { CollectionConfig } from 'payload'

export const Skills: CollectionConfig = {
  slug: 'skills',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      type: 'relationship',
      relationTo: 'icons',
      required: true,
    },
  ],
  admin: { useAsTitle: 'name' },
}
