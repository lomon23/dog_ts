import React from 'react';

interface LabelWithInputProps {
    type: string;
    labelText: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelWithInput: React.FC<LabelWithInputProps> = ({ type, labelText, name, value, onChange }) => {
    return <>
        <label>
            {labelText}:
            <br />
            <input 
                type={type} 
                name={name} 
                value={value} 
                onChange={onChange} 
                required 
                placeholder={`Enter ${labelText.toLowerCase()}`} 
            />
            <br />
        </label>
        </>
};

export default LabelWithInput;
