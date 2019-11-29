import * as yup from 'yup';

export const incrementClicksValidation = yup.object().shape({
    team: yup
        .string()
        .min(2)
        .max(20)
        .required(),
    session: yup
        .string()
        .min(4)
        .required(),
    clicks: yup.number().required(),
});
