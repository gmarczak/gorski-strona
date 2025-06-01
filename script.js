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