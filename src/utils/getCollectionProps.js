import PropTypes from "prop-types";

export default function getCollectionProps(
    data,
    selectName,
    buttonName,
    professions,
    qualities,
    isValid,
    errors,
    optimisedHandleChange,
    handleKeyDown
) {
    return {
        ".$email_input": () => ({
            label: "Email",
            value: data.email,
            name: "email",
            onChange: optimisedHandleChange,
            onKeyDown: handleKeyDown,
            error: errors.email
        }),
        ".$name_input": () => ({
            label: "Name",
            value: data.name,
            name: "name",
            onChange: optimisedHandleChange,
            onKeyDown: handleKeyDown,
            error: errors.name
        }),
        ".$textarea_input": () => ({
            label: "Message",
            value: data.content,
            name: "content",
            onChange: optimisedHandleChange,
            onKeyDown: handleKeyDown,
            error: errors.content
        }),
        ".$password_input": () => ({
            label: "Password",
            value: data.password,
            name: "password",
            type: "password",
            onChange: optimisedHandleChange,
            onKeyDown: handleKeyDown,
            error: errors.password
        }),
        ".$image_input": () => ({
            label: "Image",
            value: data.image,
            name: "image",
            onChange: optimisedHandleChange,
            onKeyDown: handleKeyDown,
            error: errors.image
        }),
        ".$select": () => ({
            name: selectName,
            options: professions,
            value: selectName ? data.userName.name : data.profession.name,
            onChange: optimisedHandleChange,
            onKeyDown: handleKeyDown,
            error: errors.profession
        }),
        ".$radio": () => ({
            label: "Sex",
            value: data.sex,
            name: "sex",
            onChange: optimisedHandleChange,
            onKeyDown: handleKeyDown
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
            onChange: optimisedHandleChange,
            onKeyDown: handleKeyDown,
            error: errors.qualities
        }),
        ".$checkbox_license": () => ({
            name: "license",
            value: data.license,
            onChange: optimisedHandleChange,
            onKeyDown: handleKeyDown,
            error: errors.license
        }),
        ".$checkbox_stayOn": () => ({
            name: "stayOn",
            value: data.stayOn,
            onChange: optimisedHandleChange,
            onKeyDown: handleKeyDown,
            error: errors.stayOn
        }),
        ".$submit_button": () => ({
            name: buttonName,
            valid: isValid
        })
    };
}

getCollectionProps.propTypes = {
    data: PropTypes.object,
    selectName: PropTypes.string,
    buttonName: PropTypes.string,
    professions: PropTypes.array,
    qualities: PropTypes.array,
    isValid: PropTypes.bool,
    errors: PropTypes.array,
    optimisedHandleChange: PropTypes.func,
    handleKeyDown: PropTypes.func
};
