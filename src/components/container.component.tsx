interface PostContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: PostContainerProps) {
  return (
    <div className="min-h-full text-black bg-white">
      <main className="container p-2 mx-auto md:py-8 md:px-16 px-8">
        {children}
      </main>
    </div>
  );
}
