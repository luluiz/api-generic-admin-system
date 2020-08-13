
import validate from "mongoose-validator";

class ModelValidators {
    public name = [
        validate({
            validator: 'matches',
            arguments: /^[A-Z]([a-zA-Z]|\.| |-|')+$/, // Apenas letras maiusculas e minusculas
            message: 'Invalid name: A-Z, a-z'
        })
    ];

    public password = [
        validate({
            validator: 'matches',
            passIfEmpty: true,
            arguments: /^(?=.*[a-zA-Z]).{8,30}$/,
            message: 'Invalid password. Must be 8~30 characters.'
        })
    ];

    public email = [
        validate({
            validator: 'matches',
            arguments: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            message: 'Invalid e-mail.'
        }),
        validate({
            validator: 'isLength',
            arguments: [3, 50],
            message: 'Invalid e-mail. Must be between {ARGS[0]} e {ARGS[1]} characters.'
        })
    ];
}

export default new ModelValidators();
