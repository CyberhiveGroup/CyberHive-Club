
'use client';

import * as React from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Check, Edit, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface EditableTextProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
  textarea?: boolean; // Use textarea instead of input
}

export function EditableText({ as: Component = 'span', value, onSave, className, textarea = false }: EditableTextProps) {
  const { isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState(value);

  React.useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleSave = () => {
    onSave(currentValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentValue(value);
    setIsEditing(false);
  };

  if (!isAdmin) {
    return <Component className={className}>{value}</Component>;
  }

  return (
    <Popover open={isEditing} onOpenChange={setIsEditing}>
      <div className={cn("relative group", isEditing && "bg-primary/5 rounded-md")}>
        <Component className={className}>{value}</Component>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute -top-2 -right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-80" align="start" onEscapeKeyDown={handleCancel}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Edit Text</h4>
            <p className="text-sm text-muted-foreground">
              Make changes to the content.
            </p>
          </div>
          <div className="grid gap-2">
            {textarea ? (
              <Textarea
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                className="min-h-[120px]"
                autoFocus
              />
            ) : (
              <Input
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
            )}
          </div>
          <div className="flex justify-end gap-2">
             <Button variant="ghost" size="icon" onClick={handleCancel}>
                <X className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={handleSave}>
                <Check className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
