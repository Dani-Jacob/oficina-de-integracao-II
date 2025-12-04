import style from './Radio.module.css';

function Radio({ label, name, register, errors, options, validationRules, className, ...rest }) {
    return (
        <div className={`${style.Radio} ${className}`} >
            <label htmlFor={name} >{label}</label>
            <span className={style.radioOptions}>
            {options.map((option) => (
                <span>
                    <input type='radio' value={option.value} {...register(name, validationRules)} {...rest} />
                    <label htmlFor={option.value}>{option.label}</label>
                </span>
            ))}
            </span>
            {errors[name] && <span className={style.errorMessage}>{errors[name].message}</span>}
        </div>
    );
}

export default Radio;
