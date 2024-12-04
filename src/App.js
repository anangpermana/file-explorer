import React, { useContext } from 'react';
import { FolderProvider, FolderContext } from './FolderContext';

const Sidebar = () => {
  const { folders, fetchFolderContent } = useContext(FolderContext);

  return (
    <div className="w-1/4 bg-gray-100 p-4 h-screen overflow-y-auto">
      <h2 className="font-bold text-lg mb-4">Folders</h2>
      <ul>
        {folders.map((folder) => (
          <li
            key={folder.id}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded"
            onClick={() => fetchFolderContent(folder.id)}
          >
            {folder.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const FolderContent = () => {
  const { selectedFolder, content } = useContext(FolderContext);

  return (
    <div className="w-3/4 p-4">
      {selectedFolder ? (
        <>
          <h2 className="font-bold text-lg mb-4">{selectedFolder.name}</h2>
          <div>
            <h3 className="font-semibold mb-2">Subfolders</h3>
            <ul className="grid grid-cols-4 gap-4">
              {content.subfolders.map((subfolder) => (
                <li key={subfolder.id} className="bg-gray-200 p-2 rounded">
                  {subfolder.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Files</h3>
            <ul className="grid grid-cols-4 gap-4">
              {content.files.map((file) => (
                <li key={file.id} className="bg-blue-200 p-2 rounded">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Select a folder to view its content.</p>
      )}
    </div>
  );
};

const App = () => (
  <FolderProvider>
    <div className="flex">
      <Sidebar />
      <FolderContent />
    </div>
  </FolderProvider>
);

export default App;
