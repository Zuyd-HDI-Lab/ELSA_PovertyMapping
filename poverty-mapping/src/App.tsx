import './App.css'
import { Routes, Route } from 'react-router-dom';
import TimeChartPage from './pages/TimeChartPage';
import Page2 from './pages/Page2'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Page2 />} />
      <Route path="/timechartpage" element={<TimeChartPage />} />
    </Routes>

  )
}

export default App
