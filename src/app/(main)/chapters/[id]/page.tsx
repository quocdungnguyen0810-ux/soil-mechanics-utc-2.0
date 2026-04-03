'use client';

import { useParams } from 'next/navigation';
import { TheoryModule } from '@/features/chapters/TheoryModule';

export default function ChapterPage() {
  const params = useParams();
  const chapterId = params.id as string;

  return <TheoryModule chapterId={chapterId} />;
}
