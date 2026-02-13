import { ThesisPresenterClient } from "@/components/content/thesis-presenter-client";
import { parseThesisMarkdown } from "@/lib/content/thesis-parser";

type ThesisPresenterProps = {
  markdown: string;
  fallbackTitle: string;
  tag?: string;
  publishedLabel?: string;
  readingTimeMinutes?: number;
};

export function ThesisPresenter({
  markdown,
  fallbackTitle,
  tag,
  publishedLabel,
  readingTimeMinutes,
}: ThesisPresenterProps) {
  const document = parseThesisMarkdown(markdown);

  return (
    <ThesisPresenterClient
      title={document.title ?? fallbackTitle}
      subtitle={document.subtitle}
      tag={tag}
      publishedLabel={publishedLabel}
      readingTimeMinutes={readingTimeMinutes}
      sections={document.sections}
    />
  );
}
