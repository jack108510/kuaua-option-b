const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Extract all img tags with src and alt
const imgs = [];
const re = /<img[^>]*src="(data:image\/[^;"]+;base64,[^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/g;
let m;
while ((m = re.exec(html)) !== null) {
  imgs.push({ src: m[1], alt: m[2] });
}

// Find by alt text
function imgByAlt(alt) {
  return imgs.find(i => i.alt === alt) || imgs[0];
}

// Categorize images
const nature = [
  imgByAlt('Lush tropical waterfall cascading into a turquoise pool'),
  imgByAlt('Aerial view of sandy beach and turquoise waters'),
  imgByAlt('Rainbow over rocky coastline with crashing waves'),
  imgByAlt('Heart-shaped rock formation by the ocean'),
  imgByAlt('Winding rural road with stone walls and green pastures'),
  imgByAlt('Pacific sunset'),
  imgByAlt('Coastal ocean view'),
  imgByAlt('Tropical courtyard'),
];

const property = [
  imgByAlt('Exterior'),
  imgByAlt('Pool'),
  imgByAlt('Living'),
  imgByAlt('Kitchen'),
  imgByAlt('Bedroom'),
  imgByAlt('Lanai'),
  imgByAlt('Bathroom'),
  imgByAlt('Cottage'),
];

const pool = [
  imgByAlt('Infinity pool overlooking the ocean'),
  imgByAlt('Golden hour pool with bougainvillea'),
  imgByAlt('Pool reflecting the sun and sky'),
];

const explore = [
  imgByAlt('Coastal ocean view from the property'),
  imgByAlt('Nearby golf course with ocean and mountain views'),
  imgByAlt('Sunset over the Pacific'),
  imgByAlt('Local cultural gathering near the property'),
  imgByAlt('Golf course views'),
];

// Extract booking JS (from <script> to </script>)
const jsMatch = html.match(/<script>\s*\n\nconst SUPABASE_URL[\s\S]*?<\/script>/);
const bookingJS = jsMatch ? jsMatch[0] : '';

const newHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Your Maui Retreat</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --forest:#1a3c2a;--teal:#2d6a6a;--leaf:#3d7a4a;
  --sand:#f5f0e6;--gold:#d4a853;--dark:#1a1a1a;
  --seafoam:#e0f4f0;--cream:#faf7f0;--moss:#4a7c59;
}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;color:var(--dark);background:var(--cream);line-height:1.7;overflow-x:hidden}
h1,h2,h3,h4{font-family:'Playfair Display',serif;font-weight:600}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:20px 40px;display:flex;justify-content:space-between;align-items:center;transition:background .4s,backdrop-filter .4s}
nav.scrolled{background:rgba(26,60,42,.92);backdrop-filter:blur(12px)}
.nav-logo{font-family:'Playfair Display',serif;font-size:1.3rem;color:#fff;letter-spacing:.5px;text-decoration:none}
.nav-links{display:flex;gap:28px;list-style:none}
.nav-links a{text-decoration:none;color:rgba(255,255,255,.8);font-size:.85rem;font-weight:400;letter-spacing:.5px;text-transform:uppercase;transition:color .3s}
.nav-links a:hover{color:#fff}
.hamburger{display:none;background:none;border:none;color:#fff;font-size:1.2rem;cursor:pointer;padding:8px}
@media(max-width:768px){
  .nav-links{display:none;position:absolute;top:100%;left:0;right:0;background:rgba(26,60,42,.97);flex-direction:column;padding:20px 24px;gap:16px}
  .nav-links.open{display:flex}
  .hamburger{display:block}
  nav{padding:16px 20px}
}

/* HERO */
.hero{position:relative;height:100vh;min-height:600px;overflow:hidden;display:flex;align-items:center;justify-content:center}
.hero-bg{position:absolute;inset:0;background-size:cover;background-position:center;background-attachment:fixed}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(26,60,42,.35) 0%,rgba(26,26,26,.5) 100%)}
.hero-content{position:relative;z-index:2;text-align:center;color:#fff;padding:0 24px;max-width:700px}
.hero-content h1{font-size:clamp(2.8rem,6vw,5rem);font-weight:700;line-height:1.1;margin-bottom:16px;letter-spacing:-1px}
.hero-content p{font-size:clamp(1rem,2vw,1.3rem);font-weight:300;letter-spacing:2px;text-transform:uppercase;opacity:.85;margin-bottom:40px}
.hero-cta{display:inline-block;padding:16px 48px;background:transparent;border:2px solid rgba(255,255,255,.6);color:#fff;text-decoration:none;font-size:.9rem;font-weight:500;letter-spacing:2px;text-transform:uppercase;transition:all .4s}
.hero-cta:hover{background:rgba(255,255,255,.15);border-color:#fff}
.hero-scroll{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,.6);font-size:.75rem;letter-spacing:2px;text-transform:uppercase;animation:float 3s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-8px)}}

/* SECTIONS */
.section{padding:120px 0}
.section-dark{background:var(--forest);color:#fff}
.section-teal{background:var(--teal);color:#fff}
.section-sand{background:var(--sand)}
.section-seafoam{background:var(--seafoam)}
.container{max-width:1100px;margin:0 auto;padding:0 32px}
.container-narrow{max-width:720px;margin:0 auto;padding:0 32px}

/* THE ISLAND */
.island-text{font-size:1.15rem;line-height:2;max-width:640px}
.island-text p{margin-bottom:24px}
.island-split{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
@media(max-width:768px){.island-split{grid-template-columns:1fr;gap:40px}}
.label{font-size:.75rem;letter-spacing:3px;text-transform:uppercase;color:var(--teal);font-weight:600;margin-bottom:12px}
.section-dark .label{color:var(--gold)}
h2.section-title{font-size:clamp(2rem,4vw,3rem);margin-bottom:24px;line-height:1.2}

/* NATURE GALLERY */
.masonry{columns:3;column-gap:20px;padding:0 32px;max-width:1200px;margin:0 auto}
.masonry .masonry-item{break-inside:avoid;margin-bottom:20px;border-radius:12px;overflow:hidden;position:relative}
.masonry .masonry-item img{width:100%;display:block;transition:transform .6s}
.masonry .masonry-item:hover img{transform:scale(1.04)}
.masonry .masonry-item .caption{position:absolute;bottom:0;left:0;right:0;padding:20px;background:linear-gradient(transparent,rgba(26,26,26,.7));color:#fff;font-size:.85rem;font-weight:300;letter-spacing:.5px;opacity:0;transition:opacity .4s}
.masonry .masonry-item:hover .caption{opacity:1}
@media(max-width:1024px){.masonry{columns:2}}
@media(max-width:600px){.masonry{columns:1;padding:0 16px}}

/* THE SPACE */
.space-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.space-grid .space-img{border-radius:12px;overflow:hidden;aspect-ratio:4/3}
.space-grid .space-img img{width:100%;height:100%;object-fit:cover}
@media(max-width:600px){.space-grid{grid-template-columns:1fr}}

/* EXPLORE */
.explore-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:32px}
.explore-card{border-radius:16px;overflow:hidden;position:relative;aspect-ratio:3/2}
.explore-card img{width:100%;height:100%;object-fit:cover;transition:transform .6s}
.explore-card:hover img{transform:scale(1.06)}
.explore-card .card-content{position:absolute;inset:0;background:linear-gradient(transparent 40%,rgba(26,26,26,.75));display:flex;flex-direction:column;justify-content:flex-end;padding:28px;color:#fff}
.explore-card h3{font-size:1.4rem;margin-bottom:6px}
.explore-card p{font-size:.9rem;opacity:.85;font-weight:300}
@media(max-width:768px){.explore-cards{grid-template-columns:1fr}}

/* AMENITIES */
.amenity-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.amenity{background:rgba(255,255,255,.5);border-radius:12px;padding:28px;text-align:center;transition:transform .3s}
.amenity:hover{transform:translateY(-4px)}
.amenity-icon{font-size:2rem;margin-bottom:12px;display:block}
.amenity h4{font-size:1rem;margin-bottom:6px;font-family:'Inter',sans-serif;font-weight:600}
.amenity p{font-size:.85rem;color:#555;font-weight:300}
@media(max-width:768px){.amenity-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.amenity-grid{grid-template-columns:1fr}}

/* BOOKING */
.booking-card{background:#fff;border-radius:20px;padding:48px;max-width:560px;margin:0 auto;box-shadow:0 8px 40px rgba(0,0,0,.08)}
.cal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.cal-header span{font-weight:600;font-size:1rem}
.cal-header button{background:var(--forest);border:none;color:#fff;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:1.1rem;display:flex;align-items:center;justify-content:center;transition:background .3s}
.cal-header button:hover{background:var(--teal)}
.cal-days-header{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-size:.75rem;color:#888;margin-bottom:8px;font-weight:500}
.cal-days{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;gap:3px}
.cal-day{padding:10px 4px;border-radius:8px;cursor:pointer;font-size:.85rem;transition:background .2s}
.cal-day:hover{background:var(--seafoam)}
.cal-day.past{color:#ccc;cursor:default}
.cal-day.past:hover{background:transparent}
.cal-day.today{font-weight:700;color:var(--forest)}
.cal-day.selected{background:var(--forest);color:#fff;border-radius:8px}
.cal-day.in-range{background:var(--seafoam)}
.cal-day.blocked{color:#ccc;text-decoration:line-through;cursor:default}
.cal-day.blocked:hover{background:transparent}
.cal-day.full{color:#c0392b;opacity:.5;cursor:default}
.cal-day.full:hover{background:transparent}
#date-range-pill{text-align:center;padding:14px;background:var(--seafoam);border-radius:10px;margin-top:20px;display:none;font-weight:500;font-size:.95rem;color:var(--forest)}
#date-range-pill.visible{display:block}
#guest-selector{display:none;margin-top:16px;align-items:center;justify-content:center;gap:16px}
#guest-selector.visible{display:flex}
#guest-selector button{width:38px;height:38px;border-radius:50%;border:2px solid var(--forest);background:transparent;cursor:pointer;font-size:1.2rem;color:var(--forest);transition:all .2s}
#guest-selector button:hover{background:var(--forest);color:#fff}
#guest-selector span{font-weight:500;min-width:80px;text-align:center}
#request-btn{display:none;margin:24px auto 0;padding:16px 48px;background:var(--forest);color:#fff;border:none;border-radius:10px;font-size:1rem;cursor:pointer;font-weight:600;letter-spacing:1px;transition:background .3s}
#request-btn:hover{background:var(--teal)}
#request-btn.visible{display:block}
#detail-panel{max-height:0;overflow:hidden;transition:max-height .4s ease}
#detail-panel.open{max-height:500px}
#detail-panel .inner{padding:24px 0}
#detail-panel input,#detail-panel textarea{width:100%;padding:14px 0;border:none;border-bottom:2px solid #e8e4dc;font-family:'Inter',sans-serif;font-size:.95rem;margin-bottom:20px;background:transparent;outline:none;transition:border-color .3s}
#detail-panel input:focus,#detail-panel textarea:focus{border-bottom-color:var(--forest)}
#detail-panel textarea{border:2px solid #e8e4dc;border-radius:10px;padding:14px}
#detail-panel button[type=submit]{width:100%;padding:16px;background:var(--forest);color:#fff;border:none;border-radius:10px;font-size:1rem;cursor:pointer;font-weight:600;letter-spacing:1px;transition:background .3s}
#detail-panel button[type=submit]:hover{background:var(--teal)}
#confirmation{display:none;text-align:center;padding:28px;background:var(--seafoam);border-radius:12px;margin-top:20px}
#confirmation.visible{display:block}
#confirmation h3{color:var(--forest);margin-bottom:8px;font-size:1.2rem}
#confirm-summary{font-size:.9rem;color:#555}
#book-another{margin-top:14px;padding:12px 28px;background:transparent;border:2px solid var(--forest);color:var(--forest);border-radius:10px;cursor:pointer;font-weight:500;transition:all .3s}
#book-another:hover{background:var(--forest);color:#fff}

/* DIVIDERS */
.wave-divider{width:100%;overflow:hidden;line-height:0}
.wave-divider svg{display:block;width:100%;height:60px}

/* PARALLAX STRIP */
.parallax-strip{height:50vh;min-height:300px;background-size:cover;background-position:center;background-attachment:fixed;position:relative}
.parallax-strip .strip-overlay{position:absolute;inset:0;background:rgba(26,60,42,.3)}

/* FOOTER */
footer{text-align:center;padding:60px 24px;background:var(--dark);color:rgba(255,255,255,.5);font-size:.85rem}
footer .footer-logo{font-family:'Playfair Display',serif;font-size:1.3rem;color:rgba(255,255,255,.7);margin-bottom:8px}
footer a{color:rgba(255,255,255,.5);text-decoration:none}
footer a:hover{color:rgba(255,255,255,.8)}

/* UTILITIES */
.text-center{text-align:center}
.mt-8{margin-top:8px}
.mt-16{margin-top:16px}
.mt-24{margin-top:24px}
.mb-40{margin-bottom:40px}
</style>
</head>
<body>

<!-- NAV -->
<nav id="mainNav">
<a href="#" class="nav-logo">Your Maui Retreat</a>
<button class="hamburger" onclick="document.querySelector('.nav-links').classList.toggle('open')">Menu</button>
<ul class="nav-links">
<li><a href="#island">The Island</a></li>
<li><a href="#nature">Nature</a></li>
<li><a href="#space">The Space</a></li>
<li><a href="#explore">Explore</a></li>
<li><a href="#booking">Reserve</a></li>
</ul>
</nav>

<!-- HERO -->
<section class="hero" id="home">
<div class="hero-bg" style="background-image:url('${nature[0].src}')"></div>
<div class="hero-overlay"></div>
<div class="hero-content">
<h1>Where the Mountains Meet the Sea</h1>
<p>A private retreat on Maui's southern shore</p>
<a href="#booking" class="hero-cta">Reserve Your Stay</a>
</div>
<div class="hero-scroll">Scroll to discover</div>
</section>

<!-- WAVE DIVIDER -->
<div class="wave-divider">
<svg viewBox="0 0 1200 60" preserveAspectRatio="none">
<path d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z" fill="#faf7f0"/>
</svg>
</div>

<!-- THE ISLAND -->
<section class="section" id="island">
<div class="container">
<div class="island-split">
<div>
<div class="label">Maui, Hawaii</div>
<h2 class="section-title">The Valley Isle</h2>
<div class="island-text">
<p>Maui is a place where ancient volcanic peaks pierce tropical clouds, where waterfalls cascade through emerald rainforests into crystal pools, and where the ocean stretches endlessly in shades of turquoise and deep Pacific blue.</p>
<p>On the sun-drenched southern shore, Kihei sits between the slopes of Haleakala and the protected waters of the Aloha Channel. Trade winds carry the scent of plumeria and salt air through a landscape where time moves differently.</p>
<p>This is a place that changes you. Not through spectacle, but through stillness.</p>
</div>
</div>
<div class="space-grid">
<div class="space-img"><img src="${nature[1].src}" alt="Aerial view of Maui coastline"></div>
<div class="space-img"><img src="${nature[2].src}" alt="Rainbow over the Pacific coast"></div>
<div class="space-img"><img src="${nature[3].src}" alt="Heart-shaped rock on the shore"></div>
<div class="space-img"><img src="${nature[4].src}" alt="Lush green landscape"></div>
</div>
</div>
</div>
</section>

<!-- PARALLAX STRIP -->
<div class="parallax-strip" style="background-image:url('${nature[5].src}')">
<div class="strip-overlay"></div>
</div>

<!-- NATURE GALLERY -->
<section class="section section-sand" id="nature">
<div class="container text-center mb-40">
<div class="label">Through the Lens</div>
<h2 class="section-title">A Living Canvas</h2>
</div>
<div class="masonry">
<div class="masonry-item"><img src="${nature[0].src}" alt="Waterfall"><div class="caption">Tropical waterfall</div></div>
<div class="masonry-item"><img src="${nature[6].src}" alt="Coastal view"><div class="caption">Kihei coastline</div></div>
<div class="masonry-item"><img src="${property[0].src}" alt="Property exterior"><div class="caption">Your retreat</div></div>
<div class="masonry-item"><img src="${nature[1].src}" alt="Aerial beach"><div class="caption">Turquoise waters</div></div>
<div class="masonry-item"><img src="${pool[0].src}" alt="Infinity pool"><div class="caption">Ocean-view pool</div></div>
<div class="masonry-item"><img src="${nature[2].src}" alt="Rainbow coast"><div class="caption">Rainbow over the Pacific</div></div>
<div class="masonry-item"><img src="${nature[3].src}" alt="Heart rock"><div class="caption">Heart-shaped rock</div></div>
<div class="masonry-item"><img src="${property[1].src}" alt="Pool area"><div class="caption">Private pool</div></div>
<div class="masonry-item"><img src="${nature[4].src}" alt="Green road"><div class="caption">Upcountry Maui</div></div>
<div class="masonry-item"><img src="${nature[7].src}" alt="Courtyard"><div class="caption">Tropical courtyard</div></div>
<div class="masonry-item"><img src="${pool[1].src}" alt="Golden hour pool"><div class="caption">Golden hour</div></div>
<div class="masonry-item"><img src="${property[2].src}" alt="Living room"><div class="caption">Open living space</div></div>
</div>
</section>

<!-- THE SPACE -->
<section class="section" id="space">
<div class="container">
<div class="text-center mb-40">
<div class="label">Your Home Base</div>
<h2 class="section-title">The Space</h2>
<p style="max-width:560px;margin:0 auto;font-size:1.05rem;color:#555">A thoughtfully appointed retreat designed as your launching point for adventure. Comfortable, unpretentious, and perfectly positioned between mountain and sea.</p>
</div>
<div class="space-grid" style="grid-template-columns:repeat(3,1fr)">
<div class="space-img"><img src="${property[3].src}" alt="Kitchen"></div>
<div class="space-img"><img src="${property[4].src}" alt="Bedroom"></div>
<div class="space-img"><img src="${property[5].src}" alt="Lanai"></div>
<div class="space-img"><img src="${property[6].src}" alt="Bathroom"></div>
<div class="space-img"><img src="${property[7].src}" alt="Cottage"></div>
<div class="space-img"><img src="${pool[2].src}" alt="Pool"></div>
</div>
</div>
</section>

<!-- PARALLAX STRIP 2 -->
<div class="parallax-strip" style="background-image:url('${nature[7].src}')">
<div class="strip-overlay"></div>
</div>

<!-- EXPLORE -->
<section class="section section-dark" id="explore">
<div class="container">
<div class="text-center mb-40">
<div class="label">Beyond the Garden Gate</div>
<h2 class="section-title">Explore</h2>
<p style="max-width:560px;margin:0 auto;font-weight:300;opacity:.8">World-class beaches, volcanic landscapes, sacred sites, and hidden waterfalls are all within reach. Here are some of our favorites.</p>
</div>
<div class="explore-cards">
<div class="explore-card">
<img src="${explore[0].src}" alt="Coastal views">
<div class="card-content">
<h3>Kihei Beaches</h3>
<p>Six miles of golden sand and calm, swimmable waters steps from your door</p>
</div>
</div>
<div class="explore-card">
<img src="${explore[1].src}" alt="Golf course">
<div class="card-content">
<h3>Golf &amp; Recreation</h3>
<p>Championship courses with ocean and mountain views</p>
</div>
</div>
<div class="explore-card">
<img src="${nature[0].src}" alt="Waterfalls">
<div class="card-content">
<h3>Road to Hana</h3>
<p>Waterfalls, rainforests, and black sand beaches along Maui's legendary coast</p>
</div>
</div>
<div class="explore-card">
<img src="${explore[2].src}" alt="Sunset">
<div class="card-content">
<h3>Haleakala Sunset</h3>
<p>Watch the sun sink into the clouds from 10,000 feet above sea level</p>
</div>
</div>
</div>
</div>
</section>

<!-- AMENITIES -->
<section class="section section-seafoam">
<div class="container">
<div class="text-center mb-40">
<div class="label" style="color:var(--forest)">What Awaits</div>
<h2 class="section-title" style="color:var(--forest)">Amenities</h2>
</div>
<div class="amenity-grid">
<div class="amenity"><span class="amenity-icon">~</span><h4>Private Pool</h4><p>Ocean-view infinity pool with sun deck</p></div>
<div class="amenity"><span class="amenity-icon">=</span><h4>Full Kitchen</h4><p>Modern appliances and island-inspired prep space</p></div>
<div class="amenity"><span class="amenity-icon">#</span><h4>Free WiFi</h4><p>High-speed internet throughout</p></div>
<div class="amenity"><span class="amenity-icon">+</span><h4>Air Conditioning</h4><p>Climate control in every room</p></div>
<div class="amenity"><span class="amenity-icon">@</span><h4>Lanai</h4><p>Covered outdoor living with garden and ocean views</p></div>
<div class="amenity"><span class="amenity-icon">*</span><h4>Washer &amp; Dryer</h4><p>In-unit laundry for extended stays</p></div>
<div class="amenity"><span class="amenity-icon">&amp;</span><h4>Cottage</h4><p>Separate guest quarters for privacy</p></div>
<div class="amenity"><span class="amenity-icon">%</span><h4>Parking</h4><p>Dedicated off-street parking</p></div>
<div class="amenity"><span class="amenity-icon">^</span><h4>Beach Gear</h4><p>Chairs, towels, and coolers provided</p></div>
</div>
</div>
</section>

<!-- BOOKING -->
<section class="section" id="booking">
<div class="container">
<div class="text-center mb-40">
<div class="label">Reserve</div>
<h2 class="section-title">Book Your Stay</h2>
<p style="max-width:480px;margin:0 auto;color:#666">Select your dates and request a reservation. We'll confirm availability within 24 hours.</p>
</div>
<div class="booking-card">
<div class="cal-header">
<button onclick="CAL.prevMonth()">&lsaquo;</button>
<span id="cal-nav-title"></span>
<button onclick="CAL.nextMonth()">&rsaquo;</button>
</div>
<div id="cal-container"></div>
<div id="date-range-pill"><span id="date-range-text"></span></div>
<div id="guest-selector">
<button onclick="CAL.setGuests(-1)">-</button>
<span><span id="guest-count">2</span> guests</span>
<button onclick="CAL.setGuests(1)">+</button>
</div>
<button id="request-btn" onclick="CAL.showDetails()">Request Reservation</button>
<div id="detail-panel">
<div class="inner">
<input id="booking-name" placeholder="Full name" autocomplete="name">
<input id="booking-email" type="email" placeholder="Email address" autocomplete="email">
<input id="booking-phone" type="tel" placeholder="Phone (optional)" autocomplete="tel">
<textarea id="booking-notes" rows="3" placeholder="Anything we should know?"></textarea>
<button type="submit" onclick="submitBooking()">Submit Request</button>
</div>
</div>
<div id="confirmation">
<h3>Request Received</h3>
<p id="confirm-summary"></p>
<button id="book-another" onclick="CAL.resetAll()">Make Another Request</button>
</div>
</div>
</div>
</section>

<!-- FOOTER -->
<footer>
<div class="footer-logo">Your Maui Retreat</div>
<p>Kihei, Maui, Hawaii</p>
<p style="margin-top:16px;font-size:.8rem">Friends &amp; Family</p>
</footer>

${bookingJS}

<script>
// Nav scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 80);
});
</script>
</body>
</html>`;

fs.writeFileSync('index.html', newHTML);
console.log('Done! New index.html written (' + (newHTML.length / 1024 / 1024).toFixed(2) + ' MB)');
