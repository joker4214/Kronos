"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectDashboard({ projects, loading, error }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("priority");
  const [expandedCards, setExpandedCards] = useState({});

  const filteredProjects = projects.filter(
    (p) => statusFilter === "all" || p.status === statusFilter
  );

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "priority":
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case "progress":
        return b.progress - a.progress;
      case "completion":
        return new Date(a.expected_completion) - new Date(b.expected_completion);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "in_progress").length,
    completed: projects.filter((p) => p.status === "completed").length,
    avgProgress: projects.length > 0 ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length) : 0,
  };

  const toggleExpand = (projectId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Project Dashboard</h1>
        <p className="subtitle">Manage and track all your projects</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-1">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Projects</div>
          </div>
        </div>
        <div className="stat-card stat-2">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <div className="stat-value">{stats.active}</div>
            <div className="stat-label">Active Projects</div>
          </div>
        </div>
        <div className="stat-card stat-3">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>
        <div className="stat-card stat-4">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-value">{stats.avgProgress}%</div>
            <div className="stat-label">Avg Progress</div>
          </div>
        </div>
      </div>

      <div className="controls-section">
        <div className="control-group">
          <label htmlFor="status-filter">Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Projects</option>
            <option value="planning">Planning</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="sort-by">Sort By:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="priority">Priority</option>
            <option value="progress">Progress</option>
            <option value="completion">Completion Date</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <div className="projects-grid">
        {sortedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isExpanded={expandedCards[project.id] || false}
            onToggleExpand={() => toggleExpand(project.id)}
          />
        ))}
      </div>

      {sortedProjects.length === 0 && (
        <div className="empty-state">
          <p>No projects found</p>
        </div>
      )}
    </div>
  );
}