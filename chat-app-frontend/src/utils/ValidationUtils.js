
const usernameRegex = new RegExp("^[a-zA-Z0-9]*$");
const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$");
const mailRegex = new RegExp("^(.+)@(.+)$");

export const validateUsername = (username) => {
    return username.length >= 4 && usernameRegex.test(username);
};

export const validatePassword = (password) => {
    if (password.length < 8) {
        return 'Passwords must be at least 8 characters in length';
    }
    if (!passwordRegex.test(password)) {
        return 'Password must contain upper and lower case letters, numbers and special characters!';
    }
    return 'ok';
};


export const validateMail = (mail) => {
    return mailRegex.test(mail);
}