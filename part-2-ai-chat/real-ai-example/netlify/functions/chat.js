// Runs on the SERVER. Set ANTHROPIC_API_KEY as an environment variable.
exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-5-5",
      max_tokens: 300,
      system: "You are Alex's portfolio assistant. Keep answers short.",
      messages: [{ role: "user", content: message }],
    }),
  });

  const data = await res.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ reply: data.content[0].text }),
  };
};
