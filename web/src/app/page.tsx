import { fallbackLocale } from '@/i18n/config';
import { redirect } from 'next/navigation';

export default function Root() {
  redirect(`/${fallbackLocale}`);
}
