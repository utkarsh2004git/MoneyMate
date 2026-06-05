// import React, { createContext, useState } from 'react'

// export const AppContext = createContext();

// const AppContextProvider = ({children})=>{

//     const [user,setUser] = useState(null);

    
//     const clearUser =()=>{
//         setUser(null);
//     }

//     const contextValue={
//         user,
//         setUser,
//         clearUser
//     }
//     return(
//         <AppContext.Provider value={contextValue}>
//             {children}
//         </AppContext.Provider>
//     )
// }

// export default AppContextProvider



import React, { createContext, useState, useEffect } from 'react'

export const AppContext = createContext();

const AppContextProvider = ({children}) => {

    // 1. Check localStorage on initial load
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // 2. Sync user state to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);
    
    const clearUser = () => {
        setUser(null);
        // Note: The useEffect above will automatically remove it from localStorage,
        // but your Menubar's handleLogout also runs localStorage.clear() which is fine!
    }

    const contextValue = {
        user,
        setUser,
        clearUser
    }
    
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider