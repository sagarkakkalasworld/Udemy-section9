import React from 'react';
import { CheckCircle, Code, Package, Rocket } from 'lucide-react';

interface TimelineItemProps {
  icon: React.ReactNode;
  title: string;
  time: string;
  description: string;
  isCompleted: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  icon,
  title,
  time,
  description,
  isCompleted,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
          isCompleted ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
        }`}>
          {icon}
        </div>
        {/* Vertical line except for last item */}
        <div className="w-px h-full bg-slate-200 dark:bg-slate-700 flex-grow mt-2"></div>
      </div>
      <div className="pb-8">
        <div className="flex items-center">
          <h3 className="font-medium text-slate-800 dark:text-white">{title}</h3>
          {isCompleted && (
            <CheckCircle className="ml-2 h-4 w-4 text-success-500" />
          )}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{time}</p>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{description}</p>
      </div>
    </div>
  );
};

const Timeline: React.FC = () => {
  const timelineItems = [
    {
      icon: <Code className="h-5 w-5" />,
      title: "Code Committed",
      time: "3 minutes ago",
      description: "All changes successfully committed to the main branch.",
      isCompleted: true,
    },
    {
      icon: <Package className="h-5 w-5" />,
      title: "Build Process",
      time: "2 minutes ago",
      description: "Application built and packaged successfully with all dependencies.",
      isCompleted: true,
    },
    {
      icon: <Rocket className="h-5 w-5" />,
      title: "Deployment",
      time: "1 minute ago",
      description: "Application deployed to production environment successfully.",
      isCompleted: true,
    },
  ];

  return (
    <div className="mt-8 bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Deployment Timeline</h2>
      <div className="mt-4">
        {timelineItems.map((item, index) => (
          <TimelineItem
            key={index}
            icon={item.icon}
            title={item.title}
            time={item.time}
            description={item.description}
            isCompleted={item.isCompleted}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;