const display = document.getElementById('display');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const number = document.getElementById('number');
const symbol = document.getElementById('symbol');
const lenght = document.getElementById('lenght');

function generatePassword() {
   const passwordLenght = parseInt(lenght.value, 10);
   const includeUppercase = uppercase.checked;
   const includeLowercase = lowercase.checked;
   const includeSymbol = symbol.checked;
   const includeNumber = number.checked;

   const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
   const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   const numberChars = "0123456789";
   const symbolChars = "!@#$%^&*())+=_-:";

   let allowedChars = "";
   let password = "";

   allowedChars += includeUppercase ? uppercaseChars : "";
   allowedChars += includeLowercase ? lowercaseChars : "";
   allowedChars += includeNumber ? numberChars : "";
   allowedChars += includeSymbol ? symbolChars : "";

   if (isNaN(passwordLenght)) {
      return displayText(`Input a valid number as password Lenght`)
   }

   if (passwordLenght < 4) {
      return displayText(`Password lenght must be at least 4`);
   }

   if (passwordLenght > 10) {
      return displayText(`Password lenght must be below 10`)
   }

   if (allowedChars.length === 0) {
      return displayText(`At least one set need to be enabled`);
   }

   for (let i = 0; i < passwordLenght; i++) {
      const randomindex = Math.floor(Math.random() * allowedChars.length);
      password += allowedChars[randomindex];
   }

   displayText(password);
};

function displayText(string) {
   return display.textContent = string;
}
generatePassword()