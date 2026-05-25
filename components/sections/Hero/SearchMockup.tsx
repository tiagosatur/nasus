"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type QueryEntry = {
  query: string;
  results: { domain: string; title: string; desc: string }[];
};

const SKELETON_ROWS = [
  { domain: "w-24", title: "w-52", desc: "w-40" },
  { domain: "w-32", title: "w-48", desc: "w-36" },
  { domain: "w-20", title: "w-44", desc: "w-44" },
];

export function SearchMockup() {
  const t = useTranslations("hero");
  const queries = t.raw("queries") as QueryEntry[];

  const [queryIndex, setQueryIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [resultsVisible, setResultsVisible] = useState(false);

  useEffect(() => {
    const query = queries[queryIndex].query;
    setDisplayText("");
    setResultsVisible(false);
    setDisplayIndex(queryIndex);

    let charIndex = 0;
    let showResultsTimeout: ReturnType<typeof setTimeout>;
    let nextQueryTimeout: ReturnType<typeof setTimeout>;

    const typeInterval = setInterval(() => {
      charIndex++;
      setDisplayText(query.slice(0, charIndex));
      if (charIndex === query.length) {
        clearInterval(typeInterval);
        showResultsTimeout = setTimeout(() => setResultsVisible(true), 300);
        nextQueryTimeout = setTimeout(() => {
          setQueryIndex((i) => (i + 1) % queries.length);
        }, 3800);
      }
    }, 52);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(showResultsTimeout);
      clearTimeout(nextQueryTimeout);
    };
  }, [queryIndex, queries]);

  const current = queries[displayIndex];

  return (
    <div className="max-w-sm">
      <p className="text-[11px] text-text-muted font-mono uppercase tracking-widest mb-4">
        {t("mockupLabel")}
      </p>

      <div className="bg-white border border-border shadow-[0_12px_48px_rgba(28,21,18,0.08)] overflow-hidden">
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <div className="flex items-center gap-2.5 bg-bg-primary border border-border rounded-full px-3.5 py-2.5">
            <SearchIcon />
            <span className="text-sm text-text-secondary flex-1 flex items-center min-h-[1.25rem]">
              {displayText}
              <span className="cursor-blink text-text-muted" aria-hidden="true" />
            </span>
          </div>
        </div>

        <div className="grid">
          <div
            className="col-start-1 row-start-1 px-4 py-3 space-y-4 transition-opacity duration-300"
            style={{ opacity: resultsVisible ? 0 : 1, pointerEvents: resultsVisible ? "none" : "auto" }}
            aria-hidden={resultsVisible}
          >
            {SKELETON_ROWS.map((row, i) => (
              <div key={i}>
                <div className={`h-2 ${row.domain} rounded-sm bg-bg-secondary mb-1.5`} />
                <div className={`h-3.5 ${row.title} rounded-sm bg-bg-secondary mb-1.5`} />
                <div className={`h-2 ${row.desc} rounded-sm bg-bg-secondary`} />
                {i < SKELETON_ROWS.length - 1 && <div className="mt-3 border-b border-border" />}
              </div>
            ))}
          </div>

          <div
            className="col-start-1 row-start-1 px-4 py-3 space-y-4 transition-opacity duration-500"
            style={{ opacity: resultsVisible ? 1 : 0, pointerEvents: resultsVisible ? "auto" : "none" }}
            aria-hidden={!resultsVisible}
          >
            {current.results.map((r, i) => (
              <div key={i}>
                <div className="text-[11px] text-text-muted mb-0.5">{r.domain}</div>
                <div className="text-sm text-link font-medium leading-snug">{r.title}</div>
                <div className="text-[11px] text-text-muted mt-0.5">
                  {r.desc}
                </div>
                {i < current.results.length - 1 && (
                  <div className="mt-3 border-b border-border" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 pb-4 pt-2">
          <div className="flex items-center gap-2.5 bg-accent-muted px-3.5 py-3">
            <span className="text-base" aria-hidden="true">?</span>
            <div>
              <div className="text-xs font-semibold text-accent leading-tight">
                {t("notFound")}
              </div>
              <div className="text-[11px] text-text-secondary mt-0.5">
                {t("notFoundSub")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9E8E80" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
