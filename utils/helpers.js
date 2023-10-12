module.exports = {
  
  format_data: (data) => {
    // format large numbers with commas
    return parseInt(data).toLocaleString();
  },
  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7) {
      return `<span for="img" aria-label="peach">🍑</span>`;
    } else if (randomNum > 0.4) {
      return `<span for="img" aria-label="avacado">🥑</span>`;
    } else {
      return `<span for="img" aria-label="strawberry">🍓</span>`;
    }
  },
};