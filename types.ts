
import React from 'react';

export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  stars: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceArea {
  state: string;
  cities: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  image: string;
}

export interface ChecklistRoom {
  id: string;
  nameKey: string;
  items: string[];
}

export type Language = 'en' | 'pt';
