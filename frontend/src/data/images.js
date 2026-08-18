/** Local dummy images — stored in /public/images (always load, no external URLs) */
const img = (name) => `/images/${name}`;

export const IMAGES = {
  hero: {
    main: img('hero-main.jpg'),
    floating: img('hero-float.jpg'),
    alt: 'Person on a personal growth journey',
  },

  features: {
    clarity: {
      src: img('feature-clarity.jpg'),
      alt: 'Self reflection and clarity',
    },
    goals: {
      src: img('feature-goals.jpg'),
      alt: 'Planning and goal setting',
    },
    journal: {
      src: img('feature-journal.jpg'),
      alt: 'Writing in a reflection journal',
    },
  },

  steps: [
    { src: img('step-1.jpg'), alt: 'Taking a personality assessment' },
    { src: img('step-2.jpg'), alt: 'Viewing personality profile results' },
    { src: img('step-3.jpg'), alt: 'Daily growth and mindfulness' },
  ],

  traits: [
    { src: img('trait-1.jpg'), alt: 'Creativity and openness' },
    { src: img('trait-2.jpg'), alt: 'Discipline and focus' },
    { src: img('trait-3.jpg'), alt: 'Social energy and extraversion' },
    { src: img('trait-4.jpg'), alt: 'Empathy and cooperation' },
    { src: img('trait-5.jpg'), alt: 'Emotional balance and calm' },
  ],

  testimonials: [
    { src: img('avatar-1.jpg'), alt: 'Priya Sharma' },
    { src: img('avatar-2.jpg'), alt: 'Rahul Mehta' },
    { src: img('avatar-3.jpg'), alt: 'Ananya Patel' },
  ],

  gallery: [
    { src: img('gallery-1.jpg'), alt: 'Team coaching session', caption: 'Guided growth' },
    { src: img('gallery-2.jpg'), alt: 'Planning your day', caption: 'Daily planning' },
    { src: img('gallery-3.jpg'), alt: 'Mindful reading', caption: 'Learn & reflect' },
    { src: img('gallery-4.jpg'), alt: 'Fitness and habits', caption: 'Build habits' },
    { src: img('gallery-5.jpg'), alt: 'Collaborative workspace', caption: 'Work smarter' },
    { src: img('gallery-6.jpg'), alt: 'Confident professional', caption: 'Build confidence' },
  ],

  auth: {
    src: img('auth.jpg'),
    alt: 'People growing together',
  },

  dashboard: {
    banner: img('dashboard.jpg'),
    alt: 'Personal development workspace',
  },

  pages: {
    goals: img('page-goals.jpg'),
    journal: img('page-journal.jpg'),
    assessment: img('page-assessment.jpg'),
  },

  cta: {
    src: img('cta.jpg'),
    alt: 'Start your growth journey',
  },
};
