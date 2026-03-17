export const validationForm = (formData, requiredFields) => {

    let newErrors = {};

    requiredFields.forEach((field) => {

        if (!formData[field]) {
            newErrors[field] = field + " is required";
        }

    });

    return newErrors;

};