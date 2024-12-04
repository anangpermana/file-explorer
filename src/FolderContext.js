import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [content, setContent] = useState({ files: [], subfolders: [] });

  const fetchFolders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/folders/1'); // Root folder
      setFolders(response.data.folder.subfolders);
      setSelectedFolder(response.data.folder);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  const fetchFolderContent = async (folderId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/folders/${folderId}`);
      setSelectedFolder(response.data.folder);
      setContent({
        files: response.data.folder.files,
        subfolders: response.data.folder.subfolders,
      });
    } catch (error) {
      console.error('Error fetching folder content:', error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <FolderContext.Provider value={{ folders, selectedFolder, content, fetchFolderContent }}>
      {children}
    </FolderContext.Provider>
  );
};
