export const truncated = (text: string, maxLength?: number) => {
    if (!maxLength) {
        maxLength = 30;
    }

    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }

    return text;
};
