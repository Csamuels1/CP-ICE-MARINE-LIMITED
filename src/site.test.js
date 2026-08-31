import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const html = readFileSync(resolve('index.html'), 'utf8')
const document = new DOMParser().parseFromString(html, 'text/html')

describe('site contract', () => {
  it('includes every required navigation destination', () => {
    ;['home', 'about', 'services', 'octg-products', 'capabilities', 'contact'].forEach((id) => {
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

  it('publishes the complete approved OCTG catalogue', () => {
    const copy = document.querySelector('#octg-products')?.textContent || ''
    ;[
      '20" 133ppf BTC Casing Pipes',
      '13 3/8" 68ppf K55 BTC Casing Pipes',
      '9 5/8" L80 47ppf Vam Top Casing Pipes',
      '7" 29ppf Vam Top Casing Pipes',
      '3 1/2" L80 9.3ppf CS Hydrill Tubing Pipes',
      '2 7/8" L80 6.5ppf CS Hydril Tubing Pipes',
      '2 3/8" L80 4.7ppf Tubing Pipes',
      'Conductor Pipes',
      'Line Pipes',
      'Drill Pipes',
    ].forEach((product) => expect(copy).toContain(product))
  })

  it('provides eight optimized, accessible gallery slides and their source files', () => {
    const slides = [...document.querySelectorAll('[data-carousel-slide]')]
    const dots = [...document.querySelectorAll('[data-carousel-dots] button')]
    expect(slides).toHaveLength(8)
    expect(dots).toHaveLength(8)
    slides.forEach((slide, index) => {
      const image = slide.querySelector('img')
      const number = String(index + 1).padStart(2, '0')
      expect(image?.getAttribute('loading')).toBe('lazy')
      expect(image?.getAttribute('decoding')).toBe('async')
      expect(image?.getAttribute('alt')).toBeTruthy()
      expect(existsSync(resolve(`public/assets/images/octg/octg-inventory-${number}.webp`))).toBe(true)
      expect(existsSync(resolve(`public/assets/source/octg/octg-inventory-${number}-original.jpeg`))).toBe(true)
    })
    expect(document.querySelector('[data-carousel-previous]')).not.toBeNull()
    expect(document.querySelector('[data-carousel-next]')).not.toBeNull()
    expect(document.querySelector('[data-carousel-status]')?.getAttribute('aria-live')).toBe('polite')
  })

  it('uses the approved title-case company name', () => {
    expect(document.querySelector('.brand__name')?.textContent.replace(/\s+/g, ' ').trim()).toBe('CP Ice Marine Limited')
    expect(document.querySelector('#hero-title')?.textContent.replace(/\s+/g, ' ').trim()).toBe('CP Ice Marine Limited')
    expect(html).not.toContain('CP ICE MARINE')
  })
})
