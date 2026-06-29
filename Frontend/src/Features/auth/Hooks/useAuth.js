import { useContext } from "react";
import { authContext } from "../auth.context";
import { login, register, logout, getme } from "../service/auth.api";
import { useEffect } from "react";

export const useauth = () => {

    const context = useContext(authContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data.user)
            return true
        } catch (err) {
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (err) {

        } finally {
            setLoading(false)
        }

    }

    const handleLogout = async () => {

        setLoading(true)
        try {

            const data = await logout()
            setUser(null)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }



    useEffect(() => {
        const getandSetUser = async () => {
            try {
                const data = await getme();
                if (data && data.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        getandSetUser();
    }, []);




    return { user, loading, handleLogin, handleRegister };
}



