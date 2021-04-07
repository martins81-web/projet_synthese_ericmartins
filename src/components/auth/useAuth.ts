import { useContext } from 'react';

import { AuthContext } from './AuthProvider';

//context authentication
const useAuth=()=> useContext(AuthContext);
export default useAuth;