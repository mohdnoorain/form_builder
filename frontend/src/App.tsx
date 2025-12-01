import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import FormBuilder from './pages/form/form'

const queryClient = new QueryClient();
import { createBrowserRouter, NavLink, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";
import FormTable from './pages/formTable/FormTable';
import SubmissionTable from './pages/submissionTable/SubmissionTable';
import { ButtonGroup } from './components/ui/button-group';
import { Button } from './components/ui/button';

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <ButtonGroup className="mb-5">
        <Button variant={"outline"} asChild>
          <NavLink to={"/forms"}>Forms</NavLink>
        </Button>
        <Button variant={"outline"} asChild>
          <NavLink to={"/submissions"}>All Submissions</NavLink>
        </Button>
      </ButtonGroup>
      <Outlet />
    </>,
    children: [
      {
        path: "/forms",
        element: <FormTable />,
      },
      {
        path: "/submissions",
        element: <SubmissionTable />,
      },
    ]
  },
  {
    path: "/dynamicStepForm",
    element: <FormBuilder />,
  },
]);
function App() {

  return (
    <QueryClientProvider client={queryClient} >
      <div className="h-[100vh] flex flex-col justify-center items-center">

        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  )
}

export default App
