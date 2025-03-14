import { useRef, useCallback } from "react";
import { useJobs } from "../context/JobContext";
import JobCard from "./JobCard";
import ShimmerUI from "./ShimmerUI";

export default function JobList() {
  const { jobs, loading, error, hasMore, loadMore, total } = useJobs();

  const observer = useRef<IntersectionObserver | null>(null);

  const lastJobElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div>
      <div className="mb-4 text-gray-600">
        {total > 0 && `Found ${total} job${total !== 1 ? "s" : ""}`}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs?.map((job, index) => {
          if (jobs.length === index + 1) {
            return (
              <div key={job.id} ref={lastJobElementRef}>
                <JobCard job={job} />
              </div>
            );
          } else {
            return <JobCard key={job.id} job={job} />;
          }
        })}
        {loading && [...Array(3)].map((_, index) => <ShimmerUI key={index} />)}
      </div>

      {!loading && !jobs?.length && (
        <div className="text-center py-8">
          <p className="text-gray-500">No jobs found</p>
        </div>
      )}
      {!hasMore && (
        <div className="text-center mt-4 text-gray-600">
          No more jobs to load
        </div>
      )}
    </div>
  );
}
