import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Shuffle, Share2, Info, Users, BookOpen, UserRound, User2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { generateLocalName } from '@/lib/nameData';
import { Card, CardContent } from '@/components/ui/card';
import { GeneratedName } from '@shared/schema';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function MainGenerator() {
  const [generatedName, setGeneratedName] = useState<GeneratedName | null>(null);
  const [selectedGender, setSelectedGender] = useState<string>('any');
  const { toast } = useToast();

  const { mutate: generateName, isPending } = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/generate-name', {
        gender: selectedGender
      });
      return response.json();
    },
    onSuccess: (data: GeneratedName) => {
      setGeneratedName(data);
    },
    onError: (error) => {
      console.error('Error generating name:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate name. Using local generator instead.',
        variant: 'destructive',
      });
      
      // Fallback to local generation
      const localName = generateLocalName({ gender: selectedGender !== 'any' ? selectedGender : undefined });
      setGeneratedName(localName);
    },
  });

  const handleShare = () => {
    if (!generatedName) return;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Nigerian Name',
        text: `My Nigerian name is ${generatedName.fullName}! Generate yours!`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support share API
      navigator.clipboard.writeText(`My Nigerian name is ${generatedName.fullName}! Generate yours at ${window.location.href}`)
        .then(() => {
          toast({
            title: 'Copied to clipboard',
            description: 'Share this with your friends!',
          });
        })
        .catch(err => {
          toast({
            title: 'Failed to copy',
            description: 'Please copy the name manually',
            variant: 'destructive',
          });
        });
    }
  };

  // Function to capitalize first letter of each word
  const capitalizeEachWord = (str: string) => {
    if (!str) return '';
    return str.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg p-6 md:p-8 w-full max-w-md mb-8">
      <CardContent className="p-0">
        <p className="text-[hsl(var(--dark-text))] text-center mb-6 font-body">
          Choose a gender and click the button to generate your Nigerian name with authentic titles and combinations!
        </p>
        
        {/* Gender Selection */}
        <div className="mb-6">
          <Label htmlFor="gender-select" className="block mb-2 text-sm font-medium text-gray-700">
            Select Gender
          </Label>
          <div className="flex space-x-2">
            <Button
              type="button"
              variant={selectedGender === 'male' ? 'default' : 'outline'}
              className={`flex-1 ${selectedGender === 'male' ? 'bg-[hsl(var(--nigerian-green))]' : 'text-[hsl(var(--nigerian-green))] border-[hsl(var(--nigerian-green))]'}`}
              onClick={() => setSelectedGender('male')}
            >
              <UserRound className="mr-2 h-4 w-4" /> Male
            </Button>
            <Button
              type="button"
              variant={selectedGender === 'female' ? 'default' : 'outline'}
              className={`flex-1 ${selectedGender === 'female' ? 'bg-[hsl(var(--nigerian-green))]' : 'text-[hsl(var(--nigerian-green))] border-[hsl(var(--nigerian-green))]'}`}
              onClick={() => setSelectedGender('female')}
            >
              <User2 className="mr-2 h-4 w-4" /> Female
            </Button>
            <Button
              type="button"
              variant={selectedGender === 'any' ? 'default' : 'outline'}
              className={`flex-1 ${selectedGender === 'any' ? 'bg-[hsl(var(--nigerian-green))]' : 'text-[hsl(var(--nigerian-green))] border-[hsl(var(--nigerian-green))]'}`}
              onClick={() => setSelectedGender('any')}
            >
              <Users className="mr-2 h-4 w-4" /> Any
            </Button>
          </div>
        </div>
        
        {/* Generator Button */}
        <Button 
          onClick={() => generateName()}
          disabled={isPending}
          className="w-full bg-[hsl(var(--nigerian-green))] hover:bg-green-700 text-white font-bold py-6 px-6 rounded-lg transition duration-300 transform hover:scale-105 flex items-center justify-center font-heading h-auto"
        >
          <Shuffle className="mr-2" /> 
          {isPending ? 'Generating...' : 'Generate My Nigerian Name'}
        </Button>
        
        {/* Result Display Area */}
        {generatedName && (
          <div className="mt-8 text-center">
            <div className="flex justify-center">
              <Separator className="w-1/2 bg-[hsl(var(--nigerian-gold))] h-1 rounded mb-6" />
            </div>
            <p className="text-sm text-gray-600 mb-2 font-body">Your Nigerian name is:</p>
            <div className="bg-[hsl(var(--cream))] p-4 rounded-lg border-2 border-[hsl(var(--nigerian-gold))]">
              <p className="text-2xl md:text-3xl font-display font-bold text-[hsl(var(--dark-text))]">
                {generatedName.fullName}
              </p>
              
              {/* Name Information Section */}
              <div className="mt-4 text-left">
                {generatedName.ethnicity && (
                  <div className="flex items-center text-sm mb-2">
                    <Users className="text-[hsl(var(--nigerian-green))] mr-2" size={16} />
                    <span className="font-body text-gray-700">Tribe: </span>
                    <Badge variant="outline" className="ml-2 bg-[hsl(var(--nigerian-green))] bg-opacity-10 text-[hsl(var(--nigerian-green))]">
                      {capitalizeEachWord(generatedName.ethnicity)}
                    </Badge>
                  </div>
                )}
                
                {generatedName.meaning && (
                  <div className="flex items-start text-sm mb-2">
                    <BookOpen className="text-[hsl(var(--nigerian-green))] mr-2 mt-1" size={16} />
                    <div>
                      <span className="font-body text-gray-700">Meaning: </span>
                      <span className="font-body text-gray-600">{generatedName.meaning}</span>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start text-sm">
                  <Info className="text-[hsl(var(--nigerian-green))] mr-2 mt-1" size={16} />
                  <div>
                    <span className="font-body text-gray-700">About: </span>
                    <span className="font-body text-gray-600">
                      {generatedName.meaning 
                        ? `The name "${generatedName.firstName}" means "${generatedName.meaning}". Combined with the family name "${generatedName.lastName}", it creates a distinctive ${generatedName.ethnicity || 'Nigerian'} identity.` 
                        : `"${generatedName.firstName} ${generatedName.lastName}" is a traditional ${generatedName.ethnicity || 'Nigerian'} name combination that represents heritage and family lineage.`
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center space-x-2">
              <Button 
                onClick={handleShare}
                variant="secondary" 
                className="bg-[hsl(var(--nigerian-black))] hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 inline-flex items-center font-body"
              >
                <Share2 className="mr-2" size={16} /> Share Name
              </Button>
              
              <Button 
                onClick={() => generateName()}
                variant="outline" 
                className="border-[hsl(var(--nigerian-green))] text-[hsl(var(--nigerian-green))] hover:bg-[hsl(var(--nigerian-green))] hover:bg-opacity-10 font-bold py-2 px-4 rounded-lg transition duration-300 inline-flex items-center font-body"
              >
                <Shuffle className="mr-2" size={16} /> Try Again
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}