
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  iconColor = "text-soothing-600",
  className 
}) => {
  return (
    <div className={cn("card-feature", className)}>
      <div className={cn("p-3 rounded-full w-fit mb-4 bg-opacity-10", iconColor.replace('text', 'bg'))}>
        <Icon className={cn("h-6 w-6", iconColor)} />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-mindful-800">{title}</h3>
      <p className="text-mindful-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
