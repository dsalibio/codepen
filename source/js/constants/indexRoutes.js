import Home from 'views/Home';
import Account from '../views/Account';

const indexRoutes = [
  {
    path: '/account', name: 'Account Page', component: Account, secured: false,
  },
  {
    path: '/', name: 'Home Page', component: Home, secured: false,
  },
];

export default indexRoutes;
