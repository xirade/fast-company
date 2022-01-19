import React, {
    Children,
    useState,
    useEffect,
    cloneElement,
    isValidElement
} from "react";
import PropTypes from "prop-types";
import validator from "../../../utils/validator";
import api from "../../../api";
import { useHistory } from "react-router";

export default function Form({
    children,
    user,
    userId,
    urlType,
    buttonName,
    validatorConfig,
    qualities,
    professions
}) {
    const history = useHistory();
    const arrayChildren = Children.toArray(children);
    const [data, setData] = useState(
        user
            ? {
                email: user.email,
                password: user.password,
                name: user.name,
                profession: user.profession,
                img: user.img,
                sex: user.sex,
                qualities: user.qualities,
                license: false,
                stayOn: false
            }
            : {
                email: "",
                password: "",
                name: "",
                profession: "",
                img: "",
                sex: "male",
                qualities: [],
                license: false,
                stayOn: false
            }
    );
    const [errors, setErrors] = useState({});
    const validate = () => {
        const errs = validator(data, validatorConfig);
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };
    // check if inputs form is valid
    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = ({ name, value }) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();

        if (!isValid) return;
        if (urlType === `/users/${userId}`) {
            api.users.update(userId, {
                email: data.email,
                name: data.name,
                sex: data.sex,
                img: data.img,
                profession: data.profession,
                qualities: data.qualities
            });
        }

        setData({
            email: "",
            password: "",
            name: "",
            profession: "",
            sex: "male",
            img: "",
            qualities: [],
            license: false,
            stayOn: false
        });
        history.push(urlType);
    };
    // props for fields
    const collectionProps = {
        ".$email_input": () => ({
            label: "Email",
            value: data.email,
            name: "email",
            onChange: handleChange,
            error: errors.email
        }),
        ".$name_input": () => ({
            label: "Name",
            value: data.name,
            name: "name",
            onChange: handleChange,
            error: errors.name
        }),
        ".$password_input": () => ({
            label: "Password",
            value: data.password,
            name: "password",
            type: "password",
            onChange: handleChange,
            error: errors.password
        }),
        ".$image_input": () => ({
            label: "Image",
            value: data.img,
            name: "img",
            onChange: handleChange,
            error: errors.img
        }),
        ".$select": () => ({
            label: "Profession",
            name: "profession",
            options: professions,
            value: data.profession.name,
            onChange: handleChange,
            error: errors.profession
        }),
        ".$radio": () => ({
            label: "Sex",
            value: data.sex,
            name: "sex",
            onChange: handleChange
        }),
        ".$multiselect": () => ({
            label: "Choose your qualities",
            name: "qualities",
            options: qualities,
            defaultValue: data.qualities.map((quality) => ({
                value: quality._id,
                label: quality.name,
                color: quality
            })),
            onChange: handleChange,
            error: errors.qualities
        }),
        ".$checkbox_license": () => ({
            name: "license",
            value: data.license,
            onChange: handleChange,
            error: errors.license
        }),
        ".$checkbox_stayOn": () => ({
            name: "stayOn",
            value: data.stayOn,
            onChange: handleChange,
            error: errors.stayOn
        })
    };

    // check validation of children & adding props
    const addPropsToElement = (element, props) => {
        if (isValidElement(element)) {
            return cloneElement(element, props);
        }
        return element;
    };

    const addPropsToChildren = (children, props) => {
        if (!Array.isArray(children)) {
            return addPropsToElement(children, props);
        }
        return children.map((childElement) =>
            addPropsToElement(childElement, props)
        );
    };
    return (
        <form onSubmit={handleSubmit}>
            {Children.map(arrayChildren, (child) => {
                const currProps = collectionProps[child.key]();
                return addPropsToChildren(child, currProps);
            })}
            <button
                className="btn btn-primary w-100 mb-2 mx-auto"
                disabled={!isValid}
            >
                {buttonName}
            </button>
        </form>
    );
}

Form.defaultProps = {
    buttonName: "Submit",
    urlType: "/login"
};

Form.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    buttonName: PropTypes.string.isRequired,
    validatorConfig: PropTypes.object.isRequired,
    professions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    qualities: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    user: PropTypes.object,
    userId: PropTypes.string,
    urlType: PropTypes.string,
    type: PropTypes.string
};
