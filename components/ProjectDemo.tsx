'use client'

interface ProjectDemoProps {
  projectId: string;
  demoPath: string;
  title: string;
}

export default function ProjectDemo({ projectId, demoPath, title }: ProjectDemoProps) {
  return (
    <div className="w-full">
      <div className="bg-gray-900 rounded-t-lg px-4 py-2 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-gray-400 text-sm ml-2">{title}</span>
      </div>
      <iframe
        src={demoPath}
        className="w-full bg-white rounded-b-lg border-2 border-t-0 border-gray-300"
        style={{ height: '600px', minHeight: '400px' }}
        title={`${title} Demo`}
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
}
