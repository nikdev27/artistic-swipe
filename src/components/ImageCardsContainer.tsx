import React, { FC } from 'react';
import { Triangle } from 'react-loader-spinner';
import ImageCard from './ImageCard';
import { ImageResult } from '@/utils/types';

interface ImageCardsContainerProps {
  images: ImageResult[];
  isLoading: boolean;
  hasSearched: boolean;
  hasError: boolean;
  onLike: (image: ImageResult) => void;
  onDislike: (image: ImageResult) => void;
  onLeft?: (image: ImageResult) => void;
  onRetry: () => void;
}

const ImageCardsContainer: FC<ImageCardsContainerProps> = ({
  images,
  isLoading,
  hasSearched,
  hasError,
  onLike,
  onDislike,
  onLeft,
  onRetry,
}) => {
  if (isLoading) {
    return (
      <div className="w-[30rem] h-[30rem] flex flex-col items-center">
        <Triangle height="80" width="80" color="#fff" />
        <h2 className="mt-4">Loading...</h2>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="text-center mt-10 p-6 bg-red-100 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-2 text-red-600">Oops! Something went wrong.</h2>
        <button onClick={onRetry} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
          Retry
        </button>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="text-center mt-10 p-6 rounded-md shadow-lg">
        <h1 className="text-3xl font-semibold mb-12">Welcome to Artistic Tinder!</h1>
        <p className="text-gray-300 mb-4">
          Start exploring various images by entering a keyword or phrase in the search bar above.
        </p>
        <p className="text-gray-400 italic">
          Example: &#34;Marketing website for a vet&#34;, &#34;Logo for a shoe company&#34;, or &#34;Poster for an indie
          rock band&#34;.
        </p>
      </div>
    );
  }

  if (!images?.length) {
    return (
      <div className="text-center mt-10 p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-2">No results found</h2>
        <p className="text-gray-400">Try searching with different keywords.</p>
        <p className="mt-4 text-gray-400 italic">
          Example: &#34;Marketing website for a vet&#34; or &#34;Poster for an indie rock band&#34;
        </p>
      </div>
    );
  }

  return (
    <div className="w-[32rem] h-[32rem] flex flex-col items-center">
      {images?.map((image, index) => (
        <ImageCard
          key={`${image.related_content_id}-${index}`}
          image={image}
          onSwipeLeft={onDislike}
          onSwipeRight={onLike}
          onLeftScreen={onLeft}
        />
      ))}
    </div>
  );
};

export default ImageCardsContainer;
