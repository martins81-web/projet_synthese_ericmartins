import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import AuthProvider from './components/auth/AuthProvider';



ReactDOM.render(
 <AuthProvider>
      <Router basename="/projet_synthese_ericmartins/">
        <App />
      </Router>
  </AuthProvider>,
  document.getElementById('root')
);


