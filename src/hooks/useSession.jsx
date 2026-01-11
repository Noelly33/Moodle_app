import { useEffect, useState } from "react"
import { getSession } from "../services/auth"

export const useSession = () => {
    const [status, setStatus] = useState("loading")
    const [data, setData] = useState(null)
    const [menu, setMenu] = useState([])

    useEffect(() => {
        const getData = async () => {
            const response = await getSession()
            setStatus(response?.status)
            setData(response?.user)
            setMenu(response?.menu || [])
        }
        getData()
    }, [])

    return {
        status,
        data,
        menu,
    }
}