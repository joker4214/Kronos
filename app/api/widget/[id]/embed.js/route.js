export async function GET(request, { params }) {
  const widgetId = params.id;

  const script = `
(function () {
  var WIDGET_ID = ${JSON.stringify(widgetId)};
  var currentScript = document.currentScript;
  var API_BASE = (function () {
    try {
      var src = currentScript ? currentScript.src : "";
      var u = new URL(src);
      return u.origin;
    } catch (e) {
      return "";
    }
  })();

  var VISITOR_KEY = "dharma_widget_visitor_" + WIDGET_ID;
  var visitorId = localStorage.getItem(VISITOR_KEY);
  if (!visitorId) {
    visitorId = "v_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(VISITOR_KEY, visitorId);
  }

  var conversationId = null;
  var config = null;
  var open = false;

  function el(tag, props, children) {
    var e = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (k) {
        if (k === "style") Object.assign(e.style, props.style);
        else e[k] = props[k];
      });
    }
    (children || []).forEach(function (c) {
      e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return e;
  }

  function addMessage(list, role, text) {
    var bubble = el("div", {
      style: {
        maxWidth: "80%",
        margin: "6px 0",
        padding: "8px 12px",
        borderRadius: "12px",
        fontSize: "14px",
        lineHeight: "1.4",
        whiteSpace: "pre-wrap",
        alignSelf: role === "user" ? "flex-end" : "flex-start",
        background: role === "user" ? (config.themeColor || "#4A7C59") : "#f1f1f1",
        color: role === "user" ? "#fff" : "#222",
      },
    }, [text]);
    list.appendChild(bubble);
    list.scrollTop = list.scrollHeight;
  }

  function init(cfg) {
    config = cfg;

    var bubble = el("button", {
      style: {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        border: "none",
        background: config.themeColor || "#4A7C59",
        color: "#fff",
        fontSize: "24px",
        cursor: "pointer",
        boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
        zIndex: 999999,
      },
    }, ["\\uD83D\\uDCAC"]);

    var panel = el("div", {
      style: {
        position: "fixed",
        bottom: "90px",
        right: "20px",
        width: (config.width || 400) + "px",
        height: (config.height || 700) + "px",
        maxWidth: "calc(100vw - 40px)",
        maxHeight: "calc(100vh - 110px)",
        background: config.themeMode === "light" ? "#fff" : "#1a1a1a",
        color: config.themeMode === "light" ? "#111" : "#f1f1f1",
        borderRadius: "14px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
        display: "none",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: 999999,
        fontFamily: "system-ui, -apple-system, sans-serif",
      },
    });

    var header = el("div", {
      style: {
        padding: "14px 16px",
        background: config.themeColor || "#4A7C59",
        color: "#fff",
        fontWeight: "600",
        fontSize: "15px",
      },
    }, [config.name || "Chat"]);

    var list = el("div", {
      style: {
        flex: "1",
        overflowY: "auto",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
      },
    });

    var inputRow = el("div", {
      style: {
        display: "flex",
        borderTop: "1px solid rgba(128,128,128,0.25)",
        padding: "10px",
      },
    });

    var input = el("input", {
      type: "text",
      placeholder: "Type your message...",
      style: {
        flex: "1",
        border: "1px solid rgba(128,128,128,0.35)",
        borderRadius: "8px",
        padding: "8px 10px",
        fontSize: "14px",
        marginRight: "8px",
        background: config.themeMode === "light" ? "#fff" : "#2a2a2a",
        color: config.themeMode === "light" ? "#111" : "#f1f1f1",
      },
    });

    var sendBtn = el("button", {
      style: {
        border: "none",
        borderRadius: "8px",
        padding: "8px 14px",
        background: config.themeColor || "#4A7C59",
        color: "#fff",
        cursor: "pointer",
        fontSize: "14px",
      },
    }, ["Send"]);

    inputRow.appendChild(input);
    inputRow.appendChild(sendBtn);
    panel.appendChild(header);
    panel.appendChild(list);
    panel.appendChild(inputRow);

    document.body.appendChild(panel);
    document.body.appendChild(bubble);

    var greeted = false;
    function openPanel() {
      open = true;
      panel.style.display = "flex";
      if (!greeted) {
        addMessage(list, "assistant", config.greeting || "Hi! How can I help?");
        greeted = true;
      }
      input.focus();
    }

    function closePanel() {
      open = false;
      panel.style.display = "none";
    }

    bubble.addEventListener("click", function () {
      if (open) closePanel();
      else openPanel();
    });

    function send() {
      var text = input.value.trim();
      if (!text) return;
      addMessage(list, "user", text);
      input.value = "";

      fetch(API_BASE + "/api/widget/" + WIDGET_ID + "/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationId: conversationId,
          visitorId: visitorId,
        }),
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.conversationId) conversationId = data.conversationId;
          addMessage(list, "assistant", data.reply || "Sorry, something went wrong.");
        })
        .catch(function () {
          addMessage(list, "assistant", "Sorry, something went wrong.");
        });
    }

    sendBtn.addEventListener("click", send);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") send();
    });

    if (config.autoOpen) openPanel();
  }

  fetch(API_BASE + "/api/widget/" + WIDGET_ID + "/config")
    .then(function (r) { return r.json(); })
    .then(init)
    .catch(function (e) { console.error("Widget config failed to load", e); });
})();
`;

  return new Response(script, {
    headers: {
      "Content-Type": "application/javascript",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
