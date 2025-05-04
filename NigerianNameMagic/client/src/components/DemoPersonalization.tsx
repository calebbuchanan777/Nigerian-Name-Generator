import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ETHNICITIES } from '@/lib/nameData';

export default function DemoPersonalization() {
  const { toast } = useToast();

  const handleUnlockClick = () => {
    toast({
      title: "Premium Feature",
      description: "Upgrade to unlock personalized name generation!",
      variant: "default",
    });
  };

  return (
    <div className="mt-8 w-full max-w-md">
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-gray-500 font-heading">PREMIUM PREVIEW</h3>
          <span className="text-xs text-gray-500">Locked</span>
        </div>
        
        <div className="filter blur-sm">
          <div className="flex flex-col space-y-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1 font-body">Your Name</Label>
              <Input 
                type="text" 
                placeholder="Enter your name" 
                className="w-full p-2 border border-gray-300 rounded-md" 
                disabled
              />
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1 font-body">Ethnic Group</Label>
              <Select disabled>
                <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md">
                  <SelectValue placeholder="Yoruba" />
                </SelectTrigger>
                <SelectContent>
                  {ETHNICITIES.map((ethnicity) => (
                    <SelectItem key={ethnicity.id} value={ethnicity.id}>
                      {ethnicity.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="bg-[hsl(var(--nigerian-gold))] text-white font-bold py-2 px-4 rounded-md opacity-70" 
              disabled
            >
              Generate Personalized Name
            </Button>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button
            onClick={handleUnlockClick}
            variant="secondary"
            size="sm"
            className="text-xs font-medium"
          >
            Unlock Personalization
          </Button>
        </div>
      </div>
    </div>
  );
}
