import { useState } from "react";
// Hook
// useStatefrom reactđược nhập để quản lý trạng thái của giá trị 
// được lưu trữ trong thành phần bằng hook.
// useLocalStoragelà một hook React tùy chỉnh đóng gói logic để tương tác với bộ nhớ cục bộ của trình duyệt. Phải mất hai đối số:
// key(chuỗi): Mã định danh duy nhất cho mục dữ liệu sẽ được lưu trữ hoặc truy xuất từ ​​bộ nhớ cục bộ.
// initialValue(bất kỳ): Giá trị mặc định được trả về nếu không tìm thấy giá trị nào trong bộ nhớ cục bộ hoặc nếu xảy ra lỗi.
export function useLocalStorage(key: string, initialValue: any) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value: any) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };
    return [storedValue, setValue];
}
