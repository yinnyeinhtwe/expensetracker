import './App.css';
import './index.css';
import Dashboard from './components/Dashboard';
import TransactionPage from './components/TransactionPage';
import AnalyticsPage from './components/AnalyticsPage';
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { GoogleSuccess } from "./pages/GoogleSuccess";

import { useSelector } from 'react-redux';
import SideBar from './components/SideBar';
import { Routes, Route, Outlet } from 'react-router-dom';
 
// import { CounterList } from './components/CounterList';
// import { MovieInput } from './components/MovieInput';
// import { MovieList } from './components/MovieList'; 

function DashboardLayout() {
  return(
    <SideBar>
      <Outlet />
    </SideBar>
  );
}

function App() {
  const expenses = useSelector((state) => state.expense.expenses);
  return (
    <>
      {/* <CounterList /> */}
      {/* <MovieInput />
      <MovieList /> */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
        
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard expense={expenses} />} />
          <Route path="transactions" element={<TransactionPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
