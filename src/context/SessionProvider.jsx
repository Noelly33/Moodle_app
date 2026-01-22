import { createContext, useState, useEffect } from "react";
import { getSession, signIn, signOut } from "../repository/auth";

export const AuthContext = createContext(null);

export default function SessionProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState("loading");
    const [menu, setMenu] = useState([]);

    const login = async (email, password) => {
        const res = await signIn({
            email: email,
            password: password,
        });

        if (res.status === "success") {
            if (res?.dobleFactor) {
                return res
            }
            setLoading("authorized");
            setUser(res.user);
            setMenu(res.menu);
            return {
                status: "success",
                user: res.user,
            };
        }

        return {
            status: "error",
            message: res?.message,
        };
    };

    const obtenerSession = async () => {
        const credential = await getSession();

        if (credential.status == "unauthorized") {
            setUser(null);
            setMenu([])
            setLoading("unauthorized");
            return;
        }

        if (credential) {
            setUser(credential.user);
            setMenu(credential.menu);
            setLoading("authorized");
            return;
        }
        setUser(null);
        setLoading("unauthorized");
    };

    const logout = async () => {
        const res = await signOut();
        if (res.status === "success") {
            setUser(null);
            setMenu([])
            setLoading("unauthorized");
        }
    }

    useEffect(() => {
        obtenerSession();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading,
                login,
                menu,
                logout,
                // validateCodigo,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
