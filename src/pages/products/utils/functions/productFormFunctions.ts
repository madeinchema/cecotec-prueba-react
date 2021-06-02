const moveCursorToEnd = (element: EventTarget & HTMLInputElement): void => {
  const { name, value } = element
  if (name === 'price') {
    /* eslint-disable no-param-reassign */
    element.selectionStart = value.length
    element.selectionEnd = value.length
    /* eslint-disable no-param-reassign */
  }
}

export { moveCursorToEnd }
