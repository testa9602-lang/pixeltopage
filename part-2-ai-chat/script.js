// ---------- 1. Dark / light mode ----------
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

const saved = localStorage.getItem("theme");
if (saved) root.dataset.theme = saved;

function updateIcon() {
  themeToggle.textContent = root.dataset.theme === "light" ? "🌙" : "☀️";
}

themeToggle.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
  updateIcon();
});

updateIcon();

// ---------- 2. AI chat widget ----------
const launcher = document.getElementById("chat-launcher");
const panel = document.getElementById("chat-panel");
const messages = document.getElementById("chat-messages");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const chips = document.getElementById("chips");

launcher.addEventListener("click", () => {
  panel.classList.toggle("open");
});

function addMessage(text, who) {
  const div = document.createElement("div");
  div.className = "msg " + who;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return div;
}

// The "brain": a simple knowledge base
const answers = [
  {
    keys: ["project", "built"],
    reply: "I built a weather app, a todo list and a store."
  },
  {
    keys: ["skill", "tech", "know"],
    reply: "HTML, CSS, JavaScript and Git. Now learning AI!"
  },
  {
    keys: ["available", "hire", "job"],
    reply: "Yes! I'm open to junior roles and freelance work."
  },
  {
    keys: ["contact", "email"],
    reply: "Use the contact form at the bottom of this page."
  }
];

const fallback = "Good question! Try asking about my projects.";

function getReply(question) {
  const text = question.toLowerCase();
  const match = answers.find((a) =>
    a.keys.some((k) => text.includes(k))
  );
  return match ? match.reply : fallback;
}

// Swap this function for a real AI call later
async function askAI(question) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return getReply(question);
}

function typeText(el, text) {
  let i = 0;
  const timer = setInterval(() => {
    i++;
    el.textContent = text.slice(0, i);
    messages.scrollTop = messages.scrollHeight;
    if (i >= text.length) clearInterval(timer);
  }, 25);
}

async function send(question) {
  addMessage(question, "user");
  const bot = addMessage("", "bot thinking");
  const reply = await askAI(question);
  bot.classList.remove("thinking");
  typeText(bot, reply);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const question = input.value.trim();
  if (!question) return;
  input.value = "";
  send(question);
});

chips.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") send(e.target.textContent);
});
