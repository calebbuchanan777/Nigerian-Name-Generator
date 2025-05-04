import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, CheckCircle, UnlockIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PremiumFeatures() {
  const { toast } = useToast();

  const handleUnlockPremium = () => {
    toast({
      title: "Premium Features",
      description: "This feature is not yet implemented. Coming soon!",
      variant: "default",
    });
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md border-t-4 border-[hsl(var(--nigerian-gold))]">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-bold text-[hsl(var(--dark-text))] flex items-center">
            <Crown className="text-[hsl(var(--nigerian-gold))] mr-2" /> Premium Features
          </h2>
          <span className="bg-[hsl(var(--nigerian-gold))] text-[hsl(var(--nigerian-black))] text-xs font-bold py-1 px-2 rounded-full">NEW</span>
        </div>
        
        <ul className="space-y-3 mb-6">
          <li className="flex items-start">
            <CheckCircle className="text-[hsl(var(--nigerian-green))] mt-1 mr-2" size={18} />
            <span className="font-body text-[hsl(var(--dark-text))]">Personalize with your own name</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="text-[hsl(var(--nigerian-green))] mt-1 mr-2" size={18} />
            <span className="font-body text-[hsl(var(--dark-text))]">Choose specific ethnic groups (Yoruba, Igbo, Delta)</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="text-[hsl(var(--nigerian-green))] mt-1 mr-2" size={18} />
            <span className="font-body text-[hsl(var(--dark-text))]">Get name meanings and cultural context</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="text-[hsl(var(--nigerian-green))] mt-1 mr-2" size={18} />
            <span className="font-body text-[hsl(var(--dark-text))]">Ad-free experience</span>
          </li>
        </ul>
        
        <Button 
          onClick={handleUnlockPremium}
          className="w-full bg-[hsl(var(--nigerian-black))] hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center font-heading"
        >
          <UnlockIcon className="mr-2" size={18} /> Unlock Premium Features
        </Button>
        
        <p className="text-xs text-center mt-4 text-gray-600 font-body">
          One-time payment of $2.99 • No subscription
        </p>
      </CardContent>
    </Card>
  );
}
