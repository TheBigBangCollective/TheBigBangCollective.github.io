import { z, defineCollection } from 'astro:content';

/* A photo, or a folder of photos, relative to the year file */
const galleryItem = z.object({
  src:   z.string(),
  title: z.string().optional(),
  desc:  z.string().optional()
});

/* One file per year in src/content/years */
const yearsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title:  z.string(),
    intro:  z.string(),
    festivals: z.array(
      z.object({
        name:        z.string(),
        /* Dates are optional so an upcoming year can list confirmed
           festivals before their dates are announced. */
        start:       z.date().optional(),
        end:         z.date().optional(),
        /* Shown in place of the dates while they are still unconfirmed */
        dates_note:  z.string().optional(),
        logo:        z.string().optional(),
        sponsor:     z.string().optional(),
        images:      z.array(galleryItem).optional(),
        video:       z.string().url().optional(),
        video_ratio: z.string().regex(/^\d+\/\d+$/).optional(),
        link: z
          .object({url:  z.string(),text: z.string()}).optional(),
        bg:          z.string().optional(),
        text:        z.string().optional(),
        description: z.string().optional(),
        country:     z.string().optional(),
      })
    )
  })
});

export const collections = {
  years:     yearsCollection
};
