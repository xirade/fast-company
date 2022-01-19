import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../api";
import Loader from "src/components/common/Loader";

import LoginForm from "src/components/ui/LoginForm";
import RegisterForm from "src/components/ui/RegisterForm";
export default function Login() {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );

    const [professions, setProfessions] = useState(null);
    const [qualities, setQuelities] = useState(null);

    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    useEffect(() => {
        let isSub = true;
        api.professions
            .fetchAll()
            .then((data) => (isSub ? setProfessions(data) : null));
        api.qualities.fetchAll().then((data) =>
            isSub
                ? setQuelities(
                    Object.keys({ ...data }).map((quality) => {
                        return {
                            label: data[quality].name,
                            value: data[quality]._id
                        };
                    })
                )
                : null
        );

        return () => (isSub = false);
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                {formType === "register" ? (
                    professions && qualities ? (
                        <RegisterForm
                            toggleFormType={toggleFormType}
                            professions={professions}
                            qualities={qualities}
                        />
                    ) : (
                        <div className="mx-auto">
                            <Loader />
                        </div>
                    )
                ) : (
                    <LoginForm toggleFormType={toggleFormType} />
                )}
            </div>
        </div>
    );
}
