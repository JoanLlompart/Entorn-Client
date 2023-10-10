function palindrome(str) {
    var str1 = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    var invers = str1.split('').reverse().join('');

    if (str1 === invers) {
        return true;
    } else {
        return false;
    }
}
palindrome("eye");