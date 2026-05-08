(function () {
  const guiWidthInput = document.getElementById("guiWidthInput");
  const guiHeightInput = document.getElementById("guiHeightInput");
  const absoluteXInput = document.getElementById("absoluteXInput");
  const absoluteYInput = document.getElementById("absoluteYInput");

  function commitNumberInput(input, min, max) {
    const value = Number(input.value);

    if (input.value === "" || Number.isNaN(value)) {
      input.value = min;
      return;
    }

    if (value < min) input.value = min;
    if (value > max) input.value = max;
  }

  guiWidthInput.addEventListener("blur", () => {
    commitNumberInput(guiWidthInput, 8, 256);
  });

  guiHeightInput.addEventListener("blur", () => {
    commitNumberInput(guiHeightInput, 8, 256);
  });

  function makeDisplayOnlyInput(input) {
    if (!input) return;

    input.disabled = true;
    input.readOnly = true;
    input.tabIndex = -1;
    input.setAttribute("aria-readonly", "true");

    input.addEventListener("focus", () => {
      input.blur();
    });

    input.addEventListener("keydown", (event) => {
      event.preventDefault();
    });

    input.addEventListener("wheel", (event) => {
      event.preventDefault();
    });
  }

  makeDisplayOnlyInput(absoluteXInput);
  makeDisplayOnlyInput(absoluteYInput);
})();
