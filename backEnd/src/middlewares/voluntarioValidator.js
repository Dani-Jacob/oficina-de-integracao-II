import { body, validationResult } from 'express-validator';

const voluntarioValidationRules = [
    body('nome')
        .notEmpty().withMessage('O nome é obrigatório.')
        .isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres.'),

    body('email')
        .notEmpty().withMessage('O email é obrigatório.')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).withMessage('Formato de email inválido.'),
        
    body('senha')
        .notEmpty().withMessage('A senha é obrigatória.')
        .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.'),

    body('cpf')
        .notEmpty().withMessage('O CPF é obrigatório.')
        .matches(/^\d{11}$/).withMessage('O CPF deve conter exatamente 11 dígitos numéricos.'),

    body('dataNascimento')
        .notEmpty().withMessage('A data de nascimento é obrigatória.')
        .isISO8601().withMessage('A data de nascimento deve estar em formato válido (YYYY-MM-DD).'),

    body('funcao')
        .notEmpty().withMessage('A função é obrigatória.')
        .isIn(['administrador', 'voluntario']).withMessage('O status deve ser "administrador" ou "voluntario".'),

    body('status')
        .notEmpty().withMessage('O status é obrigatório.')
        .isIn(['ativo', 'inativo']).withMessage('O status deve ser "ativo" ou "inativo".'),

    body('dataInicioVoluntariado')
        .notEmpty().withMessage('A data de início do voluntariado é obrigatória.')
        .isISO8601().withMessage('A data de início deve estar em formato válido (YYYY-MM-DD).'),

    body('dataFimVoluntariado')
        .optional({ checkFalsy: true })
        .isISO8601().withMessage('A data de fim deve estar em formato válido (YYYY-MM-DD).'),

    body('curso')
        .notEmpty().withMessage('O curso é obrigatório.'),


    body('certificados')
        .optional()
        .isArray().withMessage('Certificados deve ser um array.'),
    body('certificados.*.horas')
        .if(body('certificados').exists())
        .notEmpty().withMessage('Cada certificado deve ter o campo "horas".')
        .isNumeric().withMessage('O campo "horas" deve ser numérico.'),


    body('oficinas')
        .optional()
        .isArray().withMessage('Oficinas deve ser um array.'),
    body('oficinas.*.nome')
        .if(body('oficinas').exists())
        .notEmpty().withMessage('Cada oficina deve ter o campo "nome".'),
    body('oficinas.*.dataInicio')
        .if(body('oficinas').exists())
        .notEmpty().withMessage('Cada oficina deve ter o campo "dataInicio".')
        .isISO8601().withMessage('O campo "dataInicio" deve estar em formato válido (YYYY-MM-DD).'),
    body('oficinas.*.dataFim')
        .if(body('oficinas').exists())
        .notEmpty().withMessage('Cada oficina deve ter o campo "dataFim".')
        .isISO8601().withMessage('O campo "dataFim" deve estar em formato válido (YYYY-MM-DD).'),
    body('oficinas.*.funcao')
        .if(body('oficinas').exists())
        .notEmpty().withMessage('Cada oficina deve ter o campo "funcao".')
];

const validateVoluntario = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export { voluntarioValidationRules, validateVoluntario };
