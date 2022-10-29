export const isCookieStored = (name) => {
    const cookies = document.cookie.split(";");
    let isFound = false;
    cookies.forEach(cookie => {
        const [key, value] = cookie.split("=");
        if (key === name) {
            isFound = true;
        }
    })
    return isFound;
}