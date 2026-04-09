import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewDealSetup from './pages/NewDealSetup';
import DealRoomHome from './pages/DealRoomHome';
import PrepSheet from './pages/PrepSheet';
import MeetingRoom from './pages/MeetingRoom';
import ActionItems from './pages/ActionItems';
import ICMemo from './pages/ICMemo';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deals/new" element={<NewDealSetup />} />
          <Route path="/deals/:dealId" element={<DealRoomHome />} />
          <Route path="/deals/:dealId/prep-sheet" element={<PrepSheet />} />
          <Route path="/deals/:dealId/meeting-room" element={<MeetingRoom />} />
          <Route path="/deals/:dealId/action-items" element={<ActionItems />} />
          <Route path="/deals/:dealId/ic-memo" element={<ICMemo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
