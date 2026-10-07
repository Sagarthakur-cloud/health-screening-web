import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import PatientRegistration from './screens/PatientRegistration';
import ScreeningSelection from './screens/ScreeningSelection';
import CameraScreen from './screens/CameraScreen';
import QualityCheckScreen from './screens/QualityCheckScreen';
import AnalysisScreen from './screens/AnalysisScreen';
import ResultScreen from './screens/ResultScreen';
import ReferralScreen from './screens/ReferralScreen';
import HistoryScreen from './screens/HistoryScreen';
import OfflineSyncScreen from './screens/OfflineSyncScreen';
import ProfileScreen from './screens/ProfileScreen';


export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/register" element={<PatientRegistration />} />
          <Route path="/select-screening" element={<ScreeningSelection />} />
          <Route path="/camera" element={<CameraScreen />} />
          <Route path="/quality-check" element={<QualityCheckScreen />} />
          <Route path="/analysis" element={<AnalysisScreen />} />
          <Route path="/result" element={<ResultScreen />} />
          <Route path="/referral" element={<ReferralScreen />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/sync" element={<OfflineSyncScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}