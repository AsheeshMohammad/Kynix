import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="App">
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastStyle={{
            backgroundColor: '#000',
            color: '#fff',
            border: '1px solid #333'
          }}
        />
      </div>
    </Router>
  );
}

export default App;
