export function extractKeywords(messages: string[]): string[] {
  const combined = messages.join(' ').toLowerCase();

 const topics = [
  // Science & Technology
  'cybersecurity', 'data science', 'machine learning', 'biology',
  'chemistry', 'physics', 'mathematics', 'statistics',
  'anatomy', 'physiology', 'biochemistry', 'genetics',
  'astrophysics', 'quantum mechanics', 'neuroscience',
  'environmental science', 'agriculture', 'zoology', 'botany',
  'geology', 'microbiology', 'biotechnology', 'computer science',
  'software engineering', 'ai', 'cloud computing', 'networking',
  'algorithms', 'web development', 'mobile development', 'robotics',
  'ethical hacking', 'informatics', 'blockchain', 'natural language processing',

  // Arts & Humanities
  'english', 'literature', 'history', 'philosophy', 'religion',
  'music', 'fine arts', 'creative writing', 'linguistics',
  'sociology', 'psychology', 'anthropology', 'archaeology',
  'political science', 'ethics', 'media studies', 'journalism',
  'film studies', 'cultural studies', 'performing arts', 'french',
  'spanish', 'german', 'portuguese', 'chinese', 'theatre arts',

  // Commercial/Business/Economics
  'economics', 'accounting', 'finance', 'marketing',
  'business administration', 'management', 'commerce', 'entrepreneurship',
  'e-commerce', 'supply chain', 'human resources', 'taxation',
  'investment', 'banking', 'public administration', 'insurance',
  'sales', 'real estate', 'auditing', 'project management',
  'business ethics', 'international trade', 'microeconomics', 'macroeconomics',

  // Health & Medical
  'internal medicine', 'surgery', 'nursing', 'public health',
  'pharmacy', 'dietetics', 'radiology', 'dermatology',
  'paediatrics', 'pathology', 'epidemiology', 'physiotherapy',
  'laboratory science', 'dental science', 'mental health',

  // Education & Others
  'education', 'curriculum development', 'guidance and counseling',
  'civic education', 'geography', 'home economics',
  'agricultural science', 'technical drawing', 'social studies'
];

  return topics.filter(topic => combined.includes(topic));
}
