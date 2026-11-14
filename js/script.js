/**
 * ============================================================================
 * PREMIUM BURGUNDY & CHAMPAGNE GOLD WEDDING INVITATION
 * Criscel & Joseph — November 24, 2026 | Tabaco City, Albay
 * Interactive Scripts & Mobile-Optimized Application Logic
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. Central Wedding Configuration
// ----------------------------------------------------------------------------
const WEDDING_CONFIG = {
  brideName: "Criscel Boncolmo",
  groomName: "Joseph Larot",
  coupleShortNames: "Criscel & Joseph",
  weddingDateString: "November 24, 2026 14:00:00", // Target countdown date
  weddingDisplayDate: "Tuesday, November 24, 2026",
  ceremonyVenue: "St. Anthony of Padua Parish",
  ceremonyAddress: "San Antonio, Tabaco City, Albay",
  receptionVenue: "Jamaica Mansions Subdivision",
  receptionAddress: "Panal, Tabaco City, Albay",
  rsvpFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfSSxDoGPlh1x8Yj_5s2AYNP6GotcGR0CI0ZDExOr06hC7Aiw/viewform"
};

// ----------------------------------------------------------------------------
// 2. Personalization / Guest Name URL Parameter Detection
// e.g. index.html?guest=Tito+Boy+and+Tita+Baby
// ----------------------------------------------------------------------------
function initPersonalization() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('guest');

  if (guestName) {
    const cleanGuestName = decodeURIComponent(guestName).trim();
    
    // Update envelope guest badge if present
    const envelopeGuest = document.getElementById('envelope-guest-name');
    if (envelopeGuest) {
      envelopeGuest.textContent = `Cordially Invited: ${cleanGuestName}`;
    }

    // Update guest greeting banner if present
    const guestGreeting = document.getElementById('guest-personal-greeting');
    if (guestGreeting) {
      guestGreeting.innerHTML = `Cordially Invited: <strong>${cleanGuestName}</strong>`;
      guestGreeting.style.display = 'inline-block';
    }
  }
}

// ----------------------------------------------------------------------------
// 3. Royal Envelope & Enter Invitation Interaction
// ----------------------------------------------------------------------------
function initEnvelope() {
  const envelopeOverlay = document.getElementById('envelope-overlay');
  const envelopeCard = document.querySelector('.envelope-card');
  const enterBtn = document.getElementById('enter-invitation-btn');

  // Prevent background scrolling while envelope is closed
  if (envelopeOverlay && !envelopeOverlay.classList.contains('opened')) {
    document.body.style.overflow = 'hidden';
  }

  function openEnvelope() {
    // Add realistic wax-seal breaking and envelope opening animation
    if (envelopeCard) {
      envelopeCard.classList.add('unsealing');
    }

    // Start romantic background music upon unsealing
    if (window.WeddingAudio) {
      window.WeddingAudio.play();
    }

    // Smoothly fade and transition to the invitation after seal breaks
    setTimeout(() => {
      if (envelopeOverlay) {
        envelopeOverlay.classList.add('opened');
        document.body.style.overflow = 'auto';
      }

      const hero = document.getElementById('home');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth' });
      }
    }, 750);
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', openEnvelope);
  }
}

// ----------------------------------------------------------------------------
// 3. Real-time Wedding Countdown Timer
// ----------------------------------------------------------------------------
function initCountdown() {
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secondsEl = document.getElementById('countdown-seconds');
  const countdownGrid = document.getElementById('countdown-grid');
  const countdownEnded = document.getElementById('countdown-ended');

  let weddingTargetTime = new Date(WEDDING_CONFIG.weddingDateString).getTime();
  if (isNaN(weddingTargetTime)) {
    // Fallback for browsers with strict date parser: Month index 10 = November
    weddingTargetTime = new Date(2026, 10, 24, 14, 0, 0).getTime();
  }

  function updateTimer() {
    const now = new Date().getTime();
    const distance = weddingTargetTime - now;

    if (distance < 0) {
      if (countdownGrid) countdownGrid.style.display = 'none';
      if (countdownEnded) countdownEnded.style.display = 'block';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// ----------------------------------------------------------------------------
// 4. Add To Calendar Functionality (Google Calendar & iCal .ics download)
// ----------------------------------------------------------------------------
function initCalendarButtons() {
  const gcalBtn = document.getElementById('add-gcal-btn');
  const icalBtn = document.getElementById('add-ical-btn');

  const eventTitle = `${WEDDING_CONFIG.coupleShortNames} Wedding`;
  const eventDetails = `Celebrating the Holy Matrimony of ${WEDDING_CONFIG.brideName} and ${WEDDING_CONFIG.groomName}. Ceremony at ${WEDDING_CONFIG.ceremonyVenue}, Tabaco City, Albay. Reception follows at ${WEDDING_CONFIG.receptionVenue}.`;
  const location = `${WEDDING_CONFIG.ceremonyVenue}, ${WEDDING_CONFIG.ceremonyAddress}`;

  // 2026-11-24 from 14:00 to 21:00 PHT (UTC+8) -> UTC 06:00 to 13:00
  const startIso = "20261124T060000Z";
  const endIso = "20261124T130000Z";

  if (gcalBtn) {
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startIso}/${endIso}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(location)}`;
    gcalBtn.href = gcalUrl;
    gcalBtn.target = "_blank";
  }

  const outlookBtn = document.getElementById('add-outlook-btn');
  if (outlookBtn) {
    const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(eventTitle)}&startdt=2026-11-24T14:00:00&enddt=2026-11-24T21:00:00&body=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(location)}`;
    outlookBtn.href = outlookUrl;
    outlookBtn.target = "_blank";
  }

  if (icalBtn) {
    icalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Criscel and Joseph Wedding//EN",
        "BEGIN:VEVENT",
        `UID:${Date.now()}@wedding.criscelandjoseph.com`,
        `DTSTAMP:${startIso}`,
        `DTSTART:${startIso}`,
        `DTEND:${endIso}`,
        `SUMMARY:${eventTitle}`,
        `DESCRIPTION:${eventDetails}`,
        `LOCATION:${location}`,
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Criscel-Joseph-Wedding.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

// ----------------------------------------------------------------------------
// 5. Floating Rose Petals & Gold Particle Canvas Animation (Mobile-Optimized)
// ----------------------------------------------------------------------------
function initParticlesCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  // Use fewer particles on mobile for 60fps performance and low battery consumption
  const particleCount = window.innerWidth < 768 ? 18 : 36;

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 5 + 3;
      this.speedY = Math.random() * 0.8 + 0.3;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.angle = Math.random() * Math.PI * 2;
      this.angularSpeed = (Math.random() - 0.5) * 0.02;
      this.isPetal = Math.random() > 0.5;
      this.opacity = Math.random() * 0.45 + 0.25;
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.angle) * 0.4 + this.speedX;
      this.angle += this.angularSpeed;

      if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      if (this.isPetal) {
        // Deep burgundy rose petal shape
        ctx.fillStyle = `rgba(128, 0, 32, ${this.opacity})`;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size, -this.size / 2, this.size * 1.2, this.size, 0, this.size * 1.5);
        ctx.bezierCurveTo(-this.size * 1.2, this.size, -this.size, -this.size / 2, 0, 0);
        ctx.fill();
      } else {
        // Champagne gold glowing sparkle
        ctx.fillStyle = `rgba(212, 175, 127, ${this.opacity * 1.2})`;
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

// ----------------------------------------------------------------------------
// 6. Photo Gallery Filter & Full-Screen Lightbox Modal
// ----------------------------------------------------------------------------
function initGalleryAndLightbox() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');

  let currentItems = Array.from(galleryItems);
  let currentIndex = 0;

  // Filtering
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      currentItems = Array.from(galleryItems).filter((item) => item.style.display !== 'none');
    });
  });

  // Open Lightbox
  function openLightbox(index) {
    if (currentItems.length === 0) return;
    currentIndex = index;
    const item = currentItems[currentIndex];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-overlay-title');

    if (lightboxImg && img) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "Prenuptial Photo";
    }

    if (lightboxTitle) {
      lightboxTitle.textContent = title ? title.textContent : "Prenuptial Gallery";
    }

    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentIndex + 1} / ${currentItems.length}`;
    }

    if (lightbox) {
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const idx = currentItems.indexOf(item);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });
  });

  function showNext() {
    currentIndex = (currentIndex + 1) % currentItems.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
    openLightbox(currentIndex);
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('open');
      document.body.style.overflow = 'auto';
    }
  }

  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  // Close on outside background click
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'Escape') closeLightbox();
  });

  // Mobile Touch Swipe support for Lightbox
  let touchStartX = 0;
  let touchEndX = 0;
  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        showNext(); // Swiped left -> next
      } else if (touchEndX - touchStartX > 50) {
        showPrev(); // Swiped right -> prev
      }
    }, { passive: true });
  }
}

// ----------------------------------------------------------------------------
// 7. Gift Registry Clipboard & QR Code Modal
// ----------------------------------------------------------------------------
function initGiftSection() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast-notice');
  const toastMsg = document.getElementById('toast-message');

  function showToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  copyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const copyVal = btn.getAttribute('data-copy');
      if (copyVal) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(copyVal).then(() => {
            showToast(`Copied "${copyVal}" to clipboard!`);
          }).catch(() => {
            fallbackCopy(copyVal);
          });
        } else {
          fallbackCopy(copyVal);
        }
      }
    });
  });

  function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied "${text}" to clipboard!`);
  }

  // QR Modal View & Download
  const qrModal = document.getElementById('qr-modal');
  const qrModalImg = document.getElementById('qr-modal-img');
  const qrModalTitle = document.getElementById('qr-modal-title');
  const qrCloseBtn = document.getElementById('qr-modal-close-btn');
  const qrDownloadBtn = document.getElementById('qr-download-btn');
  const viewQrBtns = document.querySelectorAll('.view-qr-btn');

  viewQrBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-qr-src');
      const title = btn.getAttribute('data-qr-title') || "QR Code";

      if (qrModalImg) qrModalImg.src = src;
      if (qrModalTitle) qrModalTitle.textContent = title;
      if (qrDownloadBtn) {
        qrDownloadBtn.href = src;
        qrDownloadBtn.download = `${title.replace(/\s+/g, '-').toLowerCase()}-qr.svg`;
      }

      if (qrModal) {
        qrModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (qrCloseBtn && qrModal) {
    qrCloseBtn.addEventListener('click', () => {
      qrModal.classList.remove('open');
      document.body.style.overflow = 'auto';
    });
  }

  if (qrModal) {
    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) {
        qrModal.classList.remove('open');
        document.body.style.overflow = 'auto';
      }
    });
  }
}

// ----------------------------------------------------------------------------
// 8. Background Wedding Music & Web Audio Synthesizer
// ----------------------------------------------------------------------------
function initWeddingMusic() {
  const musicWidgets = document.querySelectorAll('.music-widget, .nav-music-btn');
  const audioTag = document.getElementById('wedding-audio');

  let isPlaying = false;
  let audioCtx = null;
  let synthInterval = null;

  // Romantic acoustic chord progression (Canon in D / Wedding Acoustic Arpeggio in D Major)
  const notes = [
    293.66, 369.99, 440.00, 587.33,
    220.00, 329.63, 440.00, 554.37,
    246.94, 293.66, 369.99, 493.88,
    185.00, 277.18, 369.99, 440.00,
    196.00, 293.66, 392.00, 587.33,
    146.83, 220.00, 293.66, 440.00,
    196.00, 246.94, 293.66, 392.00,
    220.00, 277.18, 329.63, 440.00
  ];

  function playSynthHarpNote(freq, time) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    // Soft harp / acoustic pluck envelope
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(0.1, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 2.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(time);
    osc.stop(time + 2.3);
  }

  function startSynthProgression() {
    if (!window.AudioContext && !window.webkitAudioContext) return;
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    let noteIdx = 0;
    synthInterval = setInterval(() => {
      const now = audioCtx.currentTime;
      playSynthHarpNote(notes[noteIdx % notes.length], now);
      if (noteIdx % 4 === 0) {
        playSynthHarpNote(notes[noteIdx % notes.length] / 2, now);
      }
      noteIdx++;
    }, 420);
  }

  function stopSynthProgression() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  function playMusic() {
    isPlaying = true;
    musicWidgets.forEach(w => w.classList.add('playing'));

    if (audioTag && audioTag.src && !audioTag.src.endsWith('/')) {
      audioTag.play().catch(() => {
        startSynthProgression();
      });
    } else {
      startSynthProgression();
    }
  }

  function pauseMusic() {
    isPlaying = false;
    musicWidgets.forEach(w => w.classList.remove('playing'));

    if (audioTag) {
      audioTag.pause();
    }
    stopSynthProgression();
  }

  function toggleMusic() {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  musicWidgets.forEach(w => w.addEventListener('click', toggleMusic));

  // Autoplay attempt on user's first touch/interaction on mobile
  const startAudioOnFirstInteraction = () => {
    if (!isPlaying) {
      playMusic();
    }
    window.removeEventListener('click', startAudioOnFirstInteraction);
    window.removeEventListener('touchstart', startAudioOnFirstInteraction);
  };

  window.addEventListener('click', startAudioOnFirstInteraction, { once: true });
  window.addEventListener('touchstart', startAudioOnFirstInteraction, { once: true });

  window.WeddingAudio = {
    play: playMusic,
    pause: pauseMusic,
    toggle: toggleMusic,
    isPlaying: () => isPlaying
  };
}

// ----------------------------------------------------------------------------
// 9. Sticky Navigation, Mobile Drawer & ScrollSpy
// ----------------------------------------------------------------------------
function initNavigation() {
  const navbar = document.getElementById('main-navbar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });

    mobileLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  function openMobileMenu() {
    hamburgerBtn?.classList.add('active');
    mobileDrawer?.classList.add('open');
    mobileBackdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburgerBtn?.classList.remove('active');
    mobileDrawer?.classList.remove('open');
    mobileBackdrop?.classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      if (mobileDrawer?.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach((link) => link.addEventListener('click', closeMobileMenu));
}

// ----------------------------------------------------------------------------
// 10. Main Initialization on DOM Ready
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initPersonalization();
  initEnvelope();
  initCountdown();
  initCalendarButtons();
  initParticlesCanvas();
  initGalleryAndLightbox();
  initGiftSection();
  initWeddingMusic();
  initNavigation();
});
