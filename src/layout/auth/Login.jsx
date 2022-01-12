import React, { useEffect, useState } from "react";
import TextField from "src/components/inputs/TextField";
import validator from "../../utils/validator";

export default function Login() {
    const [user, setUser] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    const validatorConfig = {
        email: {
            isRequired: { message: "email is required" },
            isEmail: { message: "invalid email formats" }
        },
        password: {
            isRequired: { message: "password is required" },
            isCapitalSymbol: {
                message:
                    "the password must contain at least one uppercase letter"
            },
            isContainDigit: {
                message: "the password must contain at least one number"
            },
            min: {
                message: "passwords must be at least 8 characters long",
                value: 8
            },
            max: {
                message: "passwords must be up to 15 characters long",
                value: 15
            }
        }
    };

    const validate = () => {
        const errs = validator(user, validatorConfig);
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };
    // check if inputs form is valid
    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [user]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(user);
        setUser({ email: "", password: "" });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6 col-md-8 offset-md-3 shadow p-4">
                    <h3 className="mb-3">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label={"Email"}
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <TextField
                            label={"Password"}
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <button
                            className="btn btn-primary w-100 mx-auto"
                            disabled={!isValid}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
