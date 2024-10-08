import { z } from 'zod';

const heroImage = z.object({
  type: z.literal('hero'),
  imageURI: z.string().url(),
});

const imageText = z.object({
  type: z.literal('image-text'),
  imageURI: z.string().url(),
  text: z.string(),
  title: z.string().optional(),
  leftToRight: z.boolean().optional(),
});

const data = z.object({
  type: z.literal('data'),
  url: z.string().url(),
})

export const landingPageSchema = z.array(z.union([heroImage, imageText, data]));

export type LandingPageSchema = z.infer<typeof landingPageSchema>;

export type HeroSchema = z.infer<typeof heroImage>;

export type ImageTextSchema = z.infer<typeof imageText>;

export type DataShema = z.infer<typeof data>;
