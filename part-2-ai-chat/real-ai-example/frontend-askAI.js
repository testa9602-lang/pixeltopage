// FRONT END: replace askAI() in script.js with this
async function askAI(question) {
  const res = await fetch("/.netlify/functions/chat", {
    method: "POST",
    body: JSON.stringify({ message: question }),
  });
  const data = await res.json();
  return data.reply;
}
