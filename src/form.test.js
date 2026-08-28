import { describe, expect, it } from 'vitest'
import { encodeFormData, validateEnquiry } from './form.js'

describe('enquiry helpers', () => {
  it('encodes the Netlify form contract', () => {
    const data = new FormData()
    data.append('form-name', 'cp-ice-project-enquiry')
    data.append('name', 'Ada Okafor')
    expect(encodeFormData(data)).toContain('form-name=cp-ice-project-enquiry')
    expect(encodeFormData(data)).toContain('name=Ada+Okafor')
  })
  it('rejects missing required values', () => {
    expect(validateEnquiry({})).toEqual({ name: 'Enter your full name.', company: 'Enter your company or organisation.', email: 'Enter your email address.', service: 'Select the service you require.', message: 'Describe your project requirements.' })
  })
  it('accepts a complete project enquiry', () => {
    expect(validateEnquiry({ name: 'Ada', company: 'FieldCo', email: 'ada@example.com', service: 'Dredging Services', message: 'We require channel clearing.' })).toEqual({})
  })
})

