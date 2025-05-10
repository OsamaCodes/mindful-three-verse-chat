
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatarSrc?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  role,
  avatarSrc
}) => {
  const initials = name.split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <Quote className="h-8 w-8 text-soothing-300 mb-4" />
        <p className="text-gray-700 mb-6 flex-grow">{quote}</p>
        <div className="flex items-center space-x-4">
          <Avatar>
            {avatarSrc ? (
              <AvatarImage src={avatarSrc} alt={name} />
            ) : null}
            <AvatarFallback className="bg-mindful-100 text-mindful-800">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-mindful-800">{name}</p>
            <p className="text-sm text-mindful-500">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
