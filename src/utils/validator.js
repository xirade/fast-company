export default function validator(data, config) {
    const errors = {};
    const validate = (method, data, conf) => {
        const statusValidate = {
            isRequired: () => {
                if (typeof data === "boolean") return !data;
                if (typeof data === "object" || Array.isArray(data)) {
                    return Object.keys({ ...data }).length === 0;
                }

                return data.trim() === "";
            },
            isEmail: () => !/^\S+@\S+\.\S+$/g.test(data),
            isImage: () => !/((https?:\/\/)?[^\s.]+\.[\w][^\s]+)/g.test(data),
            isCapitalSymbol: () => !/[A-Z]+/g.test(data),
            isContainDigit: () => !/\d+/g.test(data),
            min: () => data.length < conf.value,
            max: () => data.length > conf.value
        };
        const isValid = statusValidate[method]();
        if (isValid) {
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
