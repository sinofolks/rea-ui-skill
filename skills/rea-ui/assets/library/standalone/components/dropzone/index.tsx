"use client";

import "./Dropzone.css";
// Copyable component. Keep its sibling CSS file in the same folder.
// Generated from the maintained TSX sources; regenerate with npm run generate:standalone.
import {
  type ReactElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type DragEvent,
  type ReactNode,
} from "react";
interface DropzoneItem {
  id: string;
  name: string;
  size: number;
  status: "uploading" | "done" | "error";
  /** Upload progress from 0 to 1. */
  progress: number;
  error?: string;
  file?: File;
}
interface DropzoneProps {
  /** File extensions, with or without a leading dot. */
  accept?: string[];
  /** Maximum size of each file, in bytes. */
  maxSize?: number;
  onUpload?: (file: File, onProgress: (fraction: number) => void) => Promise<unknown>;
  onChange?: (items: DropzoneItem[]) => void;
  hint?: string;
  autoplay?: boolean;
  className?: string;
}
interface UploadSource {
  name: string;
  size: number;
  file?: File;
  failAt?: number;
}
interface UploadEntry extends DropzoneItem {
  startedAt: number;
  duration: number;
  failAt?: number;
  retryable?: boolean;
  removing?: boolean;
}
function Dropzone(props: DropzoneProps) {
  return <DropzoneView {...props} clean={false} />;
}
function fileExtension(name: string): string {
  return name.includes(".") ? name.split(".").pop()!.toLowerCase() : "";
}
function positiveBytes(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}
function formatSize(value: number): string {
  const bytes = positiveBytes(value);
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  if (bytes < MEGABYTE) return `${countFormatter.format(Math.round(bytes / 1024))} KB`;
  if (bytes < GIGABYTE)
    return `${(bytes / MEGABYTE).toFixed(Number(bytes < 10 * MEGABYTE))} MB`;
  return `${countFormatter.format(Number((bytes / GIGABYTE).toFixed(1)))} GB`;
}
function formatUploaded(uploaded: number, total: number): string {
  const size = positiveBytes(total);
  const progress = Math.min(positiveBytes(uploaded), size);
  if (size < 1024) return `${Math.round(progress)} of ${formatSize(size)}`;
  if (size < MEGABYTE)
    return `${countFormatter.format(Math.round(progress / 1024))} of ${formatSize(size)}`;
  if (size < GIGABYTE)
    return `${(progress / MEGABYTE).toFixed(1)} of ${formatSize(size)}`;
  return `${(progress / GIGABYTE).toFixed(1)} of ${formatSize(size)}`;
}
function formatRemaining(seconds: number): string {
  if (!Number.isFinite(seconds)) return "starting";
  if (seconds < 1) return "almost done";
  if (seconds < 60) return `${Math.ceil(seconds)}s left`;
  if (seconds < 3600) return `${Math.ceil(seconds / 60)} min left`;
  if (seconds < 86400) return `${Math.ceil(seconds / 3600)} h left`;
  return `${Math.ceil(seconds / 86400)} d left`;
}
function clampProgress(value: number): number {
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
}
function splitFilename(name: string): [string, string] | null {
  return name.length > 24 && !/[\u0590-\u08ff]/.test(name)
    ? [name.slice(0, -14), name.slice(-14)]
    : null;
}
function simulatedDuration(bytes: number): number {
  return Math.min(9000, Math.max(2600, (bytes / (1.2 * MEGABYTE)) * 1000));
}
function fileColor(name: string, clean: boolean): string {
  return (
    fileColors.find((group) => group.extensions.includes(fileExtension(name)))?.[
      clean ? "clean" : "default"
    ] ?? "#8f8f8f"
  );
}
function nextUploadId(clean: boolean): string {
  return `f${Date.now().toString(36)}${(counters[clean ? "clean" : "default"]++).toString(36)}`;
}
function UploadGlyph({
  path,
  prefix,
  className,
  solid = false,
}: {
  path: string;
  prefix: string;
  className?: string;
  solid?: boolean;
}) {
  return (
    <svg
      viewBox={solid ? "0 0 16 16" : "0 0 24 24"}
      className={[`${prefix}__glyph`, className].filter(Boolean).join(" ")}
      data-solid={solid || undefined}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
function FileBadge({
  name,
  end = false,
  clean,
  prefix,
}: {
  name: string;
  end?: boolean;
  clean: boolean;
  prefix: string;
}) {
  const extension = (fileExtension(name) || "file").slice(0, 4).toUpperCase();
  const width = Math.max(18, extension.length * (clean ? 5.2 : 5.4) + 8);
  const left = end ? 30 - width : 0;
  const color = fileColor(name, clean);
  return (
    <svg viewBox="0 0 30 36" className={`${prefix}__badge`} aria-hidden="true">
      <path
        d="M5 1h14l10 10v20a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V5a4 4 0 0 1 4-4z"
        className={`${prefix}__badge-sheet`}
      />
      <path d="M19 1v6a4 4 0 0 0 4 4h6" className={`${prefix}__badge-fold`} />
      <rect
        x={left}
        y="19"
        width={width}
        height="11"
        rx="3"
        fill={color}
        fillOpacity={clean ? "0.12" : "0.14"}
      />
      <text x={left + 4} y="27.2" className={`${prefix}__badge-text`} fill={color}>
        {extension}
      </text>
    </svg>
  );
}
function FileIcon({ name, prefix }: { name: string; prefix: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`${prefix}__file`} aria-hidden="true">
      <path
        className={`${prefix}__file-sheet`}
        d="M4 1.75h5l3.25 3.25v8A1.25 1.25 0 0 1 11 14.25H4A1.25 1.25 0 0 1 2.75 13V3A1.25 1.25 0 0 1 4 1.75Z"
      />
      <path className={`${prefix}__file-fold`} d="M9 1.75V4a1 1 0 0 0 1 1h2.25" />
      <rect x="1" y="8.5" width="9" height="4.5" rx="1.25" fill={fileColor(name, true)} />
    </svg>
  );
}
function UploadStack({ prefix, clean }: { prefix: string; clean: boolean }) {
  return (
    <span className={`${prefix}__stack`} aria-hidden="true">
      <span className={`${prefix}__sheet ${prefix}__sheet-l`}>
        <FileBadge name="file.pdf" prefix={prefix} clean={clean} />
      </span>
      <span className={`${prefix}__sheet ${prefix}__sheet-r`}>
        <FileBadge name="file.png" end prefix={prefix} clean={clean} />
      </span>
      <span className={`${prefix}__sheet ${prefix}__sheet-m`}>
        <UploadGlyph path={glyphPaths.upload} prefix={prefix} />
      </span>
    </span>
  );
}
function UploadRow({
  item,
  now,
  prefix,
  clean,
  onRetry,
  onRemove,
}: {
  item: UploadEntry;
  now: number;
  prefix: string;
  clean: boolean;
  onRetry: (item: UploadEntry) => void;
  onRemove: (id: string) => void;
}) {
  const remainingSeconds =
    item.status === "uploading"
      ? ((1 - item.progress) * (now - item.startedAt)) /
        Math.max(0.05, item.progress) /
        1000
      : 0;
  const filename = splitFilename(item.name);
  return (
    <li
      className={`${prefix}__row`}
      data-status={item.status}
      data-removing={item.removing || undefined}
    >
      <div className={`${prefix}__row-inner`}>
        {clean ? (
          <FileIcon name={item.name} prefix={prefix} />
        ) : (
          <FileBadge name={item.name} prefix={prefix} clean={false} />
        )}
        <div className={`${prefix}__info`}>
          <div className={`${prefix}__line`}>
            <span className={`${prefix}__name`} title={item.name} dir="auto">
              {filename ? (
                <>
                  <span className={`${prefix}__name-head`}>{filename[0]}</span>
                  <span className={`${prefix}__name-tail`}>{filename[1]}</span>
                </>
              ) : (
                item.name
              )}
            </span>
            {item.status === "done" && (
              <span className={`${prefix}__done`} aria-label="Uploaded">
                <UploadGlyph
                  path={clean ? glyphPaths.checkCircle : glyphPaths.check}
                  solid={clean}
                  prefix={prefix}
                />
              </span>
            )}
          </div>
          <div className={`${prefix}__meta`} key={item.status}>
            {item.status === "uploading" && (
              <>
                {formatUploaded(item.size * item.progress, item.size)}
                <span className={`${prefix}__dot`}>·</span>
                {item.progress < 0.04 ? "starting" : formatRemaining(remainingSeconds)}
              </>
            )}
            {item.status === "done" && formatSize(item.size)}
            {item.status === "error" && (
              <span className={`${prefix}__error`} dir="auto">
                {item.error}
              </span>
            )}
          </div>
          {(item.status !== "error" || item.retryable) && (
            <div
              className={`${prefix}__bar`}
              data-hidden={item.status === "done" || undefined}
              role="progressbar"
              aria-label={`${item.name} upload`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(item.progress * 100)}
            >
              <span style={{ transform: `scaleX(${item.progress})` }} />
            </div>
          )}
        </div>
        <div className={`${prefix}__actions`}>
          {item.status === "error" && item.retryable && (
            <button
              type="button"
              className={
                clean ? `${prefix}__icon-btn ${prefix}__retry` : `${prefix}__icon-btn`
              }
              aria-label={`Retry ${item.name}`}
              onClick={() => onRetry(item)}
            >
              <UploadGlyph path={glyphPaths.retry} prefix={prefix} />
            </button>
          )}
          <button
            type="button"
            className={`${prefix}__icon-btn`}
            aria-label={`Remove ${item.name}`}
            onClick={() => onRemove(item.id)}
          >
            <UploadGlyph path={glyphPaths.close} prefix={prefix} />
          </button>
        </div>
      </div>
    </li>
  );
}
function useDropzone(
  {
    accept,
    maxSize = 25 * MEGABYTE,
    onUpload,
    onChange,
    hint,
    autoplay = false,
  }: DropzoneProps,
  clean: boolean,
) {
  const [items, setItems] = useState<UploadEntry[]>([]);
  const [dragCount, setDragCount] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const [, tick] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const dragDepth = useRef(0);
  const latestItems = useRef(items);
  latestItems.current = items;
  const inputId = useId();
  const extensions = accept?.map((extension) =>
    extension.replace(/^\./, "").toLowerCase(),
  );
  const acceptedLabel = extensions?.length
    ? extensions.length <= 3
      ? extensions.map((extension) => extension.toUpperCase()).join(", ")
      : `${extensions
          .slice(0, 3)
          .map((extension) => extension.toUpperCase())
          .join(", ")} and more`
    : "Any file";
  const sizeLimit = Number.isFinite(maxSize) && maxSize > 0 ? maxSize : Infinity;
  const hintText =
    hint ??
    (sizeLimit < Infinity
      ? `${acceptedLabel} · up to ${formatSize(sizeLimit)} each`
      : acceptedLabel);
  useEffect(() => {
    onChange?.(
      items
        .filter((item) => !item.removing)
        .map(({ id, name, size, status, progress, error, file }) => ({
          id,
          name,
          size,
          status,
          progress,
          error,
          file,
        })),
    );
  }, [items]);
  useLayoutEffect(() => {
    const body = bodyRef.current;
    const inner = innerRef.current;
    if (!body || !inner) return;
    const updateHeight = () => {
      body.style.height = `${inner.offsetHeight}px`;
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);
  function updateItem(id: string, updates: Partial<UploadEntry>) {
    setItems((previous) =>
      previous.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  }
  function upload(item: UploadEntry) {
    if (!onUpload || !item.file) return;
    onUpload(item.file, (progress) =>
      setItems((previous) =>
        previous.map((current) =>
          current.id === item.id && current.status === "uploading"
            ? {
                ...current,
                progress: Math.max(current.progress, clampProgress(progress)),
              }
            : current,
        ),
      ),
    )
      .then(() => {
        updateItem(item.id, { status: "done", progress: 1 });
        setAnnouncement(`${item.name} uploaded`);
      })
      .catch((error: unknown) => {
        const message =
          error instanceof Error && error.message ? error.message : "Upload failed";
        updateItem(item.id, {
          status: "error",
          error: message,
          retryable: true,
        });
        setAnnouncement(`${item.name}: ${message}`);
      });
  }
  function addFile(source: UploadSource) {
    const id = nextUploadId(clean);
    let error: string | undefined;
    const extension = fileExtension(source.name);
    if (extensions?.length && !extensions.includes(extension))
      error = extension
        ? `.${extension} files aren't supported`
        : "This file type isn't supported";
    else if (source.size > sizeLimit) error = `Too large – max ${formatSize(sizeLimit)}`;
    const item: UploadEntry = {
      id,
      name: source.name,
      size: positiveBytes(source.size),
      file: source.file,
      status: error ? "error" : "uploading",
      progress: 0,
      error,
      failAt: source.failAt,
      startedAt: performance.now(),
      duration: simulatedDuration(positiveBytes(source.size)),
    };
    setItems((previous) => [...previous, item]);
    if (error) setAnnouncement(`${source.name}: ${error}`);
    else if (onUpload && source.file) upload(item);
  }
  function addFiles(files: FileList | File[]) {
    Array.from(files).forEach((file) =>
      addFile({ name: file.name, size: file.size, file }),
    );
  }
  const simulating = items.some(
    (item) => item.status === "uploading" && (!onUpload || !item.file),
  );
  useEffect(() => {
    if (!simulating) return;
    const timer = window.setInterval(() => {
      const now = performance.now();
      setItems((previous) =>
        previous.map((item) => {
          if (item.status !== "uploading" || (onUpload && item.file)) return item;
          const elapsedFraction = Math.min(1, (now - item.startedAt) / item.duration);
          const progress = Math.max(
            item.progress,
            elapsedFraction < 1 ? elapsedFraction * (0.92 + Math.random() * 0.08) : 1,
          );
          if (item.failAt !== undefined && progress >= item.failAt) {
            setAnnouncement(`${item.name}: upload failed`);
            return {
              ...item,
              progress: item.failAt,
              status: "error",
              error: "Connection lost",
              retryable: true,
            };
          }
          if (progress >= 1) {
            setAnnouncement(`${item.name} uploaded`);
            return { ...item, progress: 1, status: "done" };
          }
          return { ...item, progress };
        }),
      );
    }, 90);
    return () => clearInterval(timer);
  }, [simulating, onUpload]);
  useEffect(() => {
    if (!items.some((item) => item.status === "uploading")) return;
    const timer = window.setInterval(() => tick((previous) => previous + 1), 500);
    return () => clearInterval(timer);
  }, [items]);
  useEffect(() => {
    if (!autoplay) return;
    const timers = [
      window.setTimeout(() => setDragCount(demoFiles.length), 700),
      window.setTimeout(() => {
        setDragCount(0);
        demoFiles.forEach((file, index) =>
          window.setTimeout(() => addFile(file), index * 140),
        );
      }, 1900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [autoplay]);
  function retry(item: UploadEntry) {
    updateItem(item.id, {
      status: "uploading",
      progress: 0,
      error: undefined,
      retryable: false,
      failAt: undefined,
      startedAt: performance.now(),
    });
    if (onUpload && item.file) upload({ ...item, progress: 0 });
  }
  function remove(id: string) {
    updateItem(id, { removing: true });
    window.setTimeout(
      () => setItems((previous) => previous.filter((item) => item.id !== id)),
      480,
    );
  }
  function clearFinished() {
    latestItems.current
      .filter((item) => item.status !== "uploading")
      .forEach((item) => remove(item.id));
  }
  function hasFiles(event: DragEvent<HTMLButtonElement>) {
    return Array.from(event.dataTransfer.types).includes("Files");
  }
  function onDragEnter(event: DragEvent<HTMLButtonElement>) {
    if (!hasFiles(event)) return;
    event.preventDefault();
    dragDepth.current += 1;
    setDragCount(Math.max(1, event.dataTransfer.items.length));
  }
  function onDragOver(event: DragEvent<HTMLButtonElement>) {
    if (!hasFiles(event)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }
  function onDragLeave() {
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (!dragDepth.current) setDragCount(0);
  }
  function onDrop(event: DragEvent<HTMLButtonElement>) {
    if (!hasFiles(event)) return;
    event.preventDefault();
    dragDepth.current = 0;
    setDragCount(0);
    addFiles(event.dataTransfer.files);
  }
  const activeItems = items.filter((item) => !item.removing);
  const uploadingItems = activeItems.filter((item) => item.status === "uploading");
  const doneItems = activeItems.filter((item) => item.status === "done");
  const errorItems = activeItems.filter((item) => item.status === "error");
  return {
    items,
    dragCount,
    announcement,
    inputRef,
    bodyRef,
    innerRef,
    inputId,
    hintText,
    addFiles,
    retry,
    remove,
    clearFinished,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    activeItems,
    uploadingItems,
    doneItems,
    errorItems,
    now: performance.now(),
  };
}
function DropzoneView({
  clean = false,
  ...props
}: DropzoneProps & {
  clean?: boolean;
}) {
  const prefix = clean ? "ui-dzc" : "ui-dz";
  const {
    items,
    dragCount,
    announcement,
    inputRef,
    bodyRef,
    innerRef,
    inputId,
    hintText,
    addFiles,
    retry,
    remove,
    clearFinished,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    activeItems,
    uploadingItems,
    doneItems,
    errorItems,
    now,
  } = useDropzone(props, clean);
  let summary: ReactNode = null;
  if (activeItems.length) {
    if (uploadingItems.length) {
      const total = uploadingItems.reduce((sum, item) => sum + item.size, 0);
      const uploaded = uploadingItems.reduce(
        (sum, item) => sum + item.size * item.progress,
        0,
      );
      const uploadingText = `Uploading ${countFormatter.format(uploadingItems.length)} of ${countFormatter.format(activeItems.length)}`;
      summary = clean ? (
        <span className={`${prefix}__summary`}>
          <span className={`${prefix}__shimmer`} data-text={uploadingText}>
            {uploadingText}
          </span>
          <span className={`${prefix}__dot`}>·</span>
          {formatUploaded(uploaded, total)}
        </span>
      ) : (
        <span>
          {"Uploading "}
          {countFormatter.format(uploadingItems.length)}
          {" of "}
          {countFormatter.format(activeItems.length)}
          {" · "}
          {formatUploaded(uploaded, total)}
        </span>
      );
    } else {
      const icon = errorItems.length
        ? clean
          ? glyphPaths.alertCircle
          : glyphPaths.alert
        : clean
          ? glyphPaths.checkCircle
          : glyphPaths.check;
      summary = (
        <span
          className={
            clean
              ? `${prefix}__summary ${prefix}__summary-done`
              : `${prefix}__summary-done`
          }
        >
          <UploadGlyph
            path={icon}
            solid={clean}
            prefix={prefix}
            className={`${prefix}__${errorItems.length ? "warn" : "ok"}`}
          />
          {errorItems.length
            ? `${countFormatter.format(doneItems.length)} of ${countFormatter.format(activeItems.length)} uploaded`
            : `${countFormatter.format(doneItems.length)} ${doneItems.length === 1 ? "file" : "files"} uploaded`}
        </span>
      );
    }
  }
  const inner = (
    <div ref={innerRef} className={`${prefix}__inner`}>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        aria-label="Choose files to upload"
        multiple
        accept={props.accept?.join(",")}
        className={`${prefix}__input`}
        tabIndex={-1}
        onChange={(event) => {
          if (event.target.files) addFiles(event.target.files);
          event.target.value = "";
        }}
      />
      <button
        type="button"
        className={`${prefix}__area`}
        data-dragging={dragCount > 0 || undefined}
        aria-describedby={`${inputId}-hint`}
        onClick={() => inputRef.current?.click()}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <UploadStack prefix={prefix} clean={clean} />
        <span
          className={`${prefix}__title`}
          children={
            dragCount ? (
              `Release to upload ${dragCount === 1 ? "1 file" : `${countFormatter.format(dragCount)} files`}`
            ) : (
              <>
                <span className={`${prefix}__for-mouse`}>
                  {"Drop files here or "}
                  <span className={`${prefix}__browse`}>browse</span>
                </span>
                <span className={`${prefix}__for-touch`}>
                  {"Tap to "}
                  <span className={`${prefix}__browse`}>choose files</span>
                </span>
              </>
            )
          }
          key={dragCount ? "drop" : "idle"}
        />
        <span className={`${prefix}__hint`} id={`${inputId}-hint`}>
          {hintText}
        </span>
      </button>
      <ul className={`${prefix}__list`} aria-label="Uploads">
        {items.map((item) => (
          <UploadRow
            item={item}
            now={now}
            prefix={prefix}
            clean={clean}
            onRetry={retry}
            onRemove={remove}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
  const footer = (
    <div className={`${prefix}__foot`}>
      {summary ?? <span className={`${prefix}__foot-idle`}>No files yet</span>}
      {(doneItems.length > 0 || errorItems.length > 0) && !uploadingItems.length && (
        <button type="button" className={`${prefix}__clear`} onClick={clearFinished}>
          Clear
        </button>
      )}
    </div>
  );
  return (
    <div className={[prefix, props.className].filter(Boolean).join(" ")}>
      {clean ? (
        <div className={`${prefix}__card`}>
          <div ref={bodyRef} className={`${prefix}__body`}>
            {inner}
          </div>
          {footer}
        </div>
      ) : (
        <>
          <div ref={bodyRef} className={`${prefix}__card`}>
            {inner}
          </div>
          {footer}
        </>
      )}
      <span className={`${prefix}__live`} aria-live="polite">
        {announcement}
      </span>
    </div>
  );
}
const MEGABYTE = 1048576;
const GIGABYTE = 1024 * MEGABYTE;
const countFormatter = new Intl.NumberFormat("en");
const demoFiles: UploadSource[] = [
  { name: "Q3-Board-Report.pdf", size: 4.2 * MEGABYTE },
  { name: "Hero-Shot.png", size: 2.6 * MEGABYTE },
  { name: "Budget-2027.xlsx", size: 1.3 * MEGABYTE, failAt: 0.62 },
  { name: "Product-Demo.mp4", size: 48 * MEGABYTE },
];
const fileColors = [
  { extensions: ["pdf"], default: "#e5484d", clean: "#e5484d" },
  {
    extensions: ["xls", "xlsx", "csv", "numbers"],
    default: "#2f9e5b",
    clean: "#1a9a52",
  },
  {
    extensions: ["doc", "docx", "txt", "md", "pages", "rtf"],
    default: "#2f6bff",
    clean: "#0060e2",
  },
  {
    extensions: ["png", "jpg", "jpeg", "gif", "webp", "svg", "heic", "avif"],
    default: "#8b5cf6",
    clean: "#5B5BD6",
  },
  {
    extensions: ["mp4", "mov", "webm", "mp3", "wav"],
    default: "#f08c00",
    clean: "#e8a20c",
  },
  { extensions: ["ppt", "pptx", "key"], default: "#e8590c", clean: "#e8590c" },
];
const counters = { default: 0, clean: 0 };
const glyphPaths = {
  upload:
    "M12 15V4M7.5 8.5 12 4l4.5 4.5M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15",
  close: "M7 7l10 10M17 7 7 17",
  check: "M5.5 12.5l4 4L18.5 8",
  retry: "M20 12a8 8 0 1 1-2.34-5.66L20 8.5M20 4v4.5h-4.5",
  alert:
    "M12 8v5M12 16.5h.01M10.3 3.9 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
  checkCircle:
    "M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0Zm8.9-1.2a.5.5 0 0 0-.8-.6L7.44 9.23 6.35 8.15a.5.5 0 1 0-.7.7l1.5 1.5a.5.5 0 0 0 .76-.06l2.5-3.5Z",
  alertCircle:
    "M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0ZM8 4.6a.6.6 0 0 0-.6.6v3.2a.6.6 0 0 0 1.2 0V5.2a.6.6 0 0 0-.6-.6Zm0 6.9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
};
export { Dropzone };
export type { DropzoneProps };
export type { DropzoneItem };
