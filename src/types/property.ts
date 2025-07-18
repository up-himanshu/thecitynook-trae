export interface PropertyImage {
  src: string;
  alt: string;
}

export interface PropertyDescription {
  title: string;
  description: string;
}

export interface PropertyFeature {
  label: string;
  iconName: string; // Changed from component function to string identifier
  showOnListing: boolean;
}

export interface Property {
  id: number;
  slug: string;
  title: string;
  maxGuests: number;
  descriptions: PropertyDescription[];
  images: PropertyImage[];
  location: string;
  latLong: string;
  mapEmbedUrl: string;
  features: PropertyFeature[];
}
