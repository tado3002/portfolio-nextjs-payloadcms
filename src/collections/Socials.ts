import { CollectionConfig } from 'payload'

export const Socials: CollectionConfig = {
  slug: 'socials',
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
      name: 'url',
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
  access: {
    read: () => true,
  },
}
