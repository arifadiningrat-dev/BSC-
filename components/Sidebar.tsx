
import React from 'react';
import { DirectorateId } from '../types';
import { DIRECTORATES } from '../constants';

interface SidebarProps {
  activeId: DirectorateId;
  onSelect: (id: DirectorateId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeId, onSelect }) => {
  return (
    <div className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center font-bold text-xl">
            M
          </div>
          <span className="font-bold text-xl tracking-wider">MTM GROUP</span>
        </div>
        <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Performance Suite</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {Object.values(DIRECTORATES).map((dir) => (
            <li key={dir.id}>
              <button
                onClick={() => onSelect(dir.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                  activeId === dir.id
                    ? 'bg-sky-600 text-white shadow-lg'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${activeId === dir.id ? 'bg-white' : 'bg-slate-600'}`} />
                <span className="font-medium text-sm">{dir.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-lg p-3 text-xs text-slate-400">
          <p>Version 2.0.26</p>
          <p>© 2026 MTM Corporation</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
