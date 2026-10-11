const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const RADIUS = 92;

class Progress {
  constructor(container, { value = 0, animated = false, hidden = false } = {}) {
    if (!(container instanceof HTMLElement)) {
      throw new TypeError('Progress expects an HTML element as its container.');
    }

    this.container = container;
    this.circumference = 2 * Math.PI * RADIUS;

    this.createMarkup();
    this.setValue(value);
    this.setAnimated(animated);
    this.setHidden(hidden);
  }

  createMarkup() {
    const wrapper = document.createElement('div');
    wrapper.className = 'progress-indicator';
    wrapper.setAttribute('role', 'progressbar');
    wrapper.setAttribute('aria-valuemin', '0');
    wrapper.setAttribute('aria-valuemax', '100');

    const svg = document.createElementNS(SVG_NAMESPACE, 'svg');
    svg.classList.add('progress-indicator__svg');
    svg.setAttribute('viewBox', '0 0 240 240');
    svg.setAttribute('aria-hidden', 'true');

    const track = this.createCircle('progress-indicator__track');
    this.arc = this.createCircle('progress-indicator__arc');
    this.arc.style.strokeDasharray = String(this.circumference);

    svg.append(track, this.arc);
    wrapper.append(svg);
    this.container.replaceChildren(wrapper);
    this.element = wrapper;
  }

  createCircle(className) {
    const circle = document.createElementNS(SVG_NAMESPACE, 'circle');
    circle.classList.add(className);
    circle.setAttribute('cx', '120');
    circle.setAttribute('cy', '120');
    circle.setAttribute('r', String(RADIUS));
    return circle;
  }

  setValue(value) {
    const numericValue = Number(value);
    const safeValue = Number.isFinite(numericValue)
      ? Math.min(100, Math.max(0, numericValue))
      : 0;

    this.arc.style.strokeDashoffset = String(
      this.circumference * (1 - safeValue / 100),
    );
    this.element.setAttribute('aria-valuenow', String(safeValue));
  }

  setAnimated(isAnimated) {
    this.element.classList.toggle('progress-indicator--animated', Boolean(isAnimated));
  }

  setHidden(isHidden) {
    this.container.hidden = Boolean(isHidden);
  }
}
