import { FaqItem } from '@/types/faq';

export async function getFaqs(): Promise<FaqItem[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      'https://nvsert.ru';
    const res = await fetch(`${baseUrl}/api/faqs`, {      
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.error('Failed to fetch FAQs:', res.statusText);
      return [];
    }
    const data = await res.json();
    const faqs: FaqItem[] = data.data || [];
    return faqs;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}


