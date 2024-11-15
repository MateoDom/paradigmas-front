import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout.tsx";
import { Books, Loans, Students } from "./screens";
import { DefaultOptions, QueryClient, QueryClientProvider } from "react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Books /> },
      {
        path: "/students",
        element: <Students />,
      },
      {
        path: "/loans",
        element: <Loans />,
      },
    ],
  },
]);

const defaultQueryOptions: DefaultOptions = {
  queries: {
    refetchInterval: false,
    retry: 1,
    refetchOnWindowFocus: false,
  },
};

const queryClient = new QueryClient({
  defaultOptions: defaultQueryOptions,
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
