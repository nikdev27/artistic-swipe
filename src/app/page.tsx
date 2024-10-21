'use client';

import React, { FC, useRef, useState } from 'react';
import { fetchImages } from '@/lib/serpAPI';
import SearchBar from '../components/SearchBar';
import ImageCardsContainer from '../components/ImageCardsContainer';
import { ImageResult } from '@/utils/types';
import { fetchChips } from '@/lib/openAiAPI';
import { MessageRoles } from '@/utils/enums';
import { promptMessage } from '@/utils/consts';

const Home: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<ImageResult[]>([]);
  const [likedImages, setLikedImages] = useState<ImageResult[]>([]);
  const [dislikedImages, setDislikedImages] = useState<ImageResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [additionalChips, setAdditionalChips] = useState<string[]>([]);

  const lastSearchQuery = useRef<string>('');

  const handleSearch = async (query: string) => {
    if (!!query && (lastSearchQuery.current != query || hasError)) {
      setIsLoading(true);
      try {
        lastSearchQuery.current = query;
        const fetchedImages = await fetchImages(`${query}, ${additionalChips?.join(',')}`);
        if (query === lastSearchQuery.current) {
          setImages(fetchedImages.slice(0, 50));
          setIsLoading(false);
          if (!hasSearched) {
            setHasSearched(true);
          }
        }
      } catch {
        setHasError(true);
        setIsLoading(false);
      }
    }
  };

  const updateImagesList = async () => {
    if (
      (currentIndex >= images.length - 10 || (currentIndex + 1) % 10 === 0) &&
      (likedImages.length || dislikedImages.length) &&
      hasSearched
    ) {
      try {
        const likedData = likedImages
          .slice(-10)
          .map((item) => ({ title: item.title, source: item.source, original: item.original }));
        const dislikedData = dislikedImages
          .slice(-10)
          .map((item) => ({ title: item.title, source: item.source, original: item.original }));
        const message = {
          id: '2',
          role: MessageRoles.USER,
          content: JSON.stringify({
            like: likedData,
            dislike: dislikedData,
          }),
        };
        const fetchedChips = (await fetchChips([promptMessage, message]))?.chips;
        if (fetchedChips?.length) {
          setAdditionalChips(fetchedChips.slice(0, 3));
        }
        const fetchedImages = await fetchImages(`${lastSearchQuery.current}, ${fetchedChips?.join(',')}`);
        if (currentIndex >= 0) {
          setImages(
            [...images.slice(currentIndex, 3), ...fetchedImages, ...images.slice(currentIndex + 3)].slice(0, 50)
          );
        }
      } catch {
        setHasError(true);
      }
    }
  };

  const handleLike = (image: ImageResult) => {
    setLikedImages((prev) => prev.concat(image));
    setCurrentIndex(currentIndex + 1);
    updateImagesList();
  };

  const handleDislike = (image: ImageResult) => {
    setDislikedImages((prev) => prev.concat(image));
    setCurrentIndex(currentIndex + 1);
    updateImagesList();
  };

  const handleRetry = () => {
    setHasError(false);
    handleSearch(lastSearchQuery.current);
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex">
      <div className="flex flex-col py-12 px-6">
        <h2 className="text-2xl text-center font-bold mb-6 flex items-center gap-1">
          <span className="text-4xl">🙁</span> Disliked Images{' '}
          {!!dislikedImages.length && <span className="text-lg">({dislikedImages.length})</span>}
        </h2>
        <div className="flex flex-col items-center overflow-y-auto h-0 flex-grow">
          {dislikedImages.toReversed().map((image, index) => (
            <div
              key={`dislike-${image.related_content_id}-${index}`}
              className="w-[9rem] h-[9rem] bg-gray-100 flex justify-center items-center mb-4 rounded-xl bg-cover shadow-lg flex-shrink-0"
              style={{ backgroundImage: 'url(' + image.original + ')' }}
            />
          ))}
        </div>
      </div>
      <div className="flex-grow p-4 flex flex-col justify-center items-center gap-4">
        <h1 className="text-6xl text-center font-bold mb-6 select-none">Artistic Tinder</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="h-[32rem] flex flex-col items-center justify-center">
          <ImageCardsContainer
            images={images}
            isLoading={isLoading}
            hasSearched={hasSearched}
            hasError={hasError}
            onLike={handleLike}
            onDislike={handleDislike}
            onRetry={handleRetry}
          />
        </div>
      </div>
      <div className="flex flex-col py-12 px-6">
        <h2 className="text-2xl text-center font-bold mb-6 flex items-center gap-1">
          <span className="text-4xl">😍</span> Liked Images{' '}
          {!!likedImages.length && <span className="text-lg">({likedImages.length})</span>}
        </h2>
        <div className="flex flex-col items-center overflow-y-auto h-0 flex-grow">
          {likedImages.toReversed().map((image, index) => (
            <div
              key={`like-${image.related_content_id}-${index}`}
              className="w-[9rem] h-[9rem] bg-gray-100 flex justify-center items-center mb-4 rounded-xl bg-cover shadow-lg flex-shrink-0"
              style={{ backgroundImage: 'url(' + image.original + ')' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
