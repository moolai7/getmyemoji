
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { EmojiSection } from './components/EmojiSection.tsx';
import { LoadingSpinner } from './components/LoadingSpinner.tsx';
import { AdPlaceholder } from './components/AdPlaceholder.tsx'; // Import AdPlaceholder
import type { OpenMoji } from './types.ts';
import { EMOJI_CATEGORIES_ORDER, OPENMOJI_JSON_URL, OPENMOJI_AR_JSON_URL } from './constants.ts';
import { fetchEmojis } from './services/emojiService.ts';

const App: React.FC = () => {
  const [allEmojis, setAllEmojis] = useState<OpenMoji[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedEmojiChar, setCopiedEmojiChar] = useState<string | null>(null);

  useEffect(() => {
    const loadEmojis = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const emojis = await fetchEmojis(OPENMOJI_JSON_URL, OPENMOJI_AR_JSON_URL);
        setAllEmojis(emojis);
      } catch (err) {
        console.error("Detailed error in App.tsx while loading emojis:", err);
        const displayError = err instanceof Error ? err.message : String(err);
        setError(`Failed to load core emoji data. There might be a network issue. Please check your internet connection and try again later. (Error details: ${displayError})`);
      } finally {
        setIsLoading(false);
      }
    };
    loadEmojis();
  }, []);

  const handleSearchChange = useCallback((newSearchTerm: string) => {
    setSearchTerm(newSearchTerm.toLowerCase());
  }, []);

  const handleEmojiCopy = useCallback((emojiChar: string, emojiAnnotation: string) => {
    navigator.clipboard.writeText(emojiChar)
      .then(() => {
        setCopiedEmojiChar(emojiChar); 
        setTimeout(() => setCopiedEmojiChar(null), 2000); 
      })
      .catch(err => {
        console.error('Failed to copy emoji: ', err);
        alert(`Failed to copy emoji: ${emojiAnnotation}`);
      });
  }, []);

  const getFilteredEmojisForCategory = (categoryGroup: string): OpenMoji[] => {
    const categoryEmojis = allEmojis.filter(emoji => emoji.group === categoryGroup);
    if (!searchTerm.trim()) {
      return categoryEmojis;
    }
    const lowerSearchTerm = searchTerm.trim().toLowerCase();
    return categoryEmojis.filter(emoji => 
      emoji.annotation.toLowerCase().includes(lowerSearchTerm) ||
      (emoji.tags && Array.isArray(emoji.tags) && emoji.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))) || 
      emoji.emoji.includes(lowerSearchTerm) // Search by the emoji character itself
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange} 
        categories={EMOJI_CATEGORIES_ORDER}
      />

      {/* Ezoic Ad Placeholder Below Header */}
      <AdPlaceholder adId="ezoic-ad-1" />

      {copiedEmojiChar && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-600 text-white py-2.5 px-5 rounded-lg shadow-xl z-50 transition-all duration-300 ease-out text-lg animate-pulse">
          Copied: <span className="font-bold text-2xl mx-1">{copiedEmojiChar}</span> successfully!
        </div>
      )}

      <main className="flex-grow container mx-auto px-4 py-8">
        {isLoading && <LoadingSpinner />}
        {error && <p className="text-center text-red-600 bg-red-100 border border-red-400 p-4 rounded-md text-xl whitespace-pre-line">{error}</p>}
        
        {!isLoading && !error && allEmojis.length > 0 && (
          <div className="space-y-12">
            {EMOJI_CATEGORIES_ORDER.map(category => {
              const filteredEmojis = getFilteredEmojisForCategory(category.openMojiGroup);
              if (searchTerm.trim() && filteredEmojis.length === 0) {
                return null; 
              }
              return (
                <EmojiSection
                  key={category.key} 
                  category={category}
                  emojis={filteredEmojis}
                  onEmojiCopy={handleEmojiCopy}
                />
              );
            })}
            {searchTerm.trim() && EMOJI_CATEGORIES_ORDER.every(category => getFilteredEmojisForCategory(category.openMojiGroup).length === 0) && (
                 <p className="text-center text-gray-600 text-2xl py-12">
                    No emojis match your search: <span className="font-semibold text-sky-700">"{searchTerm}"</span>. Try different keywords.
                 </p>
            )}
          </div>
        )}
         {!isLoading && !error && allEmojis.length === 0 && !searchTerm.trim() && (
            <p className="text-center text-gray-500 text-xl py-10">
                No emojis found. There might be an issue loading data.
            </p>
        )}
      </main>
      
      {/* Ezoic Ad Placeholder Above Footer */}
      <AdPlaceholder adId="ezoic-ad-2" />
      
      <Footer />
    </div>
  );
};

export default App;