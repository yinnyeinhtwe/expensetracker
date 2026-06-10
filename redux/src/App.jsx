import './App.css';
import './index.css';
import { ExpenseList } from './components/ExpenseList';
import { useSelector } from 'react-redux';
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
      <div>
            {/* Pass the extracted array to your list component */}
            <ExpenseList expenses={expenses} />
        </div>
    </>
  );
}

export default App
