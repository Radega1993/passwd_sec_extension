const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const specialChars = '!@#$%^&*()-_=+[]{};:,.?';

document.getElementById('generate').addEventListener('click', function() {
    const selectedTypes = [];
    let charset = '';
    
    if (document.getElementById('upperCase').checked) {
        charset += upperChars;
        selectedTypes.push(upperChars);
    }
    
    if (document.getElementById('lowerCase').checked) {
        charset += lowerChars;
        selectedTypes.push(lowerChars);
    }
    
    if (document.getElementById('numbers').checked) {
        charset += numberChars;
        selectedTypes.push(numberChars);
    }
    
    if (document.getElementById('specialChars').checked) {
        charset += specialChars;
        selectedTypes.push(specialChars);
    }

    const passwordLength = parseInt(document.getElementById('length').value);
    let password = '';
    let lastCharType = '';

    // Asegurarse de que la contraseña tenga al menos uno de cada tipo
    for (const type of selectedTypes) {
        const randomIndex = Math.floor(Math.random() * type.length);
        password += type[randomIndex];
    }

    while (password.length < passwordLength) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        const newChar = charset[randomIndex];
        
        if (lastCharType && lastCharType.indexOf(newChar) !== -1) continue; // No permitir dos caracteres del mismo tipo consecutivos
        
        password += newChar;
        
        for (const type of selectedTypes) {
            if (type.indexOf(newChar) !== -1) {
                lastCharType = type;
                break;
            }
        }
    }
    
    document.getElementById('password').value = password;
});

document.getElementById('copy').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
});
