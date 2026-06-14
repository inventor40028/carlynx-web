// Company contact details — single source of truth used by Contacts, Footer,
// Customer Service and Book Appointment pages. Update here once if anything changes.

export const company = {
  name: 'CarLynk Africa',
  tagline: 'Linking Car Owners with Trusted Drivers.',
  email: 'Carlynkafrica@gmail.com',
  phone: '+233 23 475 8519',
  phoneRaw: '+233234758519', // for tel: links
  address: {
    line1: 'Okaitei Nettey Avenue',
    line2: 'Palledium',
    city: 'Accra',
    country: 'Ghana',
  },
  // Social handles. Marketing/backend swaps `href` for real URLs once the
  // handles are live. `key` maps to the brand SVG in components/ui/SocialIcons.
  socials: [
    { key: 'instagram', label: 'Instagram',   href: '#' },
    { key: 'x',         label: 'X (Twitter)', href: '#' },
    { key: 'facebook',  label: 'Facebook',    href: '#' },
    { key: 'linkedin',  label: 'LinkedIn',    href: '#' },
    { key: 'whatsapp',  label: 'WhatsApp',    href: '#' },
  ] as const,
  // Office hours used on the Book Appointment page (weekdays only)
  officeHours: {
    days: 'Monday – Friday',
    timeRange: '9:00 AM – 5:00 PM (GMT)',
  },
};
