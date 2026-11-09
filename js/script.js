/**
 * ============================================================================
 * PREMIUM BURGUNDY & CHAMPAGNE GOLD WEDDING INVITATION
 * Interactive Scripts & Application Logic
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. Central Wedding Configuration
// ----------------------------------------------------------------------------
const WEDDING_CONFIG = {
  brideName: "Isabella Marie Santos",
  groomName: "Alexander James Ramos",
  coupleShortNames: "Isabella & Alexander",
  weddingDateString: "December 19, 2026 15:00:00", // Target countdown date
  weddingDisplayDate: "Saturday, December 19, 2026",
  ceremonyVenue: "San Agustin Church",
  ceremonyAddress: "General Luna St, Intramuros, Manila, 1002 Metro Manila",
  receptionVenue: "The Glasshouse Garden Estate",
  receptionAddress: "95 Roxas Blvd, Tambo, Parañaque, 1701 Metro Manila",
  rsvpDeadline: "November 15, 2026",
  
  // Optional Google Sheets / Apps Script Webhook URL for RSVP responses
  // Replace with your Google Apps Script Web App URL to receive submissions in Google Sheets
  googleSheetsUrl: "", 
};

// ----------------------------------------------------------------------------
// 2. Personalization / Guest Name URL Parameter Detection
// e.g. index.html?guest=Mr.+and+Mrs.+Smith
// ----------------------------------------------------------------------------
function initPersonalization() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('guest');

  if (guestName) {
    const cleanGuestName = decodeURIComponent(guestName).trim();
    
    // Update envelope guest badge
    const envelopeGuest = document.getElementById('envelope-guest-name');
    if (envelopeGuest) {
      envelopeGuest.textContent = `Cordially Invited: ${cleanGuestName}`;
    }

    // Pre-fill RSVP full name field if empty
    const rsvpNameInput = document.getElementById('guest-name');
    if (rsvpNameInput && !rsvpNameInput.value) {
      rsvpNameInput.value = cleanGuestName;
    }

    // Update greeting banner if present
    const guestGreeting = document.getElementById('guest-personal-greeting');
    if (guestGreeting) {
      guestGreeting.textContent = `Dearest ${cleanGuestName},`;
    }
  }
}

// ----------------------------------------------------------------------------
// 3. Royal Envelope & Enter Invitation Interaction
// ----------------------------------------------------------------------------
function initEnvelope() {
  const envelopeOverlay = document.getElementById('envelope-overlay');
  const enterBtn = document.getElementById('enter-invitation-btn');
  const heroEnterBtn = document.getElementById('hero-enter-btn');

  function openEnvelope() {
    if (envelopeOverlay) {
      envelopeOverlay.classList.add('opened');
      document.body.style.overflow = 'auto';
      
      // Attempt to play romantic background music on user gesture
      if (window.WeddingAudio) {
        window.WeddingAudio.play();
      }

      // Smooth scroll to hero
      const hero = document.getElementById('home');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', openEnvelope);
  }

  if (heroEnterBtn) {
    heroEnterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const story = document.getElementById('story');
      if (story) {
        story.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// ----------------------------------------------------------------------------
// 4. Real-time Wedding Countdown Timer
// ----------------------------------------------------------------------------
function initCountdown() {
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secondsEl = document.getElementById('countdown-seconds');
  const countdownGrid = document.getElementById('countdown-grid');
  const countdownEnded = document.getElementById('countdown-ended');

  const weddingTargetTime = new Date(WEDDING_CONFIG.weddingDateString).getTime();

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
// 5. Add To Calendar Functionality (Google Calendar & iCal .ics download)
// ----------------------------------------------------------------------------
function initCalendarButtons() {
  const gcalBtn = document.getElementById('add-gcal-btn');
  const icalBtn = document.getElementById('add-ical-btn');

  const eventTitle = `${WEDDING_CONFIG.coupleShortNames} Wedding`;
  const eventDetails = `Celebrating the Holy Matrimony of ${WEDDING_CONFIG.brideName} and ${WEDDING_CONFIG.groomName}. Reception immediately follows at ${WEDDING_CONFIG.receptionVenue}.`;
  const location = `${WEDDING_CONFIG.ceremonyVenue}, ${WEDDING_CONFIG.ceremonyAddress}`;

  // 2026-12-19 from 15:00 to 22:00 PHT (UTC+8) -> UTC 07:00 to 14:00
  const startIso = "20261219T070000Z";
  const endIso = "20261219T140000Z";

  if (gcalBtn) {
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startIso}/${endIso}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(location)}`;
    gcalBtn.href = gcalUrl;
    gcalBtn.target = "_blank";
  }

  if (icalBtn) {
    icalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Isabella and Alexander Wedding//EN",
        "BEGIN:VEVENT",
        `UID:${Date.now()}@wedding.isabellaandalexander.com`,
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
      link.setAttribute('download', 'Isabella-Alexander-Wedding.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

// ----------------------------------------------------------------------------
// 6. Floating Rose Petals & Gold Particle Canvas Animation
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
  const particleCount = window.innerWidth < 768 ? 22 : 45;

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 6 + 4;
      this.speedY = Math.random() * 0.9 + 0.4;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.angle = Math.random() * Math.PI * 2;
      this.angularSpeed = (Math.random() - 0.5) * 0.02;
      this.isPetal = Math.random() > 0.45; // Petal vs Gold Dust Sparkle
      this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.angle) * 0.5 + this.speedX;
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
// 7. Photo Gallery Filter & Full-Screen Lightbox Modal
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

      // Update visible items list for lightbox navigation
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
}

// ----------------------------------------------------------------------------
// 8. Dynamic & Validated RSVP Form Handling
// ----------------------------------------------------------------------------
function initRsvpForm() {
  const form = document.getElementById('wedding-rsvp-form');
  const attendanceYes = document.getElementById('attend-yes');
  const attendanceNo = document.getElementById('attend-no');
  const attendanceLabels = document.querySelectorAll('.attendance-option-label');
  const additionalFields = document.getElementById('additional-guests-fields');
  const guestCountSelect = document.getElementById('guest-count');
  const dynamicGuestNamesContainer = document.getElementById('dynamic-guest-names-container');
  const successModal = document.getElementById('rsvp-success-modal');
  const successCloseBtn = document.getElementById('rsvp-success-close-btn');

  // Handle Attendance Radio Changes
  function handleAttendanceChange() {
    attendanceLabels.forEach((lbl) => lbl.classList.remove('active'));

    if (attendanceYes && attendanceYes.checked) {
      attendanceYes.closest('.attendance-option-label').classList.add('active');
      if (additionalFields) {
        additionalFields.style.display = 'flex';
      }
    } else if (attendanceNo && attendanceNo.checked) {
      attendanceNo.closest('.attendance-option-label').classList.add('active');
      if (additionalFields) {
        additionalFields.style.display = 'none';
      }
    }
  }

  if (attendanceYes) attendanceYes.addEventListener('change', handleAttendanceChange);
  if (attendanceNo) attendanceNo.addEventListener('change', handleAttendanceChange);

  // Dynamic Guest Name Inputs when count changes
  if (guestCountSelect && dynamicGuestNamesContainer) {
    guestCountSelect.addEventListener('change', () => {
      const count = parseInt(guestCountSelect.value, 10);
      dynamicGuestNamesContainer.innerHTML = '';

      if (count > 1) {
        const titleEl = document.createElement('label');
        titleEl.className = 'form-label';
        titleEl.innerHTML = 'Names of Accompanying Guests <span class="required">*</span>';
        dynamicGuestNamesContainer.appendChild(titleEl);

        for (let i = 2; i <= count; i++) {
          const input = document.createElement('input');
          input.type = 'text';
          input.className = 'form-control';
          input.placeholder = `Full Name of Guest #${i}`;
          input.required = true;
          input.name = `accompanying_guest_${i}`;
          input.style.marginBottom = '0.6rem';
          dynamicGuestNamesContainer.appendChild(input);
        }
      }
    });
  }

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('guest-name')?.value.trim();
      const email = document.getElementById('guest-email')?.value.trim();
      const phone = document.getElementById('guest-phone')?.value.trim();
      const attendance = attendanceYes?.checked ? "Joyfully Accepts" : "Regretfully Declines";
      const guestCount = attendanceYes?.checked ? (guestCountSelect?.value || "1") : "0";
      const specialMessage = document.getElementById('guest-message')?.value.trim();

      // Collect accompanying guest names
      const accompanyingInputs = dynamicGuestNamesContainer?.querySelectorAll('input') || [];
      const accompanyingNames = Array.from(accompanyingInputs).map(inp => inp.value.trim()).filter(Boolean);

      const rsvpData = {
        fullName,
        email,
        phone,
        attendance,
        guestCount,
        accompanyingNames,
        specialMessage,
        submittedAt: new Date().toISOString()
      };

      // Save into LocalStorage for immediate persistence
      try {
        const stored = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
        stored.push(rsvpData);
        localStorage.setItem('wedding_rsvps', JSON.stringify(stored));
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }

      // If user configured Google Sheets Webhook, send POST payload
      if (WEDDING_CONFIG.googleSheetsUrl) {
        fetch(WEDDING_CONFIG.googleSheetsUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rsvpData)
        }).catch(err => console.log('Sheets submission:', err));
      }

      // Show animated success confirmation modal
      if (successModal) {
        const summaryEl = document.getElementById('rsvp-summary-text');
        if (summaryEl) {
          if (attendance === "Joyfully Accepts") {
            summaryEl.innerHTML = `Thank you, <strong>${fullName}</strong>! We are overjoyed to celebrate our special day with you (Party of ${guestCount}). A confirmation email has been logged.`;
          } else {
            summaryEl.innerHTML = `Thank you for letting us know, <strong>${fullName}</strong>. You will be dearly missed on our wedding day!`;
          }
        }
        successModal.classList.add('open');
      }

      form.reset();
      handleAttendanceChange();
    });
  }

  if (successCloseBtn && successModal) {
    successCloseBtn.addEventListener('click', () => {
      successModal.classList.remove('open');
    });
  }
}

// ----------------------------------------------------------------------------
// 9. Gift Registry Clipboard & QR Code Modal
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
// 10. Background Wedding Music & Web Audio Synthesizer
// ----------------------------------------------------------------------------
function initWeddingMusic() {
  const musicWidgets = document.querySelectorAll('.music-widget, .nav-music-btn');
  const audioTag = document.getElementById('wedding-audio');

  let isPlaying = false;
  let audioCtx = null;
  let synthInterval = null;

  // Romantic acoustic chord progression (Canon in D / Wedding Acoustic Arpeggio in D Major)
  const notes = [
    293.66, 369.99, 440.00, 587.33, // D - F# - A - D
    220.00, 329.63, 440.00, 554.37, // A - E - A - C#
    246.94, 293.66, 369.99, 493.88, // Bm - D - F# - B
    185.00, 277.18, 369.99, 440.00, // F#m - C# - F# - A
    196.00, 293.66, 392.00, 587.33, // G - D - G - B
    146.83, 220.00, 293.66, 440.00, // D/F# - A - D - F#
    196.00, 246.94, 293.66, 392.00, // G - B - D - G
    220.00, 277.18, 329.63, 440.00  // A - C# - E - A
  ];

  function playSynthHarpNote(freq, time) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    // Soft harp / acoustic pluck envelope
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(0.12, time + 0.04);
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
      // Play complementary harmonic bass note every 4 notes
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

    // Try HTML5 audio first if audio source is present and working
    if (audioTag && audioTag.src && !audioTag.src.endsWith('/')) {
      audioTag.play().catch(() => {
        // Fallback to Web Audio synthesized romantic harp
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

  // Expose to window for envelope opener
  window.WeddingAudio = {
    play: playMusic,
    pause: pauseMusic,
    toggle: toggleMusic,
    isPlaying: () => isPlaying
  };
}

// ----------------------------------------------------------------------------
// 11. Sticky Navigation, Mobile Drawer & ScrollSpy
// ----------------------------------------------------------------------------
function initNavigation() {
  const navbar = document.getElementById('main-navbar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll navbar styling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // ScrollSpy active link update
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

  // Mobile Drawer Toggle
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
// 12. Main Initialization on DOM Ready
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initPersonalization();
  initEnvelope();
  initCountdown();
  initCalendarButtons();
  initParticlesCanvas();
  initGalleryAndLightbox();
  initRsvpForm();
  initGiftSection();
  initWeddingMusic();
  initNavigation();
});
