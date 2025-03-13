import { BrowserRouter, Routes, Route } from 'react-router';
import { Login } from '@pages/Login';
import { Export } from '@pages/Export';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/export" element={<Export />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;