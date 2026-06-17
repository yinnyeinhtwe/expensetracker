import './App.css';
import './index.css';
import Dashboard from './components/Dashboard';
import TransactionPage from './components/TransactionPage';
import AnalyticsPage from './components/AnalyticsPage';
import { useSelector } from 'react-redux';
import SideBar from './components/SideBar';
import { Routes, Route } from 'react-router-dom';
 
// import { CounterList } from './components/CounterList';
// import { MovieInput } from './components/MovieInput';
// import { MovieList } from './components/MovieList'; 

function App() {
  const expenses = useSelector((state) => state.expense.expenses);
  return (
    <>
      {/* <CounterList /> */}
      {/* <MovieInput />
      <MovieList /> */}
      <SideBar>
        <Routes>
            {/* Pass the extracted array to your list component */}
              
              <Route path="/" element={<Dashboard expense={expenses} />} />
              <Route path="transactions" element={<TransactionPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
        </Routes>
      </SideBar>

    </>
  );
}

export default App
