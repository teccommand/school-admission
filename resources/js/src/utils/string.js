export const truncated = (text) => {
    const maxLength = 30;
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }

    return text;
}