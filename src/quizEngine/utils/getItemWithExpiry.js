function getItemWithExpiry(key) {
    if (typeof window !== 'undefined') {
        const itemStored = window.localStorage.getItem(key);

        if (!itemStored) {
            return null;
        }
        const item = JSON.parse(itemStored);
        const now = new Date();

        //Borrar datos expirados:
        if (now.getTime() > item.expiry) {
            window.localStorage.removeItem(key);
            return null;
        }
        return item.value;
    }
}
export default getItemWithExpiry;
