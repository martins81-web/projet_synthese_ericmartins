import { createContext } from 'react';

import { IUseAuthProvider } from './useAuthProvider';
import useAuthProvider from './useAuthProvider';

export const AuthContext = createContext<IUseAuthProvider | null>(null);

const AuthProvider: React.FC = ({ children }) => {
    const auth = useAuthProvider();
    return <AuthContext.Provider value={auth}> {children}</AuthContext.Provider>;
};

export default AuthProvider;