/**
 * 用于为el节点增加styles
 * @param el HTMLElement
 * @param style Styles
 */
function setStyle(el, styles) {
  const keys = Object.keys(styles);
  keys.forEach(key => {
    // eslint-disable-next-line no-param-reassign
    el.style[key] = styles[key];
  });
}

export default setStyle;
