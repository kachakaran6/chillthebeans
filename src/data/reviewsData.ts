export type Review = {
  id: string;
  name: string;
  isLocalGuide: boolean;
  rating: 5 | 4 | 3 | 2 | 1;
  timeAgo: string;
  takeaway: string;
  tags: string[];
};

export const reviewsData: Review[] = [
  {
    id: 'r1',
    name: 'Katelyn',
    isLocalGuide: true,
    rating: 5,
    timeAgo: '3 months ago',
    takeaway: 'The hot chocolate is incredibly rich and definitely a standout. We also tried the caramel SOS cookies, which are absolutely worth the trip.',
    tags: ['hot chocolate', 'fresh cookies', 'protein balls']
  },
  {
    id: 'r2',
    name: 'D L',
    isLocalGuide: true,
    rating: 4,
    timeAgo: '3 months ago',
    takeaway: 'Tiny spot with very friendly staff. The queues move surprisingly fast! Would love to see reusable cups and a few lunch options.',
    tags: ['outdoor seating']
  },
  {
    id: 'r3',
    name: 'Mantzy Vlogs',
    isLocalGuide: true,
    rating: 5,
    timeAgo: '10 months ago',
    takeaway: 'My favorite local coffee spot. The service is incredibly quick now, even when the line used to stretch out the door. Only wish they had bigger sizes!',
    tags: []
  }
];
