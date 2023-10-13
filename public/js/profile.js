const yesButton = document.getElementById('yesButton');
  const noButton = document.getElementById('noButton');
  const countSpan = document.getElementById('count');

  let count = 0; // Initialize the count

  // Add click event listeners to the buttons
  yesButton.addEventListener('click', function() {
    count += 1;
    countSpan.textContent = count;
  });

  noButton.addEventListener('click', function() {
    count -= 1;
    countSpan.textContent = count;
  });