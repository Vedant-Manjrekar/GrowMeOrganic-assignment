import { Route, Routes } from 'react-router-dom';
import './App.css';
import Form from './components/form/Form';
import SecondPage from './components/secondPage/SecondPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Form />} path="/" />
        <Route element={<SecondPage />} path="/second-page" />
      </Routes>
    </div>
  );
}

export default App;
