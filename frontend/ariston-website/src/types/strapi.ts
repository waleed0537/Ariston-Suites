export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail?: ImageFormat;
      small?: ImageFormat;
      medium?: ImageFormat;
      large?: ImageFormat;
    };
    url: string;
  };
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Room {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    price: number;
    capacity: number;
    size: number;
    features: string[];
    category: 'Standard' | 'Deluxe' | 'King Deluxe' | 'Twin Deluxe';
    images: {
      data: StrapiImage[];
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Testimonial {
  id: number;
  attributes: {
    name: string;
    rating: number;
    content: string;
    date: string;
    featured: boolean;
    image?: {
      data: StrapiImage;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface BlogPost {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    category: {
      data: {
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    tags: string[];
    featuredImage: {
      data: StrapiImage;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Amenity {
  id: number;
  attributes: {
    title: string;
    description: string;
    icon: string;
    category: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}