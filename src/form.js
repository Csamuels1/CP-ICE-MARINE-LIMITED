export function encodeFormData(formData) {
  return new URLSearchParams([...formData.entries()]).toString()
}

export function validateEnquiry(values) {
  const errors = {}
  if (!values.name?.trim()) errors.name = 'Enter your full name.'
  if (!values.company?.trim()) errors.company = 'Enter your company or organisation.'
  if (!values.email?.trim()) errors.email = 'Enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.'
  if (!values.service?.trim()) errors.service = 'Select the service you require.'
  if (!values.message?.trim()) errors.message = 'Describe your project requirements.'
  return errors
}

