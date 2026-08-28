import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const html = readFileSync(resolve('index.html'), 'utf8')
const document = new DOMParser().parseFromString(html, 'text/html')

describe('site contract', () => {
  it('includes every required navigation destination', () => {
    ;['home', 'about', 'services', 'capabilities', 'contact'].forEach((id) => {
      expect(document.querySelector(`#${id}`)).not.toBeNull()
      expect(document.querySelector(`[href="#${id}"]`)).not.toBeNull()
    })
  })
  it('provides the Netlify form fields and honeypot', () => {
    const form = document.querySelector('form[name="cp-ice-project-enquiry"]')
    expect(form?.getAttribute('data-netlify')).toBe('true')
    expect(form?.getAttribute('netlify-honeypot')).toBe('bot-field')
    ;['name', 'company', 'email', 'phone', 'service', 'message'].forEach((name) => expect(form?.querySelector(`[name="${name}"]`)).not.toBeNull())
  })
  it('does not expose placeholder or coming-soon copy', () => {
    const copy = document.body.textContent.toLowerCase()
    expect(copy).not.toContain('placeholder')
    expect(copy).not.toContain('coming soon')
  })
})

