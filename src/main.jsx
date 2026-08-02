import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { ServicePage } from "./ServicePage.jsx";
import { StoriesPage } from "./StoriesPage.jsx";
import { StoryPage } from "./StoryPage.jsx";
import { getService } from "./serviceData.js";
import { getStory } from "./storyData.js";
import "./design-tokens.css";
import "./styles.css";

const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
const service = getService(path);
const story = path.startsWith("stories/") ? getStory(path.replace("stories/", "")) : null;
const page = path === "stories"
  ? <StoriesPage />
  : story
    ? <StoryPage story={story} />
    : service
      ? <ServicePage service={service} />
      : <App />;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {page}
  </React.StrictMode>,
);
