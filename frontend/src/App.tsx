import { useAuthContext } from './core/contexts/auth';
import { Auth, Dashboard } from './pages';

export default function App() {
  const { user } = useAuthContext();

  if (user) return <Dashboard />;

  return <Auth />;
}
