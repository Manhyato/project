"use client";

import { forwardRef, memo, useId, useImperativeHandle, useMemo, useRef } from "react";
import type { ForwardedRef } from "react";

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

function highlightNonCodeSegment(value: string) {
  const headingMatch = value.match(/^(#{1,6})(?:\s+)?(.+)$/);
  if (headingMatch) {
    const level = headingMatch[1].length;
    return `<span class="pe-token-heading pe-token-heading-${level}">${escapeHtml(value)}</span>`;
  }

  const tokenPattern =
    /(&lt;\/?)([A-Za-z][\w-]*?)(&gt;)|("([^"\n]+?)")(\s*:)\s*("([^"\n]*?)")|("([^"\n]+?)")(\s*:)|(\+\+\+[A-Za-zА-Яа-яЁё][\wА-Яа-яЁё-]*(?:\([^)\n]*?\))?)|(\{\{[^{}\n]+?\}\})|((?<![\p{L}\p{N}_])[\p{Lu}]{2,}(?![\p{L}\p{N}_]))|([—→∈∩∪¬⊕])/gu;

  return escapeHtml(value).replace(
    tokenPattern,
    (
      match,
      xmlOpen,
      xmlName,
      xmlClose,
      jsonKeyQuoted,
      _jsonKeyInner,
      jsonColonPair,
      jsonValueQuoted,
      _jsonValueInner,
      jsonKeyOnly,
      _jsonKeyOnlyInner,
      jsonColonOnly,
      decorator,
      variable,
      caps,
      symbol,
    ) => {
      if (xmlOpen && xmlName && xmlClose) {
        return `<span class="pe-token-tag-bracket">${xmlOpen}</span><span class="pe-token-tag-name">${xmlName}</span><span class="pe-token-tag-bracket">${xmlClose}</span>`;
      }

      if (jsonKeyQuoted && jsonColonPair && jsonValueQuoted) {
        return `<span class="pe-token-json-key">${jsonKeyQuoted}</span><span class="pe-token-json-colon">${jsonColonPair}</span> <span class="pe-token-json-value">${jsonValueQuoted}</span>`;
      }

      if (jsonKeyOnly && jsonColonOnly) {
        return `<span class="pe-token-json-key">${jsonKeyOnly}</span><span class="pe-token-json-colon">${jsonColonOnly}</span>`;
      }

      if (decorator) return `<span class="pe-token-decorator">${decorator}</span>`;
      if (variable) return `<span class="pe-token-variable">${variable}</span>`;
      if (caps) return `<span class="pe-token-caps">${caps}</span>`;

      if (symbol) {
        if (symbol === "—") return `<span class="pe-token-divider">${symbol}</span>`;
        if (symbol === "→") return `<span class="pe-token-arrow">${symbol}</span>`;
        return `<span class="pe-token-meta">${symbol}</span>`;
      }

      return match;
    },
  );
}

export function highlightPromptSyntax(value: string) {
  const blockPattern = /```[\s\S]*?```|'''[\s\S]*?'''/g;
  const inlinePattern = /`[^`\n]*?`/g;

  const highlighted: string[] = [];
  let lastBlockIndex = 0;

  const processInlineAwareText = (text: string) => {
    let lastInlineIndex = 0;
    const pieces: string[] = [];

    for (const inlineMatch of text.matchAll(inlinePattern)) {
      const full = inlineMatch[0];
      const index = inlineMatch.index ?? 0;

      if (index > lastInlineIndex) {
        const beforeInline = text.slice(lastInlineIndex, index);
        pieces.push(...beforeInline.split("\n").map(highlightNonCodeSegment).flatMap((line, i, arr) => (i < arr.length - 1 ? [line, "\n"] : [line])));
      }

      pieces.push(`<span class="pe-token-inline">${escapeHtml(full)}</span>`);
      lastInlineIndex = index + full.length;
    }

    if (lastInlineIndex < text.length) {
      const tail = text.slice(lastInlineIndex);
      pieces.push(...tail.split("\n").map(highlightNonCodeSegment).flatMap((line, i, arr) => (i < arr.length - 1 ? [line, "\n"] : [line])));
    }

    return pieces.join("");
  };

  for (const blockMatch of value.matchAll(blockPattern)) {
    const full = blockMatch[0];
    const index = blockMatch.index ?? 0;

    if (index > lastBlockIndex) {
      highlighted.push(processInlineAwareText(value.slice(lastBlockIndex, index)));
    }

    highlighted.push(`<span class="pe-token-codeblock">${escapeHtml(full)}</span>`);
    lastBlockIndex = index + full.length;
  }

  if (lastBlockIndex < value.length) {
    highlighted.push(processInlineAwareText(value.slice(lastBlockIndex)));
  }

  return highlighted.join("");
}

const editorTools = [
  { label: "B", title: "Жирный", before: "**", after: "**", fallback: "жирный текст" },
  { label: "I", title: "Курсив", before: "*", after: "*", fallback: "курсив" },
  { label: "`", title: "Инлайн-код", before: "`", after: "`", fallback: "код" },
  { label: "```", title: "Блок кода", before: "```\n", after: "\n```", fallback: "код" },
  { label: "#", title: "Заголовок H1", before: "# ", after: "", fallback: "Заголовок" },
  { label: "###", title: "Заголовок H3", before: "### ", after: "", fallback: "Заголовок" },
] as const;

function PromptEditorComponent(
  { value, onChange, placeholder, id, ariaLabel }: PromptEditorProps,
  forwardedRef: ForwardedRef<HTMLTextAreaElement>,
) {
  const generatedId = useId();
  const editorId = id ?? generatedId;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(forwardedRef, () => textareaRef.current as HTMLTextAreaElement);

  const highlightedContent = useMemo(() => {
    if (!value.trim()) return "";
    return highlightPromptSyntax(value);
  }, [value]);

  const applyTool = (before: string, after: string, fallback: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.slice(start, end) || fallback;
    const nextValue = `${value.slice(0, start)}${before}${selectedText}${after}${value.slice(end)}`;
    const nextStart = start + before.length;
    const nextEnd = nextStart + selectedText.length;

    onChange(nextValue);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(nextStart, nextEnd);
    });
  };

  return (
    <div className="prompt-editor-shell rounded border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900">
      <div className="prompt-editor-toolbar" aria-label="Быстрое форматирование">
        {editorTools.map((tool) => (
          <button
            key={tool.title}
            type="button"
            title={tool.title}
            aria-label={tool.title}
            className="prompt-editor-tool"
            onClick={() => applyTool(tool.before, tool.after, tool.fallback)}
          >
            {tool.label}
          </button>
        ))}
      </div>
      <div className="prompt-editor-wrapper">
        <pre aria-hidden="true" className="prompt-editor-highlight">
          <code
            dangerouslySetInnerHTML={{
              __html: `${highlightedContent}${value.endsWith("\n") ? "\n" : ""}`,
            }}
          />
        </pre>
        <textarea
          ref={textareaRef}
          id={editorId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel}
          className="prompt-editor-input"
          rows={10}
        />
      </div>
    </div>
  );
}

export const PromptEditor = memo(forwardRef(PromptEditorComponent));

export default PromptEditor;
