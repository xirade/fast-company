import React, { useEffect } from "react";
import Loader from "src/components/common/Loader";
import { useAuth } from "src/hooks/useAuth";

export default function Logout() {
    const { logOut } = useAuth();
    useEffect(() => {
        logOut();
    }, []);
    return <Loader />;
}
