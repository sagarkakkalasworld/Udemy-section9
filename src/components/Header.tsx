import React from 'react';
import { Code2, GitBranch } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="pt-8 sm:pt-12">
      <div className="flex items-center mb-2">
        <div className="flex items-center justify-center bg-primary-600 text-white p-2 rounded-lg mr-3">
          <Code2 className="h-6 w-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-white tracking-tight">
          Welcome to CI/CD World <span className="hidden sm:inline">with Sagar Kakkala</span>
        </h1>
      </div>
      <div className="sm:hidden mt-1 text-xl font-medium text-slate-700 dark:text-slate-300">
        with Sagar Kakkala
      </div>
      <div className="flex items-center mt-3 text-slate-600 dark:text-slate-400">
        <GitBranch className="h-4 w-4 mr-2" />
        <span className="text-sm">main • Deployed successfully</span>
      </div>
    </header>
  );
};

export default Header;