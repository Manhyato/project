"use client";

import { memo, useId, useMemo } from "react";

type PromptEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  ariaLabel?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function highlightPromptSyntax(value: string) {
  const escaped = escapeHtml(value);

  const patterns: Array<[RegExp, string]> = [
    [/^## .+$/gm, "pe-token-heading"],
    [/\+\+\+[A-Za-z][\w-]*/g, "pe-token-decorator"],
    [/\{\{[^}]+\}\}/g, "pe-token-variable"],
    [/`[^`]+`/g, "pe-token-inline"],
    [/"[^"]+"\s*:\s*"[^"]*"/g, "pe-token-json"],
    [/"[^"]+"\s*:/g, "pe-token-json-key"],
    [/&lt;\/?[A-Za-z][\w-]*&gt;/g, "pe-token-tag"],
    [/[A-Z]{3,}/g, "pe-token-caps"],
    [/→/g, "pe-token-arrow"],
    [/[∈∩∪¬⊕]/g, "pe-token-meta"],
  ];

  return patterns.reduce((acc, [pattern, className]) => {
    return acc.replace(pattern, (match) => `<span class="${className}">${match}</span>`);
  }, escaped);
}

function PromptEditorComponent({ value, onChange, placeholder, id, ariaLabel }: PromptEditorProps) {
  const generatedId = useId();
  const editorId = id ?? generatedId;

  const highlightedContent = useMemo(() => {
    if (!value.trim()) return "";
    return highlightPromptSyntax(value);
  }, [value]);

  return (
    <div className="prompt-editor-wrapper rounded border border-zinc-300 bg-white">
      <pre aria-hidden="true" className="prompt-editor-highlight">
        <code
          dangerouslySetInnerHTML={{
            __html: `${highlightedContent}${value.endsWith("\n") ? "\n" : ""}`,
          }}
        />
      </pre>
      <textarea
        id={editorId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="prompt-editor-input"
        rows={10}
      />
    </div>
  );
}

export const PromptEditor = memo(PromptEditorComponent);

export default PromptEditor;
