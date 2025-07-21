import { useState } from 'react';
import axios from 'axios';
import IdeaForm from '@/components/IdeaGenerator/IdeaForm';

interface GeneratedIdea {
  content: string;
  visualConcept: string;
  imageUrl?: string; // Will be used when actual image generation is available
}

export default function RandomIdea() {
  const [ideas, setIdeas] = useState<GeneratedIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const parseIdeaContent = (content: string) => {
    const sections: Record<string, string> = {};
    const sectionRegex = /\[(.*?)\]:\s*([\s\S]*?)(?=\n\[|$)/g;
    let match;
    
    while ((match = sectionRegex.exec(content)) !== null) {
      sections[match[1]] = match[2].trim();
    }

    return sections;
  };

  const handleGenerate = async (formData: any) => {
    setLoading(true);
    setError('');
    setIdeas([]);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        throw new Error("API URL is not configured");
      }
      
      const response = await axios.post(
        `${apiUrl}/api/ideas/generate`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 60000
        }
      );
      
      setIdeas(response.data.ideas);
    } catch (err: any) {
      let errorMessage = 'Failed to generate ideas. ';
      
      if (err.response) {
        if (err.response.status === 404) {
          errorMessage += 'Endpoint not found. Please check:';
          errorMessage += '\n• Backend is running';
          errorMessage += '\n• Route is correct (/api/ideas/generate)';
        } else {
          errorMessage += `Server error: ${err.response.status} - ${err.response.data?.message || 'No additional info'}`;
        }
      } else if (err.request) {
        errorMessage += 'No response from server. Check:';
        errorMessage += '\n• Backend server is running';
        errorMessage += '\n• Network connectivity';
      } else if (err.code === 'ECONNABORTED') {
        errorMessage += 'Request timed out. Please try again.';
      } else {
        errorMessage += `Error: ${err.message}`;
      }
      
      setError(errorMessage);
      console.error('Error details:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Smart Idea Generator</h1>
        <p className="text-gray-600">
          Get complete project ideas with visual concepts
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <IdeaForm onSubmit={handleGenerate} />
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Generated Ideas</h2>
          
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-700 font-medium">Creating innovative ideas...</p>
              <p className="text-gray-500 text-sm mt-2">
                Generating complete project concepts with visual descriptions
              </p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 whitespace-pre-wrap">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {!loading && ideas.length > 0 && (
            <div className="space-y-8">
              {ideas.map((idea, index) => {
                const sections = parseIdeaContent(idea.content);
                const title = sections['Title'] || `Idea ${index + 1}`;
                
                return (
                  <div key={index} className="border rounded-lg overflow-hidden shadow-sm bg-gray-50">
                    {/* Placeholder for when actual images are available */}
                    {idea.imageUrl ? (
                      <div className="h-48 bg-gray-100 overflow-hidden">
                        <img 
                          src={idea.imageUrl} 
                          alt={`Visual representation of ${title}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6">
                        <div className="flex items-center gap-4">
                          <div className="bg-white p-3 rounded-lg shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">Visual Concept</h3>
                            <p className="text-sm text-gray-600">{idea.visualConcept}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
                      
                      <div className="space-y-4">
                        {sections['Pitch'] && (
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-1">Pitch</h4>
                            <p className="text-gray-600">{sections['Pitch']}</p>
                          </div>
                        )}
                        
                        {sections['Key Features'] && (
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-1">Key Features</h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                              {sections['Key Features'].split('\n').filter(f => f.trim()).map((feature, i) => (
                                <li key={i}>{feature.replace(/^- /, '').trim()}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {sections['Market Need'] && (
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-1">Market Need</h4>
                            <p className="text-gray-600">{sections['Market Need']}</p>
                          </div>
                        )}
                        
                        {sections['Technology'] && (
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-1">Technology</h4>
                            <p className="text-gray-600">{sections['Technology']}</p>
                          </div>
                        )}
                        
                        {sections['Business Model'] && (
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-1">Business Model</h4>
                            <p className="text-gray-600">{sections['Business Model']}</p>
                          </div>
                        )}
                        
                        {sections['Bonus Tips'] && (
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-700 mb-1">Bonus Tips</h4>
                            <p className="text-blue-600">{sections['Bonus Tips']}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {!loading && ideas.length === 0 && !error && (
            <div className="text-center py-12 text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p className="mt-4">Fill the form and click "Generate Ideas" to get started</p>
              <p className="text-sm mt-2">Each idea will include detailed descriptions and visual concepts</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}