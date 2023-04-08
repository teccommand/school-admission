import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface IProps {
    isSignedIn : boolean,
    children : ReactNode
}

const Protected : React.FC<IProps> = ({ isSignedIn, children }) => {
    if (!isSignedIn) {
        return <Navigate to="/login" replace />
    }
    return <>{children}</>
}
export default Protected;