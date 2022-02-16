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
import { useHistory } from "react-router-dom";
import getCollectionProps from "src/utils/getCollectionProps";
import { useAuth } from "src/hooks/useAuth";
import { nanoid } from "nanoid";
import { useProfession } from "src/hooks/useProfession";

const initialData = {
    email: "",
    password: "",
    name: "",
    userName: "",
    content: "",
    profession: "",
    image: "",
    sex: "male",
    qualities: [],
    license: false,
    stayOn: false
};

function Form({
    children,
    user,
    userId,
    actionType,
    submitMethod,
    buttonName,
    validatorConfig,
    qualities,
    professions,
    selectName
}) {
    const { getProfession } = useProfession();
    const history = useHistory();
    const { currentUser, changeEmail } = useAuth();
    const arrayChildren = Children.toArray(children);
    const [data, setData] = useState(
        user
            ? {
                email: user.email,
                password: user.password || "",
                name: user.name,
                content: user.content || "",
                profession: getProfession(user.profession),
                image: user.image || "",
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

    function handleSubmit(e) {
        e.preventDefault();
        const isValid = validate(data);

        if (!isValid) return;
        switch (actionType) {
        case "LOGIN":
            submitMethod({
                email: data.email,
                password: data.password
            }).then(() => {
                history.push(
                    history.location.state
                        ? history.location.state.from.pathname
                        : "/"
                );
            });
            break;
        case "REGISTER":
            submitMethod({
                email: data.email,
                name: data.name,
                password: data.password,
                profession: data.profession._id,
                qualities: data.qualities,
                license: data.license,
                sex: data.sex
            }).then(() => {
                history.push(
                    history.location.state
                        ? history.location.state.from.pathname
                        : "/"
                );
            });
            break;
        case "UPDATE_PROFILE":
            submitMethod({
                email: data.email,
                name: data.name,
                sex: data.sex,
                image: data.image,
                profession: data.profession._id,
                qualities: data.qualities
            }).then(() => {
                if (data.email !== currentUser.email) {
                    changeEmail(data.email);
                }
                history.push(`/users/${userId}`);
            });
            break;
        case "SEND_COMMENT":
            submitMethod({
                content: data.content,
                pageId: userId,
                userId: currentUser._id,
                _id: nanoid(),
                created_at: Date.now()
            });
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
        setErrors({});
    }
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
    actionType: ""
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
    actionType: PropTypes.string,
    submitMethod: PropTypes.func,
    type: PropTypes.string,
    selectName: PropTypes.string
};

export default React.memo(Form);
