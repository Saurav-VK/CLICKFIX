import './App.css'
import VehicleAdminPage from './pages/AdminPages/VehicleAdminPage/VehicleAdminPage';
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer autoClose={3000} hideProgressBar={false} pauseOnHover draggable/>
    <AppRoutes/>   *
    </>
  )
}

export default App
