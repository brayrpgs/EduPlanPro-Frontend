import React, { useState } from 'react';

const SearchInput = ({ onSearch, inputClassName, inputStyle, disabled }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleBlur = () => {
        if (onSearch) {
            onSearch(query);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && onSearch) {
            onSearch(query);
        }
    };

    return (
        <div>
            <input
                
                type="text"
                value={query}
                onChange={handleInputChange}
                onBlur={handleBlur} 
                onKeyDown={handleKeyDown}
                className={inputClassName}  
                style={{
                    ...inputStyle,
                    textAlign: 'center'  
                }}  
                disabled={disabled}
            />
        </div>
    );
};

export default SearchInput;
