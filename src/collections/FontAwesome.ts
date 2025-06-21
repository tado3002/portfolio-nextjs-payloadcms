import { Field } from 'payload'

export const FontAwesomeField: Field = {
  name: 'fontAwesomeIcon',
  label: 'Icon',
  type: 'text',
  validate: (value) => {
    if (!value) {
      return 'Please select an icon'
    }
    return true
  },
  admin: {
    components: {
      Field: '@/components/payload/FontAwesome#Select',
    },
  },
  required: true,
  hasMany: false,
  localized: false,
}
