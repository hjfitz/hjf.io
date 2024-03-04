import { format } from 'date-fns/format';
import Link from 'next/link';

interface PostPreviewProps {
  title: string;
  path: string;
  description: string;
  date: Date;
}

export function PostPreview({
  title,
  path,
  description,
  date,
}: PostPreviewProps) {
  return (
    <div className="flex flex-col justify-center my-2">
      <Link className="" href={path}>
        <header>
          <h2 className="text-2xl font-semibold post-link font-header hover:text-blue-900">
            {title}
          </h2>
        </header>
        <small className="text-gray-500">
          Committed on {format(new Date(date), 'do MMM, yyyy')}
        </small>
        <p className="text-sm text-gray-800 font-print">{description}</p>
      </Link>
    </div>
  );
}
