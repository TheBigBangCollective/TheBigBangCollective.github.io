import { z, defineCollection } from 'astro:content';

const festivalCollection = defineCollection({ 
    type: 'content',
    schema: z.object({
      title: z.string(),
      startDate: z.date(),
      endDate: z.date(),
      svg: z.any(),
    }),
 });

export const collections = {
  'festivals': festivalCollection,
};