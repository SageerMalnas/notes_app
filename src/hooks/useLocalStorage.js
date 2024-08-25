import { useState,useEffect } from "react"; 

export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() =>{
        try{
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(itme) : initialValue;
        }catch(error){
            console.error('Error reading localStorage key:', key);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error('Error setting localStorage key:', key);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}