import React from 'react';

const SearchInput = ({ onSearch, className, inputStyle, filter, setFilter }) => {

    const handleInputChange = (event) => {
        setFilter(event.target.value);
    };

    const handleBlur = () => {
        if (onSearch) {
            onSearch(filter);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && onSearch) {
            onSearch(filter);
        }
    };

    return (
        <div>
            <input
                
                type="text"
                value={filter}
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
            />
        </div>
    );
};

export default SearchInput;
