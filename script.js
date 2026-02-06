const target = new Date("2026-02-09T10:00:00-06:00");
const encodedPassword = "bG92ZXlvdQ=="; // "changeme" in base64. Replace with your own.
const encodedName = "S3J1dGFuamFsaQ=="; // 

const countdownEls = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const noteEl = document.getElementById("note");
const content = document.getElementById("content");
const veil = document.getElementById("veil");
const gate = document.getElementById("gate");
const errorEl = document.getElementById("error");
const passwordInput = document.getElementById("password");
const loverName = document.getElementById("loverName");
const loverNameWhisper = document.getElementById("loverNameWhisper");

function format(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = Date.now();
  let diff = target.getTime() - now;

  if (diff <= 0) {
    diff = 0;
    noteEl.textContent = "You’re here. And everything feels right.";
  }

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  countdownEls.days.textContent = format(days);
  countdownEls.hours.textContent = format(hours);
  countdownEls.minutes.textContent = format(minutes);
  countdownEls.seconds.textContent = format(seconds);
}

function unlock() {
  veil.style.display = "none";
  content.setAttribute("aria-hidden", "false");
  localStorage.setItem("countdownUnlocked", "true");
  if (content) {
    content.classList.add("is-visible");
    const revealEls = content.querySelectorAll(".reveal");
    revealEls.forEach((el) => {
      const delay = el.getAttribute("data-delay");
      if (delay) {
        el.style.setProperty("--delay", delay);
      }
    });
  }
  if (loverName) {
    try {
      loverName.textContent = atob(encodedName);
    } catch (_) {
      loverName.textContent = "my love";
    }
  }
  if (loverNameWhisper) {
    try {
      loverNameWhisper.textContent = atob(encodedName);
    } catch (_) {
      loverNameWhisper.textContent = "my love";
    }
  }
  updateCountdown();
}

function checkPassword(value) {
  try {
    return btoa(value) === encodedPassword;
  } catch (_) {
    return false;
  }
}

if (localStorage.getItem("countdownUnlocked") === "true") {
  unlock();
}

setInterval(updateCountdown, 1000);
updateCountdown();

if (gate) {
  gate.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = passwordInput.value.trim();
    if (checkPassword(value)) {
      errorEl.textContent = "";
      unlock();
      return;
    }
    errorEl.textContent = "That’s not it. Try again.";
    passwordInput.value = "";
    passwordInput.focus();
  });
}
