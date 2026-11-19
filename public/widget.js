(() => {
  if (window.__adMotionChatLoaded) return;
  window.__adMotionChatLoaded = true;

  const API = "https://admotionai.50577267.workers.dev";
  const css = `
    #admotion-chat-root{font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;position:relative;z-index:2147483000;color:#352b31}
    #admotion-chat-launch{position:fixed;right:24px;bottom:24px;width:62px;height:62px;border:0;border-radius:50%;background:linear-gradient(145deg,#f7b8cb,#e985aa);color:#fff;box-shadow:0 10px 30px #a94d7040;cursor:pointer;display:grid;place-items:center;transition:transform .2s,box-shadow .2s}
    #admotion-chat-launch:hover{transform:translateY(-3px);box-shadow:0 14px 34px #a94d7055}
    #admotion-chat-launch svg{width:29px;height:29px}
    #admotion-chat-panel{position:fixed;right:24px;bottom:100px;width:min(380px,calc(100vw - 28px));height:min(560px,calc(100vh - 130px));background:#fffafd;border:1px solid #f0dce4;border-radius:22px;box-shadow:0 18px 60px #57243a30;display:none;flex-direction:column;overflow:hidden}
    #admotion-chat-panel.open{display:flex;animation:admotion-pop .18s ease-out}
    @keyframes admotion-pop{from{opacity:0;transform:translateY(9px) scale(.985)}to{opacity:1;transform:translateY(0) scale(1)}}
    .am-head{padding:18px 18px 15px;background:linear-gradient(135deg,#f9dbe5,#f4bfd0);display:flex;align-items:center;gap:11px}
    .am-mark{width:39px;height:39px;border-radius:50%;display:grid;place-items:center;background:#fff9fc;color:#cf6f93;font-size:22px;flex:none}
    .am-head-copy{min-width:0;flex:1}.am-title{font-size:15px;font-weight:700;letter-spacing:.1px}.am-sub{font-size:11px;color:#754d5f;margin-top:2px}
    .am-close{border:0;background:#ffffff90;color:#754d5f;width:31px;height:31px;border-radius:50%;font-size:20px;cursor:pointer;line-height:1}
    .am-body{flex:1;overflow:auto;padding:17px 14px;background:radial-gradient(ellipse at top right,#fff0f5 0,transparent 58%),#fffafd}
    .am-welcome{font-size:13px;line-height:1.55;color:#6e5962;background:#fff;border:1px solid #f2e5ea;padding:12px 13px;border-radius:15px 15px 15px 5px;max-width:92%;box-shadow:0 2px 8px #612b4208}
    .am-quick{display:flex;flex-wrap:wrap;gap:7px;margin-top:13px}
    .am-quick button{border:1px solid #edc5d3;background:#fff8fb;color:#a34f70;border-radius:30px;padding:7px 10px;font-size:11px;cursor:pointer}
    .am-msg{width:fit-content;max-width:88%;margin:12px 0;padding:10px 12px;font-size:13px;line-height:1.55;white-space:pre-wrap;overflow-wrap:anywhere}
    .am-user{margin-left:auto;background:#efb5c9;color:#492c39;border-radius:15px 15px 5px 15px}
    .am-assistant{background:#fff;border:1px solid #f2e5ea;color:#51434a;border-radius:15px 15px 15px 5px;box-shadow:0 2px 8px #612b4208}
    .am-typing{color:#9c7282;font-size:12px;margin:10px 4px}
    .am-compose{display:flex;align-items:flex-end;gap:8px;padding:12px;border-top:1px solid #f1e2e8;background:#fff}
    .am-input{flex:1;min-width:0;max-height:96px;resize:none;border:1px solid #ecd8e0;border-radius:16px;padding:11px 12px;font:13px inherit;color:#382b31;outline:none;line-height:1.4;background:#fffafd}
    .am-input:focus{border-color:#d98aa7;box-shadow:0 0 0 3px #f8e3eb}
    .am-send{border:0;border-radius:50%;width:39px;height:39px;background:#d9799d;color:#fff;cursor:pointer;font-size:18px;flex:none}
    .am-send:disabled{opacity:.5;cursor:wait}
    .am-foot{text-align:center;padding:0 12px 10px;background:#fff;color:#aa929d;font-size:10px}
    @media(max-width:520px){#admotion-chat-launch{right:16px;bottom:16px}#admotion-chat-panel{right:8px;bottom:88px;width:calc(100vw - 16px);height:min(600px,calc(100vh - 105px));border-radius:19px}}
    @media(prefers-reduced-motion:reduce){#admotion-chat-panel.open{animation:none}#admotion-chat-launch{transition:none}}
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const root = document.createElement("div");
  root.id = "admotion-chat-root";
  root.innerHTML = `
    <button id="admotion-chat-launch" type="button" aria-label="Open AdMotion AI assistant" aria-expanded="false">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 12c-2.7-5.6-7.4-5-7.4-1.4 0 2.3 3.2 3.1 7.4 1.4Z"/><path d="M12 12c2.7-5.6 7.4-5 7.4-1.4 0 2.3-3.2 3.1-7.4 1.4Z"/><path d="M12 12c-5.6 2.7-5 7.4-1.4 7.4 2.3 0 3.1-3.2 1.4-7.4Z"/><path d="M12 12c5.6 2.7 5 7.4 1.4 7.4-2.3 0-3.1-3.2-1.4-7.4Z"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>
    </button>
    <section id="admotion-chat-panel" role="dialog" aria-label="AdMotion AI Assistant" aria-modal="false">
      <header class="am-head"><div class="am-mark" aria-hidden="true">✿</div><div class="am-head-copy"><div class="am-title">AdMotion Assistant</div><div class="am-sub">Here to help you explore</div></div><button class="am-close" type="button" aria-label="Close chat">×</button></header>
      <div class="am-body" id="am-body" aria-live="polite">
        <div class="am-welcome">Hi there! 🌸 I'm the AdMotion assistant. Ask me about our creative apps, what we do, or how to get in touch.</div>
        <div class="am-quick"><button type="button">What is AdMotion?</button><button type="button">What apps do you offer?</button><button type="button">How can I contact you?</button></div>
      </div>
      <form class="am-compose" id="am-form"><textarea class="am-input" id="am-input" rows="1" maxlength="2000" placeholder="Ask us something..." aria-label="Your message"></textarea><button class="am-send" id="am-send" type="submit" aria-label="Send message">➤</button></form>
      <div class="am-foot">AdMotion AI · Powered by Cloudflare</div>
    </section>`;
  document.body.appendChild(root);

  const launch = root.querySelector("#admotion-chat-launch");
  const panel = root.querySelector("#admotion-chat-panel");
  const close = root.querySelector(".am-close");
  const body = root.querySelector("#am-body");
  const form = root.querySelector("#am-form");
  const input = root.querySelector("#am-input");
  const send = root.querySelector("#am-send");
  const history = [];
  let busy = false;

  function openChat() { panel.classList.add("open"); launch.setAttribute("aria-expanded", "true"); input.focus(); }
  function closeChat() { panel.classList.remove("open"); launch.setAttribute("aria-expanded", "false"); launch.focus(); }
  launch.addEventListener("click", () => panel.classList.contains("open") ? closeChat() : openChat());
  close.addEventListener("click", closeChat);
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && panel.classList.contains("open")) closeChat(); });
  root.querySelectorAll(".am-quick button").forEach((button) => button.addEventListener("click", () => sendMessage(button.textContent)));

  function addMessage(role, text) {
    const el = document.createElement("div");
    el.className = "am-msg " + (role === "user" ? "am-user" : "am-assistant");
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }

  async function sendMessage(text) {
    const message = (text || input.value).trim();
    if (!message || busy) return;
    busy = true; send.disabled = true; input.disabled = true;
    if (!text) input.value = "";
    addMessage("user", message);
    history.push({ role: "user", content: message });
    const reply = addMessage("assistant", "");
    const typing = document.createElement("div");
    typing.className = "am-typing"; typing.textContent = "Thinking…";
    body.appendChild(typing);
    try {
      const response = await fetch(API + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-16) })
      });
      if (!response.ok || !response.body) throw new Error("Chat request failed (" + response.status + ")");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "", answer = "";
      function consume(finalChunk) {
        const normalized = buffer.replace(/\r/g, "") + (finalChunk ? "\n\n" : "");
        const events = normalized.split("\n\n");
        buffer = finalChunk ? "" : events.pop();
        for (const event of events) {
          const data = event.split("\n").filter(line => line.startsWith("data:")).map(line => line.slice(5).trimStart()).join("\n");
          if (!data || data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            const token = typeof parsed.response === "string" ? parsed.response : (parsed.choices?.[0]?.delta?.content || "");
            if (token) answer += token;
          } catch (_) {}
        }
        reply.textContent = answer || " ";
        body.scrollTop = body.scrollHeight;
      }
      while (true) {
        const part = await reader.read();
        if (part.done) { consume(true); break; }
        buffer += decoder.decode(part.value, { stream: true });
        consume(false);
      }
      if (!answer.trim()) throw new Error("No reply received");
      history.push({ role: "assistant", content: answer });
    } catch (error) {
      reply.textContent = "Sorry, I'm having trouble replying right now. Please try again in a moment.";
      console.error("AdMotion assistant:", error);
      if (history[history.length - 1]?.role === "user") history.pop();
    } finally {
      typing.remove(); busy = false; send.disabled = false; input.disabled = false; input.focus();
      body.scrollTop = body.scrollHeight;
    }
  }

  form.addEventListener("submit", (event) => { event.preventDefault(); sendMessage(); });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); form.requestSubmit(); }
  });
  input.addEventListener("input", () => { input.style.height = "auto"; input.style.height = Math.min(input.scrollHeight, 96) + "px"; });
})();