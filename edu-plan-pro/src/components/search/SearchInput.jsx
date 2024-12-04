import React, { useState } from 'react';

const SearchInput = ({ onSearch, className, inputStyle, disabled }) => {
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
                className={className}  
                style={{
                    ...inputStyle,
                    textAlign: 'center',
                    fontSize: '0.9vw',
                    fontWeight: '1'
                }}  
                disabled={disabled}
            />
        </div>
    );
};

export default SearchInput;
