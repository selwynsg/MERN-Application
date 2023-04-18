
export function handleHorizontalScroll(e) {
    e.preventDefault();
    const container = e.currentTarget;
    container.scrollLeft += e.deltaY;
  }
  