export function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') && localStorage.getItem('isLoggedIn') === "true" ? true : false;
}

export function getUser() {
    const userData = localStorage.getItem('user');

    if (userData) {
        return JSON.parse(userData);
    } else {
        return {};
    }
}