const progress = new Progress(document.querySelector('#progress'), { value: 60 });
const valueInput = document.querySelector('#value');
const animateInput = document.querySelector('#animate');
const hideInput = document.querySelector('#hide');

valueInput.addEventListener('input', () => {
  if (valueInput.value === '') return;

  const value = Math.min(100, Math.max(0, Number(valueInput.value)));
  valueInput.value = value;
  progress.setValue(value);
});

valueInput.addEventListener('blur', () => {
  if (valueInput.value === '') {
    valueInput.value = '0';
    progress.setValue(0);
  }
});

animateInput.addEventListener('change', () => {
  progress.setAnimated(animateInput.checked);
});

hideInput.addEventListener('change', () => {
  progress.setHidden(hideInput.checked);
});
