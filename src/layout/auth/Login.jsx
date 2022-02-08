import React, { useState } from "react";
import { useParams } from "react-router";
import Loader from "src/components/common/Loader";

import LoginForm from "src/components/ui/LoginForm";
import RegisterForm from "src/components/ui/RegisterForm";
import { useProfession } from "src/hooks/useProfession";
import { useQualities } from "src/hooks/useQualities";
export default function Login() {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );

    const { professions } = useProfession();
    const { qualities } = useQualities();
    const qualitiesList = Object.keys({ ...qualities }).map((quality) => {
        return {
            label: qualities[quality].name,
            value: qualities[quality]._id
        };
    });

    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {formType === "register" ? (
                    professions && qualities ? (
                        <RegisterForm
                            toggleFormType={toggleFormType}
                            professions={professions}
                            qualities={qualitiesList}
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
