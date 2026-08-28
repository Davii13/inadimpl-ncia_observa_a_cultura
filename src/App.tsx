import './index.css';
import { Sidebar } from './components/Sidebar';
import { AnaliseInadimplencia } from './pages/AnaliseInadimplencia';

function App() {
  return (
    <div className="app-shell">
      <Sidebar isOpen />
      <main className="main-content">
        <AnaliseInadimplencia />
      </main>
    </div>
  );
}

export default App;
