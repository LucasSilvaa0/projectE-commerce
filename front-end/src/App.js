import RoutesApp from "./routes";
import { AuthProvider } from "./context/auth";

export default function App() {
    return (
        <>
            <AuthProvider>
                <RoutesApp />
            </AuthProvider>
        </>
    )
}