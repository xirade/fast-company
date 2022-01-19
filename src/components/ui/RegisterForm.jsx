import React from "react";
import PropTypes from "prop-types";
import SelectedField from "../common/form/SelectedField";
import RadioField from "../common/form/RadioField";
import MultiSelect from "../common/form/MultiSelect";
import CheckBoxField from "../common/form/CheckBoxField";
import Form from "../common/form/Form";
import TextField from "../common/form/TextField";
import Loader from "../common/Loader";

export default function RegisterForm({
    toggleFormType,
    professions,
    qualities
}) {
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
        },
        profession: {
            isRequired: { message: "Profession is required" }
        },
        qualities: {
            isRequired: { message: "qualities is required" }
        },
        license: {
            isRequired: {
                message:
                    "You cannot use this service without confirming the license agreement"
            }
        }
    };
    return professions && qualities ? (
        <div className="col-lg-6 col-md-8 offset-md-3 shadow p-4">
            <h3 className="mb-3">Register</h3>
            <Form
                professions={professions}
                qualities={qualities}
                validatorConfig={validatorConfig}
            >
                <TextField key="email_input" />
                <TextField key="password_input" />
                <SelectedField key="select" />
                <RadioField key="radio" />
                <MultiSelect key="multiselect" />
                <CheckBoxField key="checkbox_license">
                    Confirm <a href="#">license agreement</a>
                </CheckBoxField>
            </Form>
            <p className="mb-0">
                Already have account?
                <a role="button" className="ms-2" onClick={toggleFormType}>
                    Sign In
                </a>
            </p>
        </div>
    ) : (
        <Loader />
    );
}

RegisterForm.propTypes = {
    toggleFormType: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    profession: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string,
    professions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    qualities: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
