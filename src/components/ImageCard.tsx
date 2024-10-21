import { FC } from 'react';
import TinderCard from 'react-tinder-card';
import { Direction, ImageResult } from '@/utils/types';
import { Directions } from '@/utils/enums';

interface ImageCardProps {
  image: ImageResult;
  onSwipeLeft: (image: ImageResult) => void;
  onSwipeRight: (image: ImageResult) => void;
  onLeftScreen?: (image: ImageResult) => void;
}

const ImageCard: FC<ImageCardProps> = ({ image, onSwipeLeft, onSwipeRight, onLeftScreen }) => {
  const onSwipe = (direction: Direction) => {
    if (direction === Directions.LEFT) {
      onSwipeLeft(image);
    } else if (direction === Directions.RIGHT) {
      onSwipeRight(image);
    }
  };

  const onCardLeftScreen = () => {
    if (onLeftScreen) {
      onLeftScreen(image);
    }
  };

  return (
    <TinderCard
      onSwipe={onSwipe}
      onCardLeftScreen={onCardLeftScreen}
      preventSwipe={['up', 'down']}
      swipeRequirementType="position"
      swipeThreshold={200}
      className="absolute"
    >
      <div
        className="w-[32rem] h-[32rem] bg-gray-100 border-2 border-gray-200 flex justify-center items-center mb-4 rounded-xl bg-cover shadow-lg"
        style={{ backgroundImage: 'url(' + image.original + ')' }}
      />
    </TinderCard>
  );
};

export default ImageCard;
