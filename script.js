// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// ===== THEME SWITCHER =====
const themeToggle = document.getElementById('themeToggle');
const themePanel = document.getElementById('themePanel');
const themeDots = document.querySelectorAll('.dot');

// localStorage থেকে আগের theme লোড
const savedTheme = localStorage.getItem('theme') || 'green';
document.body.setAttribute('data-theme', savedTheme);
updateActiveDot(savedTheme);

themeToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  themePanel.classList.toggle('open');
});

themeDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const theme = dot.getAttribute('data-theme');
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateActiveDot(theme);
    themePanel.classList.remove('open');
  });
});

function updateActiveDot(theme) {
  themeDots.forEach(d => d.classList.remove('active'));
  const active = document.querySelector(`.dot[data-theme="${theme}"]`);
  if (active) active.classList.add('active');
}

// বাইরে ক্লিক করলে panel বন্ধ
document.addEventListener('click', (e) => {
  if (!themePanel.contains(e.target) && e.target !== themeToggle) {
    themePanel.classList.remove('open');
  }
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

    if (!isActive) item.classList.add('active');
  });
});

// ===== APPOINTMENT FORM =====
function handleAppointment(e) {
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.name.value,
    phone: form.phone.value,
    type: form.type.value,
    message: form.message.value,
  };

  // WhatsApp এ পাঠানোর জন্য নিচের লাইনটি চালু করুন
  const waText = `নাম: ${data.name}%0Aফোন: ${data.phone}%0Aধরন: ${data.type}%0Aবার্তা: ${data.message}`;
  window.open(`https://wa.me/8801XXXXXXXXX?text=${waText}`, '_blank');

  alert('✅ আপনার Appointment Request পাঠানো হয়েছে!\n\nআমরা শীঘ্রই যোগাযোগ করব।');
  form.reset();
}

// ===== CURRENT YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .section-head, .about-content, .appointment-form, .about-img').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = '0.6s ease';
  observer.observe(el);
});