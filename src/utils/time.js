const beautify = (inputTime) => {
    const firstIndex = inputTime.indexOf('T');
    const secondIndex = inputTime.indexOf('.');
    const date = inputTime.substring(0, firstIndex);
    const time = inputTime.substring(firstIndex + 1, secondIndex);
    const result = `${date} ${time}`
    return result;
}

export {
    beautify,
}