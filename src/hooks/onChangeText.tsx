import React, { useEffect, useRef } from "react";

export const OnChangeText = ({
  html,
  onChange
}: {
  html: string;
  onChange: (s: string) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const lastHtml = useRef<string>("");

  const emitChange = () => {
    const curHtml = ref.current?.innerHTML ?? "";
    if (curHtml !== lastHtml.current) {
      onChange(curHtml);
    }
    lastHtml.current = html;
  };

  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.innerHTML === html) return;
    ref.current.innerHTML = html;
  }, [html]);

  return (
    <div
      onInput={emitChange}
      contentEditable
      dangerouslySetInnerHTML={{ __html: html }}
      ref={ref}
    ></div>
  );
};
