import './styles.css'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Anchor, ArrowDownRight, ArrowRight, ArrowUpRight, Building2, Clock3,
  Construction, Cylinder, Handshake, Landmark, Mail, MapPin, Network,
  Phone, Send, ShieldCheck, Ship, UserRound, Waves, Workflow, createIcons,
} from 'lucide'
import { encodeFormData, validateEnquiry } from './form.js'

gsap.registerPlugin(ScrollTrigger)
createIcons({ icons: { Anchor, ArrowDownRight, ArrowRight, ArrowUpRight, Building2, Clock3, Construction, Cylinder, Handshake, Landmark, Mail, MapPin, Network, Phone, Send, ShieldCheck, Ship, UserRound, Waves, Workflow } })

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const header = document.querySelector('[data-header]')
const menuToggle = document.querySelector('.menu-toggle')
const menu = document.querySelector('.nav-menu')
const navLinks = [...document.querySelectorAll('[data-nav-link]')]
const sections = [...document.querySelectorAll('main section[id]')]

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false')
  menuToggle.setAttribute('aria-label', 'Open navigation menu')
  menu.classList.remove('is-open')
  document.body.classList.remove('menu-open')
}

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true'
  menuToggle.setAttribute('aria-expanded', String(open))
  menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu')
  menu.classList.toggle('is-open', open)
  document.body.classList.toggle('menu-open', open)
})
navLinks.forEach((link) => link.addEventListener('click', closeMenu))
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu() })

const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 36)
window.addEventListener('scroll', updateHeader, { passive: true })
updateHeader()

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
  if (!visible) return
  navLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${visible.target.id}`
    link.classList.toggle('is-active', active)
    if (active) link.setAttribute('aria-current', 'location')
    else link.removeAttribute('aria-current')
  })
}, { rootMargin: '-28% 0px -58%', threshold: [0.05, 0.3, 0.6] })
sections.forEach((section) => sectionObserver.observe(section))

let lenis
if (!reducedMotion) {
  lenis = new Lenis({ duration: 1.25, smoothWheel: true })
  const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
  requestAnimationFrame(raf)
  lenis.on('scroll', ScrollTrigger.update)
}

function initAnimations() {
  const loader = document.querySelector('.loader')
  if (reducedMotion) {
    loader.remove()
    document.body.classList.add('is-ready')
    return
  }
  document.body.classList.add('is-loading')
  const intro = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      document.body.classList.remove('is-loading')
      document.body.classList.add('is-ready')
      loader.remove()
    },
  })
  intro
    .from('.loader__panel img', { opacity: 0, scale: 0.85, duration: 1.25 })
    .from('.loader__line', { scaleX: 0, transformOrigin: 'left', duration: 0.8 }, '-=0.35')
    .from('.loader__panel p', { opacity: 0, y: 18, duration: 0.55 }, '-=0.4')
    .to('.loader', { yPercent: -100, duration: 0.8, delay: 0.3, ease: 'power4.inOut' })
    .from('.hero__eyebrow', { opacity: 0, y: 30, duration: 0.65 }, '-=0.1')
    .from('.hero h1 span, .hero h1 strong', { opacity: 0, x: -80, duration: 1, stagger: 0.2, ease: 'power4.out' }, '-=0.3')
    .from('.hero__rule', { scaleX: 0, transformOrigin: 'left', duration: 0.5 }, '-=0.55')
    .from('.hero__subheading, .hero__lead, .hero__actions', { opacity: 0, y: 30, duration: 0.8, stagger: 0.16 }, '-=0.35')

  gsap.utils.toArray('.reveal').forEach((element) => {
    gsap.from(element, { opacity: 0, y: 48, duration: 1.05, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 82%', once: true } })
  })
  gsap.utils.toArray('[data-count]').forEach((counter) => {
    const state = { value: 0 }
    const target = Number(counter.dataset.count)
    const suffix = counter.dataset.suffix || ''
    gsap.to(state, { value: target, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: counter, start: 'top 94%', once: true }, onUpdate: () => { counter.textContent = `${Math.round(state.value)}${suffix}` } })
  })
}
window.addEventListener('load', initAnimations, { once: true })

document.addEventListener('visibilitychange', () => {
  if (!lenis) return
  if (document.hidden) lenis.stop()
  else lenis.start()
})

const form = document.querySelector('.enquiry-form')
const status = form.querySelector('.form-status')

function displayErrors(errors) {
  form.querySelectorAll('.form-field').forEach((field) => {
    const control = field.querySelector('input, select, textarea')
    const error = field.querySelector('.field-error')
    const message = errors[control.name] || ''
    field.classList.toggle('has-error', Boolean(message))
    control.setAttribute('aria-invalid', String(Boolean(message)))
    error.textContent = message
  })
}

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const formData = new FormData(form)
  const errors = validateEnquiry(Object.fromEntries(formData.entries()))
  displayErrors(errors)
  status.className = 'form-status'
  status.textContent = ''
  if (Object.keys(errors).length) {
    status.classList.add('is-error')
    status.textContent = 'Please review the highlighted fields and try again.'
    form.querySelector('.has-error input, .has-error select, .has-error textarea')?.focus()
    return
  }
  const button = form.querySelector('button[type="submit"]')
  button.disabled = true
  button.querySelector('span').textContent = 'Sending Enquiry'
  try {
    const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encodeFormData(formData) })
    if (!response.ok) throw new Error('Submission failed')
    form.reset()
    displayErrors({})
    status.classList.add('is-success')
    status.textContent = 'Your project enquiry has been received. Our team will respond within 24 business hours.'
    button.querySelector('span').textContent = 'Enquiry Sent'
  } catch {
    status.classList.add('is-error')
    status.innerHTML = 'We could not send your enquiry. Please retry or email <a href="mailto:icemarinesev@gmail.com">icemarinesev@gmail.com</a>.'
    button.querySelector('span').textContent = 'Send Project Enquiry'
  } finally {
    button.disabled = false
    window.setTimeout(() => { button.querySelector('span').textContent = 'Send Project Enquiry' }, 3200)
  }
})
