import React from 'react'
import HomePage from './HomePage'
import { UserProvider } from './UserContext'

const App = () => {
    return (
        <UserProvider >
            <HomePage />
        </UserProvider>
    )
};
export default App