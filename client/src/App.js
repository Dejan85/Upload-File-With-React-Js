import React from 'react';
import './App.css';

// component
import FileUpload from '../src/components/FileUpload';

const App = () => {
  return (
    <div className="container mt-4">
      <h4 className="display-4 text-center mb-4">
        <i className="fab fa-react" /> React File Upload
      </h4>
      <FileUpload />
    </div>
  );
}

export default App;
