const firstCard = document.getElementById('first-card');
if (firstCard) {
  firstCard.style.cursor = 'pointer';
  firstCard.addEventListener('click', () => {
    window.location.href = 'activities.html';
  });
}


//Hamburger Menu Toggle
// This script toggles the hamburger menu on and off when clicked.

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');
  const body = document.body;

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    
    // Toggle menu
    menu.classList.toggle('open');
    btn.classList.toggle('open');
    
    // Update accessibility
    btn.setAttribute('aria-expanded', !isOpen);
    btn.setAttribute('aria-label', isOpen ? 'Öppna meny' : 'Stäng meny');
    
    // Prevent body scroll when menu is open
    body.style.overflow = isOpen ? '' : 'hidden';
    
    // Update button content
    btn.innerHTML = isOpen ? '☰' : '✕';
  });

  // Close menu when clicking on a link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Öppna meny');
      body.style.overflow = '';
      btn.innerHTML = '☰';
    });
  });

  // Close menu when clicking outside (on the overlay)
  menu.addEventListener('click', (e) => {
    if (e.target === menu) {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Öppna meny');
      body.style.overflow = '';
      btn.innerHTML = '☰';
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Öppna meny');
      body.style.overflow = '';
      btn.innerHTML = '☰';
    }
  });
});


// Activity card click functionality
document.addEventListener('DOMContentLoaded', () => {
  const activityCards = document.querySelectorAll('.activity-card');
  let activeCard = null;
  
  // Add click event to each activity card
  activityCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const textOverlay = card.querySelector('.activity-text');
      
      if (!textOverlay) return;
      
      // If this card is already active, close it
      if (activeCard === card) {
        closeActiveOverlay();
        return;
      }
      
      // Close any previously active card
      if (activeCard) {
        closeActiveOverlay();
      }
      
      // Show the text overlay for this card
      textOverlay.classList.remove('hidden');
      // Small delay to ensure transition works
      setTimeout(() => {
        textOverlay.classList.add('show');
      }, 10);
      
      activeCard = card;
    });
  });
  
  // Close overlay function
  function closeActiveOverlay() {
    if (activeCard) {
      const textOverlay = activeCard.querySelector('.activity-text');
      if (textOverlay) {
        textOverlay.classList.remove('show');
        setTimeout(() => {
          textOverlay.classList.add('hidden');
        }, 300);
      }
    }
    
    activeCard = null;
  }
  
  // Hide text overlay on scroll
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (activeCard) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        closeActiveOverlay();
      }, 100); // Small delay to avoid hiding on minimal scroll
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeCard) {
      closeActiveOverlay();
    }
  });
});