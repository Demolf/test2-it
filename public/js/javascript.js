// public/js/javascript.js
document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("form");
  const content = document.getElementById("content");
  const name = document.getElementById("name");
  const news = document.getElementById("news");

  const sendNews = async (name, content) => {
    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, content }),
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки");
      }
      return await response.json();
    } catch (err) {
      z("Ошибка отправки сообщения:", err);
      alert("Не удалось отправить сообщение. Проверьте подключение.");
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name1 = name.value.trim() || "Аноним";
    const content1 = content.value.trim();

    if (content1) {
      const get = await sendNews(name1, content1);
      addMessageToChat(get.message.name, get.message.content, get.message.time);
      console.log(get);
      content.value = "";
    }
  });

  function addMessageToChat(name, content, time) {
    html = `<div class="list">
              <div class="disex">
                <div class="name">
                  ${name}
                </div>
                <div class="content">
                  ${content}
                </div>
              </div>
            </div>`;
    appendChild("#news", html);
    scrollToBottom();
  }

  // Прокрутка вниз
  function scrollToBottom() {
    news.scrollTop = news.scrollHeight;
  }

  function appendChild(id, html, insertAdjacentHTML = 0) {
    let iat = "beforeend";
    if (insertAdjacentHTML) iat = "afterend";
    const doc = document.querySelector(id);
    if (doc) doc.insertAdjacentHTML(iat, html);
  }

  //   const response = await fetch("/api/news");
  //   console.log(await response.json())
});
