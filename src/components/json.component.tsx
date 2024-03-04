export function JSONOutput({ obj }: { obj: Record<string, any> }) {
  return <pre>{JSON.stringify(obj, null, 2)}</pre>;
}
