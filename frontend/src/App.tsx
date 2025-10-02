import { useAuthContext } from './core/contexts/auth';
import { MenuItemProvider } from './core/contexts/menuItem';
import { Auth, Dashboard } from './pages';

export default function App() {
  const { user } = useAuthContext();

  if (user)
    return (
      <MenuItemProvider>
        <Dashboard />
      </MenuItemProvider>
    );

  return <Auth />;
}
