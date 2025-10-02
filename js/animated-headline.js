// animated-headline.js
document.addEventListener("DOMContentLoaded", () => {
  const headlines = document.querySelectorAll(".cd-headline");

  headlines.forEach(headline => {
    const words = headline.querySelectorAll("b");
    let wordIndex = 0;

    // Show first word
    words.forEach((w, i) => (w.style.opacity = i === 0 ? "1" : "0"));

    // Animate words
    setInterval(() => {
      words[wordIndex].style.opacity = "0";
      wordIndex = (wordIndex + 1) % words.length;
      words[wordIndex].style.opacity = "1";
    }, 2500); // same timing as original (adjust as needed)
  });
});
