import { z, defineCollection } from 'astro:content';

const festivalCollection = defineCollection({ 
    type: 'content',
    schema: z.object({
      title: z.string(),
      startDate: z.date(),
      endDate: z.date(),
      link: z.string().url().optional(),
      country: z.string(),
      svg: z.any(),
      summary: z.string().optional(),
    }),
 });

export const collections = {
  'festivals': festivalCollection,
};