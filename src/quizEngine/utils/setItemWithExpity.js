function setItemWithExpiry(key, value, timeToLive) {
    if (typeof window !== 'undefined') {
        const miliseconds = timeToLive * 60 * 60 * 1000;
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + miliseconds,
        };
        window.localStorage.setItem(key, JSON.stringify(item));
    }
}
export default setItemWithExpiry;
