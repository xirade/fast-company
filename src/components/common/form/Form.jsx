import React, {
    Children,
    useState,
    useEffect,
    cloneElement,
    isValidElement,
    useCallback
} from "react";
import PropTypes from "prop-types";
import validator from "../../../utils/validator";
import api from "../../../api";
import { useHistory } from "react-router";
import getCollectionProps from "src/utils/getCollectionProps";

const initialData = {
    email: "",
    password: "",
    name: "",
    userName: "",
    content: "",
    profession: "",
    img: "",
    sex: "male",
    qualities: [],
    license: false,
    stayOn: false
};

function Form({
    children,
    user,
    userId,
    delay,
    actionType,
    buttonName,
    updateComments,
    validatorConfig,
    qualities,
    professions,
    selectName
}) {
    const history = useHistory();
    const arrayChildren = Children.toArray(children);
    const [data, setData] = useState(
        user
            ? {
                email: user.email,
                password: user.password,
                name: user.name,
                content: user.content,
                profession: user.profession,
                img: user.img,
                sex: user.sex,
                qualities: user.qualities,
                license: false,
                stayOn: false
            }
            : initialData
    );
    const [errors, setErrors] = useState({});
    const validate = useCallback(
        (data) => {
            const errs = validator(data, validatorConfig);
            setErrors(errs);
            return Object.keys(errs).length === 0;
        },
        [validatorConfig, setErrors]
    );
    // check if inputs form is valid
    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate(data);
    }, [data]);

    const handleKeyDown = useCallback((event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            const form = event.target.form;
            const indexField = Array.prototype.indexOf.call(form, event.target);
            form.elements[indexField + 1].focus();
        }
    }, []);

    // optimization textfields with debounce
    const handleChange = useCallback(
        ({ name, value }) => {
            setData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        },
        [setData]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate(data);

        if (!isValid) return;
        switch (actionType) {
        case "UPDATE_PROFILE":
            api.users.update(userId, {
                email: data.email,
                name: data.name,
                sex: data.sex,
                img: data.img,
                profession: data.profession,
                qualities: data.qualities
            });
            history.push(`/users/${userId}`);
            break;
        case "SEND_COMMENT":
            api.comments.add({
                pageId: userId,
                userId: data.userName._id,
                content: data.content
            }).then(comment => updateComments(comment));
            break;

        default:
            break;
        }

        Array.from(document.querySelectorAll(".form-control")).forEach(
            (input) => {
                input.value = "";
            }
        );

        setData(initialData);
    };
    // props for fields
    const collectionProps = getCollectionProps(
        data,
        selectName,
        buttonName,
        professions,
        qualities,
        isValid,
        errors,
        handleChange,
        handleKeyDown
    );

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
        </form>
    );
}

Form.defaultProps = {
    buttonName: "Submit",
    actionType: "LOGIN"
};

Form.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    buttonName: PropTypes.string.isRequired,
    delay: PropTypes.number,
    validatorConfig: PropTypes.object.isRequired,
    professions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    qualities: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    user: PropTypes.object,
    userId: PropTypes.string,
    actionType: PropTypes.string,
    type: PropTypes.string,
    selectName: PropTypes.string,
    updateComments: PropTypes.func
};

export default React.memo(Form);
