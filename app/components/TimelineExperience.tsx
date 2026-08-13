"use client";

import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { TimelineEntry } from "../data/timeline";
import "./TimelineExperience.css";

type TimelineSectionProps = {
  label: string;
  title: string;
  entries: TimelineEntry[];
  isActive: boolean;
  onDialogOpenChange?: (open: boolean) => void;
};

type ModalProps = {
  entry: TimelineEntry;
  onClose: () => void;
  onOpenChange?: (open: boolean) => void;
};

export function SectionHeader({ label, title, count }: { label: string; title: string; count: number }) {
  return (
    <header className="timeline-section-header">
      <div>
        <p>{label}</p>
        <h2>{title}</h2>
      </div>
      <span>{String(count).padStart(2, "0")} ENTRIES&nbsp;&nbsp;/&nbsp;&nbsp;CLICK TO EXPLORE</span>
    </header>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="timeline-tags" aria-label="关键词标签">
      {tags.map((tag) => <span key={tag}>{tag}</span>)}
    </div>
  );
}

function Backdrop({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <motion.div
      className="timeline-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      {children}
    </motion.div>
  );
}

function DetailModal({ entry, onClose, onOpenChange }: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement | null;
    onOpenChange?.(true);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      onOpenChange?.(false);
      previousFocus.current?.focus();
    };
  }, [onClose, onOpenChange]);

  const detailLabel = entry.kind === "internship" ? "实习项目" : "负责情况";
  const typeLabel = entry.kind === "internship" ? "WORK EXPERIENCE" : "PROJECT EXPERIENCE";

  return (
    <Backdrop onClose={onClose}>
      <motion.div
        ref={dialogRef}
        className={`timeline-modal timeline-modal--${entry.kind}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="timeline-modal-glow" aria-hidden="true" />
        <button
          ref={closeRef}
          className="timeline-modal-close"
          type="button"
          onClick={onClose}
          aria-label="关闭详情弹窗"
        >
          <span>ESC</span> ×
        </button>

        <div className="timeline-modal-head">
          <p>{typeLabel}&nbsp;&nbsp;/&nbsp;&nbsp;{entry.period}</p>
          <h3 id={titleId}>{entry.title}</h3>
          <div className="timeline-modal-meta">
            <span>{detailLabel}</span><b>{entry.subtitle}</b>
            <span>身份</span><b>{entry.role}</b>
          </div>
          <p id={descriptionId} className="timeline-modal-summary">{entry.summary}</p>
        </div>

        {entry.highlights?.length ? (
          <div className="timeline-highlights">
            {entry.highlights.map((item) => (
              <div key={`${item.value}-${item.label}`}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        ) : null}

        <div className="timeline-modal-body">
          <section>
            <p className="timeline-modal-label">DETAILS / 具体工作</p>
            <ul>
              {entry.details.map((detail) => (
                <li key={detail}><i aria-hidden="true" />{detail}</li>
              ))}
            </ul>
          </section>
          <aside>
            <p className="timeline-modal-label">KEYWORDS / 关键词</p>
            <TagList tags={entry.tags} />
          </aside>
        </div>

        <div className="timeline-modal-foot">
          <span>MRL / PERSONAL PORTFOLIO</span>
          <button type="button" onClick={onClose}>CLOSE DETAILS&nbsp;&nbsp;↗</button>
        </div>
      </motion.div>
    </Backdrop>
  );
}

export function ExperienceModal(props: ModalProps) {
  return <DetailModal {...props} />;
}

export function ProjectModal(props: ModalProps) {
  return <DetailModal {...props} />;
}

export function TimelineItem({
  entry,
  index,
  onSelect,
}: {
  entry: TimelineEntry;
  index: number;
  onSelect: (entry: TimelineEntry) => void;
}) {
  return (
    <motion.li
      className="timeline-item"
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
    >
      <motion.button
        type="button"
        className="timeline-item-button"
        onClick={() => onSelect(entry)}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.985 }}
        aria-label={`查看${entry.title}详情`}
      >
        <div className="timeline-time"><span>{entry.period}</span></div>
        <div className="timeline-axis"><i /><small>{String(index + 1).padStart(2, "0")}</small></div>
        <div className="timeline-card">
          <span className="timeline-card-index">
            {entry.kind === "internship" ? "COMPANY" : "PROJECT"}&nbsp;&nbsp;/&nbsp;&nbsp;
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3>{entry.title}</h3>
          <p>{entry.subtitle}</p>
          <b>VIEW DETAILS&nbsp;&nbsp;↗</b>
        </div>
      </motion.button>
    </motion.li>
  );
}

export function Timeline({
  entries,
  isActive,
  onSelect,
}: {
  entries: TimelineEntry[];
  isActive: boolean;
  onSelect: (entry: TimelineEntry) => void;
}) {
  const style = { "--timeline-count": entries.length } as CSSProperties;
  return (
    <motion.ol
      className={`timeline-grid timeline-grid--${entries[0]?.kind ?? "default"}`}
      style={style}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } } }}
    >
      {entries.map((entry, index) => (
        <TimelineItem key={entry.id} entry={entry} index={index} onSelect={onSelect} />
      ))}
    </motion.ol>
  );
}

function TimelineSection({ label, title, entries, isActive, onDialogOpenChange }: TimelineSectionProps) {
  const [selected, setSelected] = useState<TimelineEntry | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);
  const selectEntry = useCallback((entry: TimelineEntry) => setSelected(entry), []);

  const dialog = (
    <AnimatePresence>
      {selected && (
        selected.kind === "internship"
          ? <ExperienceModal key={selected.id} entry={selected} onClose={closeModal} onOpenChange={onDialogOpenChange} />
          : <ProjectModal key={selected.id} entry={selected} onClose={closeModal} onOpenChange={onDialogOpenChange} />
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="timeline-ambient" aria-hidden="true" />
      <div className="slide-inner timeline-section-inner">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          <SectionHeader label={label} title={title} count={entries.length} />
        </motion.div>
        <Timeline entries={entries} isActive={isActive} onSelect={selectEntry} />
      </div>
      {typeof document !== "undefined" ? createPortal(dialog, document.body) : null}
    </>
  );
}

export function ExperienceTimeline(props: Omit<TimelineSectionProps, "label" | "title">) {
  return <TimelineSection {...props} label="03 / WORK EXPERIENCE" title="我的实习经历" />;
}

export function ProjectTimeline(props: Omit<TimelineSectionProps, "label" | "title">) {
  return <TimelineSection {...props} label="04 / PROJECT EXPERIENCE" title="我的项目经历" />;
}
