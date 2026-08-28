import React from 'react';
import {
  Home,
  BarChart2,
  TrendingUp,
  FileText,
  ClipboardList,
  Users,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard geral' },
    { icon: BarChart2, label: 'Dashboard · Fomento' },
    { icon: TrendingUp, label: 'Dashboard · Readequação de Metas' },
    { icon: BarChart2, label: 'Dashboard · Prestação de Contas' },
  ];

  const bottomItems = [
    { icon: FileText, label: 'Fomento · DI' },
    { icon: Users, label: 'Fomento · Inscritos' },
  ];

  return (
    <aside className={`sidebar${isOpen ? ' open' : ''}`}>
      <div className="sidebar-brand">
        <div className="sidebar-brand-title">Observa Cultura</div>
        <div className="sidebar-brand-subtitle">Sistema SECULT</div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <a key={index} href="#" className="sidebar-link">
            <item.icon size={18} />
            <span>{item.label}</span>
          </a>
        ))}

        <a href="#" className="sidebar-link active">
          <ClipboardList size={18} />
          <span>Análise Inadimplência</span>
        </a>

        {bottomItems.map((item, index) => (
          <a key={index} href="#" className="sidebar-link">
            <item.icon size={18} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">D</div>
          <div style={{ minWidth: 0 }}>
            <div className="sidebar-user-name">Davi Nunes Carva...</div>
            <div className="sidebar-user-role">Diretoria 1</div>
          </div>
          <button className="sidebar-user-logout" title="Sair">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
