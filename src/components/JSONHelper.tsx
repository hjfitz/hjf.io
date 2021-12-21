import React from "react";

interface JsonProps {
  json: Record<string | number, any>;
}

const JSONHelper = ({ json }: JsonProps) => {
  return (
    <div className="gatsby-highlight" data-language="json">
      <pre className="language-json">
        <code className="inline-block language-json">
          {JSON.stringify(json, null, 2)}
        </code>
      </pre>
    </div>
  );
};

export default JSONHelper;
