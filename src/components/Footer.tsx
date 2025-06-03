import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-slate-200 dark:border-slate-700 pt-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2025 Sagar Kakkala. CI/CD Platform.
          </p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 transition-colors">
            <Github className="h-5 w-5" />
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 transition-colors">
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;