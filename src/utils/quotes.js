const loveQuotes = [
  "You are my today and all of my tomorrows. - Leo Christopher",
  "I love you not because of who you are, but because of who I am when I am with you.",
  "In all the world, there is no heart for me like yours. - Maya Angelou",
  "You don't love someone for their looks, or their clothes, or for their fancy car, but because they sing a song only you can hear.",
  "I wish I could turn back the clock. I'd find you sooner and love you longer.",
  "Every love story is beautiful, but ours is my favorite.",
  "You are my sun, my moon, and all my stars. - E.E. Cummings",
  "I fell in love the way you fall asleep: slowly, then all at once. - John Green",
  "Whatever our souls are made of, his and mine are the same. - Emily Bronte",
  "I have found the one whom my soul loves. - Song of Solomon 3:4",
  "You had me at hello. - Jerry Maguire",
  "I'm much more me when I'm with you.",
  "If I know what love is, it is because of you. - Hermann Hesse",
  "You are the answer to every prayer I've offered.",
  "My heart is and always will be yours. - Jane Austen",
  "Love is not about how many days, months, or years you've been together. It's about how much you love each other every single day.",
  "Nice try! But you can't say no to this face 😘",
  "Haha, wrong button! Try again 💕",
  "Are you sure? Because my heart says otherwise 💗",
  "Error 404: 'No' is not a valid response 😂❤️",
];

const funnyNoQuotes = [
  "Oops! That button doesn't work 😜",
  "Nice try! But you can't escape love 💘",
  "Wrong answer! Let me help you find the right one 😏",
  "My love for you is like a JavaScript loop — it never ends! 💕",
  "404: Rejection not found 😂",
  "Did you just... no? That's illegal! 🚔💕",
  "The 'No' button is just there for decoration 🎀",
  "Even my code has better error handling than that! 💔➡️❤️",
];

export function getRandomQuote() {
  return loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
}

export function getRandomFunnyQuote() {
  return funnyNoQuotes[Math.floor(Math.random() * funnyNoQuotes.length)];
}

export const galleryQuotes = [
  "Every moment with you is a treasure",
  "You make my heart smile",
  "Together is my favorite place to be",
  "Love is the bridge between two hearts",
  "You are my happily ever after",
  "In your arms, I found my home",
  "Our love story is my favorite",
  "You are the reason I believe in love",
];

export const romanticQuestions = [
  "Do you promise to always hold my hand?",
  "Will you always be my morning sunshine?",
  "Do you believe our love is written in the stars?",
  "Do you promise to never stop making me laugh?",
  "Namma life ah serndhu build pannalama? Nee naan, namakku nu oru veedu, adhula love niraya irukkum…apram nammaloda oru cute little princess(kutty papu) oda innum azhagana vaazhkai?",

];
