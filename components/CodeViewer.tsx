'use client'

interface CodeViewerProps {
  code: string;
  language: string;
  filename: string;
}

export default function CodeViewer({ code, language, filename }: CodeViewerProps) {
  return (
    <div className="w-full">
      <div className="bg-gray-900 rounded-t-lg px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 text-sm ml-2">{filename}</span>
        </div>
        <span className="text-gray-500 text-xs">{language}</span>
      </div>
      <div className="bg-gray-950 rounded-b-lg border-2 border-t-0 border-gray-800 overflow-auto" style={{ maxHeight: '600px' }}>
        <pre className="p-4 text-sm">
          <code className="text-gray-300">{code}</code>
        </pre>
      </div>
    </div>
  );
}
