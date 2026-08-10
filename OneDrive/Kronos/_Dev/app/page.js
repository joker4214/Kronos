"use client";

import { useEffect, useState } from "react";
import ProjectDashboard from "./components/ProjectDashboard";
import "./styles/dashboard.css";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/projects");
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
        setProjects(getMockProjects());
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="home-container">
      <ProjectDashboard projects={projects} loading={loading} error={error} />
    </div>
  );
}

function getMockProjects() {
  return [
    {
      id: 1,
      name: "Project Dashboard",
      description: "Interactive project status tracking dashboard",
      status: "in_progress",
      progress: 75,
      start_date: "2024-06-01",
      expected_completion: "2024-08-15",
      priority: "high",
      team_members: 3,
      project_url: "https://github.com/joker4214/Kronos",
      tasks: [
        { name: "Design UI", completed: true },
        { name: "Backend API", completed: true },
        { name: "Integration", completed: false },
        { name: "Testing", completed: false },
      ],
    },
    {
      id: 2,
      name: "Content Generation System",
      description: "AI-powered content creation engine",
      status: "in_progress",
      progress: 60,
      start_date: "2024-05-15",
      expected_completion: "2024-09-01",
      priority: "high",
      team_members: 4,
      project_url: "https://github.com/joker4214/content-gen",
      tasks: [
        { name: "Model Training", completed: true },
        { name: "API Development", completed: true },
        { name: "Optimization", completed: false },
        { name: "Documentation", completed: false },
      ],
    },
    {
      id: 3,
      name: "Database Migration",
      description: "Migrating legacy data to Supabase",
      status: "in_progress",
      progress: 40,
      start_date: "2024-06-15",
      expected_completion: "2024-07-30",
      priority: "medium",
      team_members: 2,
      project_url: "https://supabase.com/dashboard",
      tasks: [
        { name: "Schema Design", completed: true },
        { name: "Data Export", completed: false },
        { name: "Validation", completed: false },
        { name: "Rollback Plan", completed: false },
      ],
    },
    {
      id: 4,
      name: "Mobile App",
      description: "Cross-platform mobile application",
      status: "planning",
      progress: 15,
      start_date: "2024-07-01",
      expected_completion: "2024-12-31",
      priority: "medium",
      team_members: 2,
      project_url: "https://github.com/joker4214/mobile-app",
      tasks: [
        { name: "Requirements", completed: true },
        { name: "Wireframes", completed: false },
        { name: "Development", completed: false },
        { name: "Testing", completed: false },
      ],
    },
    {
      id: 5,
      name: "Analytics Platform",
      description: "Real-time analytics and reporting system",
      status: "completed",
      progress: 100,
      start_date: "2024-03-01",
      expected_completion: "2024-06-30",
      priority: "high",
      team_members: 5,
      project_url: "https://analytics.example.com",
      tasks: [
        { name: "Data Collection", completed: true },
        { name: "Processing Engine", completed: true },
        { name: "UI Dashboards", completed: true },
        { name: "Deployment", completed: true },
      ],
    },
  ];
}