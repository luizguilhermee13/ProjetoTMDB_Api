import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="w-screen h-screen bg-gray-600">
            <h1>Login</h1>
            <Link to={"/dashboard"} className="text-white">
                Ir para o Dashboard
            </Link>
        </div>
    );
}
