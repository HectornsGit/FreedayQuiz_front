import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.log(error)
            return initialValue
        }
    })

    useEffect(() => {
        if (storedValue) {
            window.localStorage.setItem(key, storedValue)
        }
        if (storedValue === null || storedValue === undefined) {
            window.localStorage.removeItem(key)
        } else {
            window.localStorage.setItem(key, JSON.stringify(storedValue))
        }

        const storageChangeHandler = (event) => {
            if (event.storageArea === localStorage && event.key === key) {
                setStoredValue(
                    event.newValue ? JSON.parse(event.newValue) : initialValue
                )
            }
        }

        window.addEventListener('storage', storageChangeHandler)

        return () => {
            window.removeEventListener('storage', storageChangeHandler)
        }
    }, [key, storedValue, initialValue])

    return [storedValue, setStoredValue]
}
