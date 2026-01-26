"use client";

import ReactMarkdown from "react-markdown";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose-content">
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="content-h2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="content-h3">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="content-p">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="content-ul">{children}</ul>
          ),
          li: ({ children }) => (
            <li className="content-li">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="content-strong">{children}</strong>
          ),
          hr: () => <hr className="content-hr" />,
          a: ({ href, children }) => (
            <a href={href} className="content-link">
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="content-blockquote">{children}</blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
