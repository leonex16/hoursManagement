export function generateKey() {
  const randomCharacter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const key = [];

  for (let i = 0; i < 64; i++) {
    const char = randomCharacter.charAt(Math.round(Math.random() * randomCharacter.length));

    if ( char === "" ) {
      i--;
      continue;
    }

    key.push(char)
  }

  return key.join('').replace(/(.{8})/g, '-$1').substring(1);
}