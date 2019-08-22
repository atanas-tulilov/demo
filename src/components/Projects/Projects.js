import React, { useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay";

import { Accordion } from "../Accordion";

import "./styles.scss";

const jsonUrl =
  "https://gist.githubusercontent.com/elena-gancheva/e2af742be620fefa0b0d81e36f7cd66c/raw/1407c899e0a1baca8cd9564f6d9668fd7e8909a6/data.json";

export const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(jsonUrl)
      .then(response => response.json())
      .then(data => {
        const projectDataResponse = data && data.projects;
        setProjectsData(projectDataResponse);
        setIsLoading(false);
      })
      .catch(error => {
        throw new Error(error);
      });
  }, []);

  return (
    <div className="container">
      <LoadingOverlay active={isLoading} spinner text="Loading your content...">
        <Accordion contents={projectsData} />
      </LoadingOverlay>
    </div>
  );
};
