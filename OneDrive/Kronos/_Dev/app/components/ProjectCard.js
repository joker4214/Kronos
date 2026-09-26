"use client";

import { useState } from "react";
import "../styles/dashboard.css";

const STATUS_COLORS = {
  planning: "#6366f1",
  in_progress: "#f59e0b",
  completed: "#10b981",
};

const STATUS_LABELS = {
  planning: "Planning",
  in_progress: "In Progress",
  completed: "Completed",
};

export default function ProjectCard({ project, isExpanded, onToggleExpand }) {
  const getDaysUntilCompletion = () => {
    const today = new Date();
    const completionDate = new Date(project.expected_completion);
    const daysLeft = Math.ceil((completionDate - today) / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  const getCompletionStatus = () => {
    const daysLeft = getDaysUntilCompletion();
    if (daysLeft < 0) return { text: "Overdue", color: "#ef4444" };
    if (daysLeft === 0) return { text: "Due today", color: "#f59e0b" };
    if (daysLeft <= 7) return { text: `${daysLeft} days left`, color: "#f59e0b" };
    return { text: `${daysLeft} days left`, color: "#10b981" };
  };

  const completedTasks = project.tasks?.filter((t) => t.completed).length || 0;
  const totalTasks = project.tasks?.length || 0;

  const completionStatus = getCompletionStatus();

  return (
    <div
      className={`project-card ${project.status} ${isExpanded ? "expanded" : ""}`}
      onClick={onToggleExpand}
    >
      <div className="project-header">
        <div className="project-title-section">
          <h2 className="project-name">{project.name}</h2>
          <span
            className="project-priority"
            data-priority={project.priority}
          >
            {project.priority}
          </span>
          <span
            className="project-status"
            style={{ backgroundColor: STATUS_COLORS[project.status] }}
          >
            {STATUS_LABELS[project.status]}
          </span>
        </div>
        <div className="expand-icon">{isExpanded ? "−" : "+"}</div>
      </div>

      <p className="project-description">{project.description}</p>

      {project.project_url && (
        <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="project-link">
          View Project →
        </a>
      )}

      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-label">Overall Progress</span>
          <span className="progress-percentage">{project.progress}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${project.progress}%`,
              backgroundColor: STATUS_COLORS[project.status],
            }}
          ></div>
        </div>
      </div>

      <div className="project-meta">
        <div className="meta-item">
          <span className="meta-label">Completion</span>
          <span
            className="meta-value"
            style={{ color: completionStatus.color }}
          >
            {completionStatus.text}
          </span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Expected Date</span>
          <span className="meta-value">
            {new Date(project.expected_completion).toLocaleDateString()}
          </span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Tasks</span>
          <span className="meta-value">
            {completedTasks}/{totalTasks}
          </span>
        </div>
      </div>

      {isExpanded && project.tasks && project.tasks.length > 0 && (
        <div className="tasks-section">
          <h3>Tasks</h3>
          <ul className="task-list">
            {project.tasks.map((task, idx) => (
              <li key={idx} className={task.completed ? "completed" : ""}>
                <span className="task-checkbox">
                  {task.completed ? "✓" : "○"}
                </span>
                <span className="task-name">{task.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isExpanded && (
        <div className="project-details">
          <div className="detail-row">
            <span className="detail-label">Team Members</span>
            <span className="detail-value">{project.team_members} people</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Start Date</span>
            <span className="detail-value">
              {new Date(project.start_date).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}