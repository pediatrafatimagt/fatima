// animated-headline.js (vanilla)
document.addEventListener("DOMContentLoaded", () => {
  const headlines = Array.from(document.querySelectorAll(".cd-headline.letters"));

  if (!headlines.length) return;

  headlines.forEach(headline => {
    const words = Array.from(headline.querySelectorAll("b")); // expects <b>word</b> markup
    if (words.length <= 1) return;

    // turn each word into spans for each letter
    words.forEach((word) => {
      const text = word.textContent.trim();
      word.innerHTML = ""; // clear
      const frag = document.createDocumentFragment();
      for (let ch of text) {
        const span = document.createElement("span");
        span.className = "letter";
        span.textContent = ch;
        frag.appendChild(span);
      }
      word.appendChild(frag);
      word.style.opacity = 0;
    });

    let current = 0;
    words[current].style.opacity = 1;
    Array.from(words[current].querySelectorAll(".letter")).forEach(l => l.classList.add("in"));

    const letterDelay = 40; // ms between letters
    const wordDelay = 2200; // ms between words

    function showWord(next) {
      const outWord = words[current];
      const inWord = words[next];

      // animate out (letters out)
      const outLetters = Array.from(outWord.querySelectorAll(".letter"));
      outLetters.forEach((l, i) => {
        setTimeout(() => l.classList.remove("in"), i * (letterDelay / 2));
      });

      // prepare inWord
      inWord.style.opacity = 1;
      const inLetters = Array.from(inWord.querySelectorAll(".letter"));
      inLetters.forEach(l => l.classList.remove("in"));

      // animate in
      inLetters.forEach((l, i) => {
        setTimeout(() => l.classList.add("in"), 300 + i * letterDelay);
      });

      // hide outWord after animation
      setTimeout(() => {
        outWord.style.opacity = 0;
      }, 300 + inLetters.length * letterDelay + 200);

      current = next;
    }

    // loop
    setInterval(() => {
      const next = (current + 1) % words.length;
      showWord(next);
    }, wordDelay);
  });
});
