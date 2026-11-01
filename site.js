/* ============ SITE DETAILS – SIRF YAHAN EK BAAR BADLO ============
   Yeh details sabhi pages (Privacy, Terms, About, Contact, Rules) me apne aap bhar jaati hain.
   AdSense ke liye ASLI naam, email aur address zaroori hai. */
window.SITE = {
  name:        'Diwali Spin & Win',
  owner:       'Virendra lal',     // e.g. 'Rahul Sharma' ya aapki company ka naam
  email:       'vlal18527@gmail.com',     // e.g. 'support@yourdomain.com'
  address:     'New Delhi',     // e.g. 'City, State, India'
  domain:      'https://diwali-mega-offer.vercel.app/',     // e.g. 'https://yourdomain.com'
  grievance:   'Virendra lal ',     // Grievance Officer ka naam (India ke liye recommended)
  jurisdiction:'New Delhi',     // e.g. 'Mumbai, Maharashtra'
  updated:     '1 November 2026'
};
document.addEventListener('DOMContentLoaded', () => {
  const S = window.SITE;
  document.querySelectorAll('[data-site]').forEach(el => {
    const k = el.getAttribute('data-site');
    const v = S[k];
    if (v) {
      if (k === 'email') { el.innerHTML = '<a href="mailto:' + v + '">' + v + '</a>'; }
      else el.textContent = v;
    } else {
      el.innerHTML = '<span class="ph">[ADD ' + k.toUpperCase() + ' in site.js]</span>';
    }
  });
});
