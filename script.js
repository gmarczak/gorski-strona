document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('#calculator button');
    let currentInput = '';
    let resetNext = false;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.textContent;
            if (value === '=') {
                try {
                    currentInput = eval(currentInput).toString();
                } catch {
                    currentInput = 'Błąd';
                }
                display.value = currentInput;
                resetNext = true;
            } else if (value === 'C') {
                currentInput = '';
                display.value = '';
            } else {
                if (resetNext) {
                    currentInput = '';
                    resetNext = false;
                }
                currentInput += value;
                display.value = currentInput;
            }
        });
    });
});

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('zegar').textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

const kalkulator = document.getElementById('kalkulator');
if (kalkulator) {
    kalkulator.innerHTML = `
        <div id="kalkulator-wyswietlacz" class="kalkulator-wyswietlacz"></div>
        <div class="kalkulator-przyciski">
            <button class="btn" data-action="ce">CE</button>
            <button class="btn" data-action="c">C</button>
            <button class="btn" data-action="del">DEL</button>
            <button class="btn" data-action="%">%</button>
            <button class="btn" data-action="7">7</button>
            <button class="btn" data-action="8">8</button>
            <button class="btn" data-action="9">9</button>
            <button class="btn" data-action="*">*</button>
            <button class="btn" data-action="4">4</button>
            <button class="btn" data-action="5">5</button>
            <button class="btn" data-action="6">6</button>
            <button class="btn" data-action="-">-</button>
            <button class="btn" data-action="1">1</button>
            <button class="btn" data-action="2">2</button>
            <button class="btn" data-action="3">3</button>
            <button class="btn" data-action="+">+</button>
            <button class="btn" data-action="0">0</button>
            <button class="btn" data-action=",">,</button>
            <button class="btn" data-action="=">=</button>
        </div>
    `;

    const wyswietlacz = document.getElementById('kalkulator-wyswietlacz');
    let current = '';
    let prev = '';
    let operator = '';
    let justEvaluated = false;

    function updateDisplay() {
        wyswietlacz.textContent = current || prev || '0';
    }

    kalkulator.addEventListener('click', function (e) {
        const btn = e.target.closest('button');
        if (!btn) return;
        const action = btn.getAttribute('data-action');

        if (!isNaN(action)) { // liczby
            if (justEvaluated) {
                current = action;
                justEvaluated = false;
            } else {
                if (current.length < 16) current += action;
            }
        } else if (action === ',') { // przecinek
            if (justEvaluated) {
                current = '0,';
                justEvaluated = false;
            } else if (!current.includes(',')) {
                current = current ? current + ',' : '0,';
            }
        } else if (['+', '-', '*', '%'].includes(action)) {
            if (current) {
                if (prev && operator) {
                    prev = oblicz();
                } else {
                    prev = current;
                }
                current = '';
            }
            operator = action;
            justEvaluated = false;
        } else if (action === '=') {
            if (operator && prev && current) {
                current = oblicz();
                prev = '';
                operator = '';
                justEvaluated = true;
            }
        } else if (action === 'c') { // wyczyść wszystko
            current = '';
            prev = '';
            operator = '';
            justEvaluated = false;
        } else if (action === 'ce') { // wyczyść bieżące
            current = '';
        } else if (action === 'del') { // usuń ostatni znak
            if (current) current = current.slice(0, -1);
        }
        updateDisplay();
    });

    function oblicz() {
        let a = parseFloat(prev.replace(',', '.'));
        let b = parseFloat(current.replace(',', '.'));
        let result = '';
        switch (operator) {
            case '+': result = a + b; break;
            case '-': result = a - b; break;
            case '*': result = a * b; break;
            case '%': result = b !== 0 ? a % b : 'Błąd'; break;
        }
        // Zamiana kropki na przecinek w wyniku
        if (typeof result === 'number') {
            result = result.toString().replace('.', ',');
        }
        return result.toString();
    }

    updateDisplay();
}

const btnMotyw = document.getElementById('dark-mode-toggle');
if (btnMotyw) {
    btnMotyw.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
}

let wylosowana = Math.floor(Math.random() * 100) + 1;
const input = document.getElementById('zgadywana-liczba');
const btn = document.getElementById('sprawdz-liczbe');
const wynik = document.getElementById('wynik');

if (btn && input && wynik) {
    btn.addEventListener('click', () => {
        const liczba = parseInt(input.value, 10);
        if (isNaN(liczba) || liczba < 1 || liczba > 100) {
            wynik.textContent = "Podaj liczbę od 1 do 100!";
            return;
        }
        if (liczba === wylosowana) {
            wynik.textContent = "Gratulacje! Zgadłeś liczbę!";
            wylosowana = Math.floor(Math.random() * 100) + 1; // nowa gra
        } else if (liczba < wylosowana) {
            wynik.textContent = "Za mało!";
        } else {
            wynik.textContent = "Za dużo!";
        }
        input.value = '';
        input.focus();
    });
}
const parallaxBox = document.querySelector('.parallax-box');
const parallaxBg = document.querySelector('.parallax-bg');
if (parallaxBox && parallaxBg) {
    parallaxBox.addEventListener('mousemove', e => {
        const rect = parallaxBox.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        parallaxBg.style.transform = `scale(1.08) translate(${x * 20}px, ${y * 20}px)`;
    });
    parallaxBox.addEventListener('mouseleave', () => {
        parallaxBg.style.transform = 'scale(1.08) translate(0,0)';
    });
    // Startowy efekt
    parallaxBg.style.transform = 'scale(1.08) translate(0,0)';
}

const tempInput = document.getElementById('temp-input');
const convertBtn = document.getElementById('convert-temp');
const tempResult = document.getElementById('temp-result');

if (tempInput && convertBtn && tempResult) {
    convertBtn.addEventListener('click', () => {
        const c = parseFloat(tempInput.value);
        if (isNaN(c)) {
            tempResult.textContent = "Podaj poprawną temperaturę!";
            return;
        }
        const f = (c * 9 / 5) + 32;
        tempResult.textContent = `${c}°C = ${f.toFixed(2)}°F`;
    });
}