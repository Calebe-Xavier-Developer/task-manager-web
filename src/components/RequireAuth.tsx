import { Navigate } from "react-router-dom";
import { getToken } from "~/services/auth";


interface Props {
    children: React.ReactNode;
}

const RequireAuth = ({ children }: Props) => {
    const token = getToken();
    return token ? <>children</> : <Navigate to="/login" />;

}

export default RequireAuth;