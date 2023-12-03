const cutSentence = (sentence, maxLength) => {
  if (sentence.split(" ").length > maxLength) {
    return sentence.split(" ").slice(0, maxLength).join(" ") + "...";
  }
  return sentence;
};

const timeIndonesia = (stringTime) => {
  return String(stringTime).substring(0, 5).replace(":", ".");
};

export { cutSentence, timeIndonesia };
