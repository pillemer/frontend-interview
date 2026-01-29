import React, { useState, useEffect, useCallback } from "react";
import SingleApplication from "./SingleApplication";
import { Button } from "./ui/Button/Button";
import styles from "./Applications.module.css";

interface Application {
  id: number;
  guid?: string;
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  loan_amount: number;
  date_created: string;
  expiry_date: string;
}

const LIMIT = 5;

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/applications?_page=${page}&_limit=${LIMIT}`
      );
      const data = await response.json();
      const linkHeader = response.headers.get("Link");
      const hasNextPage = linkHeader ? linkHeader.includes('rel="next"') : false;
      setHasMore(hasNextPage);

      setApplications((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className={styles.Applications}>
      {applications.map((application) => (
        <SingleApplication
          key={application.id || application.guid}
          application={application}
        />
      ))}
      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <Button onClick={fetchApplications} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Applications;
