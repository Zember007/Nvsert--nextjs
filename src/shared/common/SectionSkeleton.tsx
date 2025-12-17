// Легковесные скелетоны для секций
export const FeedbackSkeleton = () => (
  <section className="section wrapper">
    <div className="h-8 bg-gray-200 rounded w-1/3 mb-8 animate-pulse" />
    <div className="h-[400px] bg-gray-100 rounded animate-pulse" />
  </section>
);

export const SliderSkeleton = () => (
  <section className="section wrapper">
    <div className="h-8 bg-gray-200 rounded w-1/3 mb-8 animate-pulse" />
    <div className="h-[500px] bg-gray-100 rounded animate-pulse" />
  </section>
);

export const DocumentsSkeleton = () => (
  <section className="section wrapper">
    <div className="h-8 bg-gray-200 rounded w-1/3 mb-8 animate-pulse" />
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-32 bg-gray-100 rounded animate-pulse" />
      ))}
    </div>
  </section>
);

export const SafeguardsSkeleton = () => (
  <section className="section wrapper">
    <div className="h-8 bg-gray-200 rounded w-1/3 mb-8 animate-pulse" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-48 bg-gray-100 rounded animate-pulse" />
      ))}
    </div>
  </section>
);

