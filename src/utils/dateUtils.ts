export const getTimeAgo = (date: string): string => {
  const now = new Date();
  const postedDate = new Date(date);
  const diffInHours = Math.floor((now.getTime() - postedDate.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    return 'new';
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
}; 