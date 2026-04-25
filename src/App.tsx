import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TikTokLayout from './components/TikTokLayout';
import FeedContainer from './pages/FeedContainer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TikTokLayout />}>
        <Route index element={<Navigate to="/channel/pets" replace />} />
        <Route path="channel/pets" element={<FeedContainer />} />
      </Route>
    </Routes>
  );
}

export default App;
