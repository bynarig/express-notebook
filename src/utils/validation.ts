import Joi from 'joi';

export default function (
    method: string,
    url: string,
    body: ReadableStream<Uint8Array> | null
) {
    if (method === 'POST') {
        // register validation errors
        if (url == '/register') {
            const { error } = userValidationRegister.validate({ body });
            if (error) throw error;
        }
        // login validation errors
        else if (url == '/login') {
            const { error } = userValidationLogin.validate({ body });
            if (error) throw error;
        }
    } else if (method === 'PUT') {
        // the route does not exist now
    } else if (method === 'DELETE') {
        // the route does not exist now
    }
}

// register validation
const userValidationRegister = Joi.object({
    body: Joi.object({
        username: Joi.string().required().max(15).alphanum(),
        password: Joi.string().required().min(4),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
    }),
});

// login validation
const userValidationLogin = Joi.object({
    body: Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        password: Joi.string().required(),
    }),
});
