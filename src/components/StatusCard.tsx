import React from 'react';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface StatusCardProps {
  title: string;
  status: 'success' | 'warning' | 'error' | 'pending';
  message: string;
  timestamp: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, status, message, timestamp }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-success-500" />;
      case 'warning':
        return <AlertCircle className="h-6 w-6 text-warning-500" />;
      case 'error':
        return <AlertCircle className="h-6 w-6 text-error-500" />;
      case 'pending':
        return <Clock className="h-6 w-6 text-slate-400" />;
      default:
        return null;
    }
  };

  const getStatusColorClass = () => {
    switch (status) {
      case 'success':
        return 'bg-success-50 border-success-200 dark:bg-success-900/20 dark:border-success-700';
      case 'warning':
        return 'bg-warning-50 border-warning-200 dark:bg-warning-900/20 dark:border-warning-700';
      case 'error':
        return 'bg-error-50 border-error-200 dark:bg-error-900/20 dark:border-error-700';
      case 'pending':
        return 'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700';
      default:
        return 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700';
    }
  };

  return (
    <div className={`rounded-xl shadow-sm border ${getStatusColorClass()} backdrop-blur-sm`}>
      <div className="p-6">
        <div className="flex items-center">
          {getStatusIcon()}
          <h2 className="text-lg font-semibold ml-2 text-slate-800 dark:text-white">{title}</h2>
        </div>
        
        <div className="mt-4">
          <p className="text-xl font-medium text-slate-700 dark:text-slate-200">{message}</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Timestamp: {timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;