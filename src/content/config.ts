import { z, defineCollection } from 'astro:content';

/* -------- existing festivals collection (unchanged) -------- */
const festivalCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title:     z.string(),
    startDate: z.date(),
    endDate:   z.date(),
    link:      z.string().url().optional(),
    country:   z.string(),
    svg:       z.any(),
    summary:   z.string().optional()
  })
});

/* -------- reusable gallery item -------- */
const galleryItem = z.object({
  src:   z.string(),            // e.g. photos/ostrava-dj.jpg
  title: z.string(),            // shown on hover
  desc:  z.string().optional()  // future use / captions
});

/* -------- years collection (now with link support) -------- */
const yearsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title:  z.string(),
    intro:  z.string(),
    festivals: z.array(
      z.object({
        name:        z.string(),
        start:       z.date(),
        end:         z.date(),
        logo:        z.string().optional(),
        sponsor:        z.string().optional(),
        images:      z.array(galleryItem).optional(),
        video:       z.string().url().optional(),
        video_ratio: z.string().regex(/^\d+\/\d+$/).optional(),
        link: z
          .object({url:  z.string(),text: z.string()}).optional(),
        bg:          z.string().optional(),
        text:        z.string().optional(),
        description: z.string(),
        country:     z.string().optional(),
      })
    )
  })
});

export const collections = {
  festivals: festivalCollection,
  years:     yearsCollection
};
