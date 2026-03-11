import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import TaxIntake from './pages/TaxIntake';
import StatusTracker from './pages/StatusTracker';
import Messages from './pages/Messages';
import DocumentCenter from './pages/DocumentCenter';
import TaxReturn from './pages/TaxReturn';
import Insights from './pages/Insights';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/status-tracker" replace />} />
          <Route path="tax-intake" element={<TaxIntake />} />
          <Route path="status-tracker" element={<StatusTracker />} />
          <Route path="messages" element={<Messages />} />
          <Route path="document-center" element={<DocumentCenter />} />
          <Route path="tax-return" element={<TaxReturn />} />
          <Route path="insights" element={<Insights />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
