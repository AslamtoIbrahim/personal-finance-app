import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import { data } from "./features/dashboard/components/app-sidebar";
import Budgets from "./features/dashboard/page/budgets";
import Dashboard from './features/dashboard/page/dashboard';
import Overview from "./features/dashboard/page/overview";
import Transactions from "./features/dashboard/page/transactions";
import Pots from "./features/dashboard/page/pots";
import Recurring from "./features/dashboard/page/recurring";
import { Provider } from 'react-redux'
import { store } from "./store/store";
import { Toaster } from "sonner";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Navigate to={data.items[0].url} />
      },
      {

        path: data.items[0].url,
        element: <Overview />
      },
      {
        path: data.items[1].url,
        element: <Transactions />
      },
      {
        path: data.items[2].url,
        element: <Budgets />
      },
      {
        path: data.items[3].url,
        element: <Pots />
      },
      {
        path: data.items[4].url,
        element: <Recurring />
      },
    ]
  }
])

function App() {
  return (
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
