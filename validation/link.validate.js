const { z } = require('zod');

const linkSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('URL must be valid'),
  category: z.enum([
    'General',
    'Technology',
    'Health',
    'Education',
    'Entertainment',
    'Sports',
    'Science',
    'Business',
    'Lifestyle',
    'Others',
  ]).optional(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

module.exports = { linkSchema };
