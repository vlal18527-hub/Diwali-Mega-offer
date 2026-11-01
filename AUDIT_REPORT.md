# Diwali Spin – Launch Audit Report

**Verdict: abhi market me launch NAHI karna chahiye.**
Design aur mobile layout ab theek hain, lekin game ka core (wheel, winners, vouchers) logon ko dhokha deta hai. Yeh legal aur reputation risk hai. Neeche sab kuch hai.

---
## A. Jo maine fix kar diya (is zip me hai)
| # | Fix |
|---|-----|
| 1 | Mobile header aur bottom bar overflow theek (360, 390, 820, 1366px par test) |
| 2 | Auto device mode: phone = mobile site, tablet/laptop = browser site |
| 3 | "Play & Spin Now" banner ke beech me |
| 4 | Banner image HTML ke andar embed (alag PNG nahi chahiye) |
| 5 | Share buttons: WhatsApp, Telegram, Facebook, Instagram, text ek line me |
| 6 | Share link galat ("nullsrcdoc?ref=") theek, `CONFIG.PUBLIC_URL` add |
| 7 | Share count ab tabhi badhta hai jab user share app kholkar wapas aaye, ya phone ka share menu poora kare. Sirf click ya Copy se count nahi. 8 sec cooldown |
| 8 | Purana nakli 10/10 unlock one-time reset. Har bonus spin ke liye 10 NAYE share |
| 9 | Hindi text chhota aur saaf, galat error messages theek |
| 10 | Security: user ke naam se HTML/script chalne ka bug (XSS) band |
| 11 | Sideways scroll hata diya |

---
## A2. Naya: Voucher + Rewards page (round 2)
- **Pehla spin** abhi bhi "Better Luck Next Time" aata hai.
- **10 asli shares poore hote hi** ek voucher mil jaata hai (har naye 10 shares par agla voucher).
- Naya page **`rewards.html`** ("मेरे वाउचर"): har voucher ka naam, code (Copy button), milne ki tarikh, Valid Till, bache din, status (चालू / समाप्त), aur kul/chalu count. Voucher na ho to khaali screen "10 shares karo".
- Vouchers `index.html` ke `CONFIG.VOUCHER_POOL` se aate hain. **Abhi us me 3 DEMO vouchers hain** jin par page par laal "DEMO - asli voucher nahi" likha aata hai. **Apne ASLI vouchers daalo aur `demo:true` hata do.** Maine koi code ya brand voucher khud nahi banaya.
- Validity: `VOUCHER_VALID_DAYS` (abhi 30 din).
- Dono files ek hi folder me rakho (`index.html` aur `rewards.html`) aur same domain par host karo.
- Test: 9 share = 0 voucher, 10 share = 1 voucher, 11vaan share = naya nahi, naya 10 = doosra voucher. Expired voucher "समाप्त" dikhta hai. HTML injection band. 360/390/820/1366px par overflow nahi.

**Rewards ke baare me zaroori chetavani**
1. `VOUCHER_POOL` ke code page source me dikhte hain. Koi bhi "View Source" karke saare code nikal sakta hai, aur share count browser me hi hota hai. **Keemti asli vouchers ke liye server zaroori hai** jo har user ko code tabhi de jab uske 10 verified referrals ho.
2. Voucher sirf asli ho. Agar asli voucher nahi hai to "voucher mila" dikhana logon ko dhokha dena hai.
3. Wheel par ab bhi Amazon/Flipkart/24K Gold likha hai jo kabhi nahi milte. Is wheel ko badalna (Section B) ab bhi baaki hai, warna voucher feature ke saath bhi page bhramak rahega.

---
## A3. Naye pages (round 3): AdSense ke liye
Naye files: `privacy-policy.html`, `terms.html`, `about.html`, `contact.html`, `how-it-works.html` (Spin & Voucher Rules / Redemption), `legal.css`, `site.js`. Footer me sab ke links hain.

**Pehle `site.js` kholkar apni ASLI details bharo** (naam, email, address, grievance officer, jurisdiction, domain). Jab tak khaali hain, pages par laal "[ADD EMAIL in site.js]" dikhta hai. AdSense ko asli contact chahiye. Maine koi naam, email ya address khud nahi banaya.

**Rules page jhooth nahi bolta:** usme likha hai ki pehla spin hamesha "Better Luck Next Time" hai, wheel/banner ke brand naam decoration hain, voucher 10-share referral reward se milta hai, share kaise gine jaate hain, redeem kaise karna hai. Isliye maine "Genuine Spin & Win" jaisi koi line nahi likhi, kyunki abhi wheel genuine random nahi hai.

