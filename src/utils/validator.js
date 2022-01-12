export default function validator(data, config) {
    let errors = {};
    const validate = (method, data, conf) => {
        let statusValidate;
        switch (method) {
            case "isRequired":
                statusValidate = data.trim() === "";
                break;

            case "isEmail":
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRegExp.test(data);
                break;

            case "isCapitalSymbol":
                const capitalRegExp = /[A-Z]+/g;
                statusValidate = !capitalRegExp.test(data);
                break;

            case "isContainDigit":
                const digitRegExp = /\d+/g;
                statusValidate = !digitRegExp.test(data);
                break;

            case "min":
                statusValidate = data.length < conf.value;
                break;

            case "max":
                statusValidate = data.length > conf.value;
                break;

            default:
                break;
        }
        if (statusValidate) {
            return conf.message;
        }
    };

    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );

            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }

    return errors;
}
