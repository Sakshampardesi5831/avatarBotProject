export  function EmailName(email) {
    const username = email.substring(0, email.indexOf('@'));
    return username;
}