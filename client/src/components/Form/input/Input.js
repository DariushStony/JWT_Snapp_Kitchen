import React from 'react';


const Input = ({type, placeholder, ...rest}) => {


    return (
        <input
            type={type}
            placeholder={placeholder}
            {...rest}
        />
    );
};

export default Input;