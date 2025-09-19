export const formatRating = (rating: number | string | undefined): number => {
  if (rating === undefined || rating === null) return 0;
  const numRating = typeof rating === 'string' ? parseFloat(rating) : rating;
  return isNaN(numRating) ? 0 : numRating;
};

export const formatRatingCount = (count: number | string | undefined): number => {
  if (count === undefined || count === null) return 0;
  const numCount = typeof count === 'string' ? parseInt(count) : count;
  return isNaN(numCount) ? 0 : numCount;
};

export const getRatingText = (rating: number | string | undefined): string => {
  const formattedRating = formatRating(rating);
  return formattedRating > 0 ? formattedRating.toFixed(1) : '0.0';
};

export const getRatingCountText = (count: number | string | undefined): string => {
  const formattedCount = formatRatingCount(count);
  return formattedCount === 1 ? '1 review' : `${formattedCount} reviews`;
};
