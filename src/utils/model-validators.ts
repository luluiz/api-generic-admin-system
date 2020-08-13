
import { validate } from "mongoose-validator";

class ModelValidators {
    constructor() { }

    public name() {
        return [
            validate({
                validator: 'matches',
                arguments: /^[A-Z]([a-zA-Z]|\.| |-|')+$/, // Apenas letras maiusculas e minusculas
                message: 'Invalid name: A-Z, a-z'
            })
        ];
    }

    public password() {
        return [
            validate({
                validator: 'matches',
                passIfEmpty: true,
                arguments: /^(?=.*[a-zA-Z]).{8,30}$/,
                message: 'Invalid password. Must be 8~30 characters.'
            })
        ];
    }

    public email() {
        return [
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
}

export default new ModelValidators();