**AdSense ki sachchai (zaroori):**
- Google *misleading/deceptive* content aur jhoothe inaam wale pages reject karta hai. Wheel par brand inaam jo kabhi nahi milte, aur fake winners wale popups reject ya baad me ban karwa sakte hain.
- Policy pages akeli kaafi nahi. Site par original, kaam ka content chahiye. Abhi site ek hi page ka game hai (thin content).
- Apna **domain + HTTPS** chahiye. Free hosting subdomain par aksar approval nahi milta.
- "Get Code" button aur 3 DEMO vouchers production me hatao.
- Site par **Ads** dalne se pehle privacy policy me ads wala section already hai. India ke bahar (EU/UK) ke visitors ke liye consent banner (CMP) alag se chahiye.
- Ek real approval ke liye aapko: (1) fake winners hatane, (2) wheel ke brand labels hatane ya asli inaam banane, (3) kuch original content pages (jaise Diwali ke baare me articles) banane padenge.

---
## B. LAUNCH BLOCKERS (inke bina launch mat karo)
1. **Wheel rigged hai.** `spin()` hamesha "Better Luck Next Time" (`BETTER_LUCK_INDEX = 3`) par rukta hai. Wheel par Amazon ₹500, Flipkart ₹500, 24K Gold dikhte hain jo kabhi nahi milte.
2. **Fake winners.** `DUPLICATE_PLAYERS` aur ticker me banaye hue naam ("Rahul Sharma won Amazon ₹500 • Just now"). Yeh jhootha social proof hai.
3. **Brand misuse.** Amazon aur Flipkart ke naam/prize bina permission. Trademark aur misleading-ad risk.
4. **Share-for-spin loop.** 10 share ke baad bhi spin haarta hai. Yeh logon se shares nikalwane ka funnel ban jaata hai.
5. **"Only for fun" notice chhupa hai** footer me collapsed. Hona chahiye upar, saaf dikhne wala.
6. **Koi Privacy Policy / Terms nahi.** Naam aur username le rahe ho. Kam se kam privacy policy, terms, contact/grievance email chahiye.
7. **Koi backend nahi** (`API_URL` khali). Data sirf user ke browser me. Asli referral track, abuse rokna, ya winner ko inaam dena possible nahi.

**Is par kya karna hai (options):**
- *Option 1 (recommended):* Sirf coins/badges wala game. Brand naam hatao, fake winners hatao, wheel asli random ya saaf "sirf manoranjan" likho.
- *Option 2:* Asli giveaway. Asli voucher, asli random ya asli rules, winners ki list jo sach ho, server ke saath, terms ke saath.

---
## C. Important (launch se pehle)
- **Legal (India):** dark-pattern rules (Consumer Protection), ASCI advertising rules, aur online gaming kanoon par kisi lawyer se salah lo. Main lawyer nahi hu, yeh sirf checklist hai.
- **"Get Code" button** poora source code public dikhata hai. Production me hata do.
- **Result Date "30 November 2026"** hardcoded hai. Agar koi asli result nahi hoga to date mat dikhao.
- **Share verification limit:** browser WhatsApp ke andar nahi dekh sakta. Asli proof ke liye server par referral link se aaye naye users ginne padenge.
- **Coins/Diya/Kahani** sab localStorage me hain, user console se badal sakta hai. Inka koi asli value nahi hona chahiye.
- **Google Fonts** external hai (privacy + speed). Self-host karna behtar.
- **Cookie/data notice** (localStorage use hota hai).

## D. Chhote improvements
- `<h1>` nahi hai (SEO aur accessibility). Add karo.
- 2 buttons 32px se chhote (tap target 44px hona chahiye).
- `og:title`, `og:image`, favicon, `robots` meta add karo (share preview ke liye).
- Hindi aur English/Hinglish mix hai. Ek style chuno.
- Banner image ab ~250KB (webp). Original PNG 2.5MB tha, use mat chalao.
- Page 1 hi HTML file me hai (~450KB). Launch ke liye CSS/JS alag files me karo.
- Real devices (iPhone Safari, Android Chrome) par test nahi hua. Sirf headless Chrome me test hua.

## E. Launch checklist
- [ ] Blockers 1-7 hal
- [ ] Privacy Policy, Terms, contact email
- [ ] Domain + HTTPS, `PUBLIC_URL` set
- [ ] Get Code button hataya
- [ ] Real phone testing
- [ ] Legal review
