import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

const customComponents: MDXComponents = {
  // be awkward and hoist headings down a level for ease of writing
  h1: (props: any) => (
    <h2 {...props} className="pt-4 text-3xl font-semibold font-header" />
  ),
  h2: (props: any) => (
    <h3 {...props} className="pt-3 text-2xl font-semibold font-header" />
  ),
  h3: (props: any) => (
    <h4 {...props} className="pt-2 text-xl font-semibold font-header" />
  ),
  h4: (props: any) => <h4 {...props} className="pt-2 text-lg font-header" />,
  p: (props: any) => <p {...props} className="py-3 text-sm font-print" />,
  a: (props: any) => <Link {...props} className="text-blue-400" />,
  li: (props: any) => (
    <li {...props} className="text-sm list-disc list-inside font-print" />
  ),
  code: (props: any) => (
    <code {...props} className={`${props.className} text-xs inline-block`} />
  ),
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...customComponents,
  };
}
