import RouterProvider from "./RouterProvider";
import { AuthProvider } from "./AuthProvider";

function AppProvider({ children }) {
  return (
    <RouterProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </RouterProvider>
  );
}

export default AppProvider;