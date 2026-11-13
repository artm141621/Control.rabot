// ============================================================
// Задание 2. Кнопка + console.log + изменение текста
// ============================================================
document.getElementById("changeBtn").addEventListener("click", function () {
    console.log("Кнопка нажата");
    document.getElementById("dynamicText").textContent =
        "Текст изменён! Кнопка действительно работает.";
});

// ============================================================
// Задание 3. Загрузка CSV из опубликованной Google Таблицы
// ============================================================
// ВАЖНО: замените URL ниже на свою ссылку "Publish to web → CSV".
const CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vXXXXXXXXXXXXXXXXXXXX/pub?output=csv";

async function loadBooks() {
    const statusEl = document.getElementById("status");
    const tbody = document.getElementById("booksBody");

    try {
        const response = await fetch(CSV_URL, { cache: "no-store" });

        // исправлено: добавил проверку response.ok, т.к. ИИ предложил
        // просто response.text() без проверки
        if (!response.ok) {
            throw new Error("HTTP " + response.status + ": не удалось загрузить CSV");
        }

        const text = await response.text();
        const rows = text.trim().split(/\r?\n/).map(line => line.split(","));

        if (rows.length < 2) {
            throw new Error("В таблице нет данных");
        }

        tbody.innerHTML = "";
        for (let i = 1; i < rows.length; i++) {
            const tr = document.createElement("tr");
            rows[i].forEach(cell => {
                const td = document.createElement("td");
                td.textContent = (cell || "").trim();
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        }

        statusEl.textContent = "Данные загружены успешно (" + (rows.length - 1) + " строк).";
    } catch (err) {
        // исправлено: ИИ не добавил обработку ошибок — я добавил try/catch
        statusEl.textContent = "Ошибка загрузки: " + err.message;
        console.error("Ошибка fetch:", err);
    }
}

document.addEventListener("DOMContentLoaded", loadBooks);

// ============================================================
// Остальные пункты
// ============================================================
window.addEventListener("load", function () {
    document.getElementById("hitext").value = "Привет от JavaScript!";
});

document.getElementById("showMsgBtn").addEventListener("click", function () {
    document.getElementById("Textbox").value = "Привет! Кнопка нажата.";
});

document.querySelectorAll("input[type=checkbox][data-name]").forEach(cb => {
    cb.addEventListener("change", function () {
        if (this.checked) {
            document.getElementById("CheckBox").value = "Выбран " + this.dataset.name;
        }
    });
});

document.querySelectorAll("input[type=radio][name=r]").forEach(rb => {
    rb.addEventListener("change", function () {
        document.getElementById("RadioBox").value = "Выбран " + this.value;
    });
});

document.getElementById("Select1").addEventListener("change", function () {
    document.getElementById("SelectBox").value =
        "Вы выбрали опцию " + (this.selectedIndex + 1) + " (" + this.value + ")";
});

document.getElementById("confirmBtn").addEventListener("click", function () {
    const place = document.getElementById("imgPlace");
    if (confirm("Загрузить изображение?") === true) {
        // Путь к картинке исправлен на images.png
        place.innerHTML = "<img src='images.png' alt='Логотип Манчестер Сити' width='150'>";
    } else {
        place.innerHTML = "<i>Изображение не загружено.</i>";
    }
});

document.getElementById("alertBtn").addEventListener("click", function () {
    alert("Это пример функции alert()!\nОна выводит диалоговое окно с сообщением.");
});

document.getElementById("promptBtn").addEventListener("click", function () {
    const name = prompt("Введите ваше имя:", "Студент");
    const res = document.getElementById("PromptResult");
    if (name !== null && name !== "") {
        res.innerHTML = "<b>Здравствуйте, " + name + "!</b>";
    } else {
        res.innerHTML = "<i>Вы не ввели имя.</i>";
    }
});