import React from "react";
import PropTypes from "prop-types";
import CheckBoxField from "../common/form/CheckBoxField";
import Form from "../common/form/Form";
import TextField from "../common/form/TextField";
import SubmitButton from "../common/form/SubmitButton";

export default function LoginForm({ toggleFormType }) {
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
    return (
        <div className="col-lg-6 col-md-8 offset-md-3 shadow p-4">
            <h3 className="mb-3">Login</h3>
            <Form validatorConfig={validatorConfig}>
                <TextField key="email_input" />
                <TextField key="password_input" />
                <CheckBoxField key="checkbox_stayOn">
                    Stay logged in
                </CheckBoxField>
                <SubmitButton
                    key="submit_button"
                />
            </Form>
            <p className="mb-0">
                Dont have an account?
                <a className="ms-2" role="button" onClick={toggleFormType}>
                    Sign Up
                </a>
            </p>
        </div>
    );
}

LoginForm.propTypes = {
    toggleFormType: PropTypes.func.isRequired
};
