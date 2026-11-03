"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Download,
  ExternalLink,
  Calendar,
  Layers,
  TrendingUp,
  Compass,
  Activity,
  BookOpen,
  Wrench,
  FileText,
  LucideIcon,
  ArrowUpRight,
} from "lucide-react";
import { PUBLICATIONS, ResourceCategory, ResourceDocument } from "../../data/content";

interface CategoryMeta {
  label: ResourceCategory;
  icon: LucideIcon;
}

const CATEGORIES: CategoryMeta[] = [
  { label: "All", icon: Layers },
  { label: "Annual Reports", icon: TrendingUp },
  { label: "Strategic Plans", icon: Compass },
  { label: "Clinical Guidelines", icon: Activity },
  { label: "Policy Briefs", icon: BookOpen },
  { label: "Toolkits & Manuals", icon: Wrench },
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredDocs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PUBLICATIONS.filter((doc) => {
      const matchesCategory =
        selectedCategory === "All" || doc.category === selectedCategory;
      const matchesSearch =
        q === "" ||
        doc.title.toLowerCase().includes(q) ||
        doc.subtitle.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q) ||
        doc.author.toLowerCase().includes(q) ||
        doc.category.toLowerCase().includes(q) ||
        (doc.tags && doc.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="resources-page-wrapper" id="main">
      {/* 1. HERO */}
      <section className="page-hero-banner" aria-label="Publications and Resources">
        <div className="frame page-hero-inner">
          <h1 className="page-hero-title">Publications & Resources</h1>
          <p className="page-hero-desc">
            Evidence-based clinical guidelines, strategic campaign roadmaps, policy briefs,
            and field toolkits published by the Tanzania Physiotherapy Initiative.
          </p>
        </div>
      </section>

      {/* 2. REPOSITORY */}
      <section className="frame section pub-section">
        {/* Toolbar: Category filter & search */}
        <div className="pub-toolbar">
          <nav className="pub-category-tabs" aria-label="Filter documents by category">
            {CATEGORIES.map(({ label, icon: CatIcon }) => {
              const isActive = selectedCategory === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setSelectedCategory(label)}
                  className={`pub-tab-btn ${isActive ? "active" : ""}`}
                >
                  <CatIcon size={14} className="pub-tab-icon" aria-hidden="true" />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>

          <div className="pub-search-wrapper">
            <Search size={16} className="pub-search-icon" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search publications..."
              className="pub-search-input"
              aria-label="Search publications"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="pub-search-clear"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Status Count Row */}
        <div className="pub-status-bar">
          <span className="pub-count-text">
            Showing <strong>{filteredDocs.length}</strong> {filteredDocs.length === 1 ? "publication" : "publications"}
            {selectedCategory !== "All" && ` in “${selectedCategory}”`}
            {searchQuery && ` matching “${searchQuery}”`}
          </span>

          {(selectedCategory !== "All" || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="pub-reset-btn"
            >
              Show all publications
            </button>
          )}
        </div>

        {/* 3. PUBLICATION CARDS GRID (Inspired by Msichana Initiative) */}
        {filteredDocs.length > 0 ? (
          <div className="pub-cards-grid">
            {filteredDocs.map((doc: ResourceDocument) => {
              return (
                <article key={doc.id} className="pub-card group">
                  {/* Top Cover Banner with Centered Graphic */}
                  <div className="pub-card-cover">
                    <div className="pub-cover-top-left">
                      <span className="pub-cover-cat-pill">
                        <FileText size={12} aria-hidden="true" />
                        <span>{doc.category}</span>
                      </span>
                    </div>

                    <div className="pub-cover-top-right">
                      <span className="pub-cover-pdf-badge">{doc.format}</span>
                    </div>

                    <div className="pub-cover-center-icon">
                      <div className="pub-cover-icon-circle">
                        <FileText size={32} strokeWidth={1.8} aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="pub-card-body">
                    <div className="pub-card-main-content">
                      <span className="pub-card-eyebrow">{doc.category}</span>

                      <h3 className="pub-card-title">{doc.title}</h3>

                      <div className="pub-card-date-row">
                        <Calendar size={13} aria-hidden="true" />
                        <span>{doc.date}</span>
                        <span className="pub-meta-sep">•</span>
                        <span>{doc.pages} pages</span>
                        <span className="pub-meta-sep">•</span>
                        <span>{doc.fileSize}</span>
                      </div>

                      <p className="pub-card-desc">{doc.description}</p>

                      {/* Tag pills */}
                      {doc.tags && doc.tags.length > 0 && (
                        <div className="pub-card-tags">
                          {doc.tags.map((t) => (
                            <span key={t} className="pub-card-tag-pill">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Row: [Download PDF] pill on left + [↗] pure icon on right (Exact Msichana style) */}
                    <div className="pub-card-actions">
                      <a
                        href={doc.downloadUrl}
                        download
                        className="pub-download-btn"
                        title={`Download ${doc.title} (${doc.fileSize})`}
                      >
                        <Download size={15} strokeWidth={2.2} aria-hidden="true" />
                        <span>Download PDF</span>
                      </a>

                      <a
                        href={doc.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pub-preview-btn"
                        title="Open document in new tab"
                        aria-label={`Open ${doc.title} in new tab`}
                      >
                        <ExternalLink size={18} strokeWidth={2.2} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="pub-empty-state">
            <FileText size={40} className="pub-empty-icon" aria-hidden="true" />
            <h3>No publications found</h3>
            <p>We couldn’t find any documents matching your current search or active filters.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="pub-empty-btn"
            >
              Clear filters and view all
            </button>
          </div>
        )}

        {/* Footer Collaboration Callout */}
        <div className="pub-collab-note">
          <p>
            Need hard copies for your hospital library or seeking research collaboration?{" "}
            <Link href="/contact" className="pub-collab-link">
              <span>Contact our coordination desk</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
