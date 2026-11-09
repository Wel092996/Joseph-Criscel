# Premium Burgundy & Champagne Gold Wedding Invitation Website

A luxury, romantic, digital wedding invitation website built with HTML5, CSS3, and JavaScript, styled in an aesthetic **Deep Burgundy & Champagne Gold** wedding theme.

---

## 🌹 Design Concept & Color Palette

- **Deep Burgundy**: `#800020`
- **Dark Wine**: `#4A001F`
- **Burgundy Red**: `#6D102C`
- **Champagne Gold**: `#D4AF7F`
- **Ivory**: `#FFF8F0`
- **Soft Beige**: `#F5EBDD`
- **Google Fonts**: *Great Vibes* (Script), *Playfair Display* (Serif), and *Montserrat* (Body)

---

## ✨ Features & Sections Included

1. **Royal Invitation Envelope**:
   - Interactive 3D wax seal and burgundy envelope opening experience.
   - Triggers background music autoplay upon user interaction.
   - Dynamic guest name personalization via URL (`?guest=Guest+Name`).
2. **Hero Cover Section**:
   - Romantic wedding photography background with wine-toned overlay.
   - Handcrafted gold & burgundy rose corner decorations (`floral-corner.svg`).
   - "Together with our families", "WE ARE GETTING MARRIED!", couple names, and "ENTER INVITATION" button.
   - Floating rose petals & gold dust particle canvas.
3. **Wedding Countdown Timer**:
   - Live Days, Hours, Minutes, Seconds countdown updating every second.
   - Automatically calculates remaining time until the wedding date.
   - Displays *"TODAY IS THE DAY!"* when reached.
   - "Add to Google Calendar" and downloadable Apple/Outlook `.ics` calendar file buttons.
4. **Our Love Story**:
   - Romantic alternating timeline with milestone photography, dates, and stories:
     - *How We Met*
     - *Our First Date*
     - *The Proposal*
     - *Our Journey Together*
5. **Prenuptial Photo Gallery**:
   - Filter tabs: *All Photos*, *The Prenup*, *Romantic Moments*, *Wedding Details*.
   - Responsive masonry/grid with hover zoom and captions.
   - Full-screen lightbox modal with Next/Previous arrows, photo counter, and keyboard navigation (`ESC`, `←`, `→`).
6. **Wedding Details**:
   - **Ceremony**: San Agustin Church, Intramuros, Manila (Date, Time, Address, Google Maps embed, and "Get Directions" button).
   - **Reception**: The Glasshouse Garden Estate, Parañaque (Date, Time, Address, Google Maps embed, and "Get Directions" button).
7. **Wedding Entourage**:
   - Parents of the Bride & Groom.
   - Principal Sponsors (Ninongs & Ninangs).
   - Maid of Honor & Best Man.
   - Bridesmaids & Groomsmen.
   - Secondary Sponsors (Candle, Veil, Cord).
   - Bearers & Flower Girls.
8. **Wedding Program**:
   - Visual timeline of the celebration: Guest Arrival, Ceremony, Pictorials, Cocktails, Grand Entrance, Dinner, First Dance, and Send-off.
9. **Interactive RSVP Form**:
   - Guest Full Name, Email Address, Contact Number.
   - Attendance radio: "Joyfully Accepts" vs. "Regretfully Declines".
   - **Conditional Fields**: If *No*, hides guest count and shows sweet message; if *Yes*, reveals Number of Guests and dynamic inputs for accompanying guest names and dietary allergies.
   - Form validation & animated confirmation modal.
   - Saves responses to `localStorage` + ready for Google Sheets Webhook integration.
10. **Dress Code Guide**:
    - Visual color swatches with hex codes: Deep Burgundy, Dark Wine, Champagne Gold, Dusty Rose, Warm Almond, Classic Charcoal.
    - Specific attire guidelines for Principal Sponsors, Female Guests, and Male Guests.
    - Gentle reminder regarding colors reserved for the bride.
11. **Gift Registry / Wishing Well**:
    - Thoughtful monetary gift note.
    - GCash & Bank Transfer (BPI) cards.
    - One-click "Copy Number" buttons with instant toast feedback.
    - Full-screen QR code preview modal with "Save / Download QR" option.
12. **Our Prenup Film**:
    - Responsive 16:9 embedded cinematic video player with gold ornamental frame.
13. **Wedding Music Experience**:
    - Floating music player widget with animated sound bars.
    - Built-in romantic acoustic harp/piano synthesizer via Web Audio API (works 100% offline).
    - Can also play any custom MP3 placed in `assets/audio/wedding-song.mp3`.
14. **Sticky Navigation**:
    - Glassmorphic burgundy navbar with active ScrollSpy highlighting.
    - Mobile slide-out drawer menu.
15. **Footer**:
    - Couple monogram, date, words of gratitude, and Back to Top button.

---

## 🛠️ How to Customize

All primary details can be edited directly in **`js/script.js`** and **`index.html`**:

### 1. Couple Names & Dates (`js/script.js`)
Open `js/script.js` and edit the `WEDDING_CONFIG` object:
```javascript
const WEDDING_CONFIG = {
  brideName: "Isabella Marie Santos",
  groomName: "Alexander James Ramos",
  coupleShortNames: "Isabella & Alexander",
  weddingDateString: "December 19, 2026 15:00:00", // Target countdown date
  weddingDisplayDate: "Saturday, December 19, 2026",
  ceremonyVenue: "San Agustin Church",
  ceremonyAddress: "General Luna St, Intramuros, Manila",
  receptionVenue: "The Glasshouse Garden Estate",
  receptionAddress: "95 Roxas Blvd, Tambo, Parañaque",
  rsvpDeadline: "November 15, 2026",
  googleSheetsUrl: "", // Optional Google Apps Script URL
};
```

### 2. Replacing Photos
- Simply replace the `src="..."` URLs in `index.html` under the `#story` and `#gallery` sections with your own image URLs or local files (e.g., `assets/images/prenup-1.jpg`).
- All image tags include fallback `onerror` handlers pointing to `assets/images/placeholder.svg`.

### 3. Personalizing Guest Links
Share personalized links with your guests by appending `?guest=Name` to your URL:
- `https://your-wedding-site.com/?guest=Mr.+and+Mrs.+Smith`
- `https://your-wedding-site.com/?guest=Atty.+Manuel+Gonzales`

---

## 🚀 How to Run Locally

Double-click `index.html` to open it in any web browser (Google Chrome, Microsoft Edge, Safari, Firefox), or serve it with any local development server.
