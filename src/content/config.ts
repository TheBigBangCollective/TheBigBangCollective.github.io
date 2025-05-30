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

/* -------- years collection with gallery support -------- */
const galleryItem = z.object({
  src:   z.string(),          // e.g. photos/ostrava-dj.jpg
  title: z.string(),          // shown on hover
  desc:  z.string().optional()// future use / captions
});

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
        image:       z.string().optional(),   // LEGACY 1-image field (kept)
        gallery:     z.array(galleryItem).optional(),
        video:       z.string().url().optional(),
        bg:          z.string().optional(),
        text:        z.string().optional(),
        description: z.string()
      })
    )
  })
});

export const collections = {
  festivals: festivalCollection,
  years:     yearsCollection
};
