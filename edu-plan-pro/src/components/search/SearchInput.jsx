import React from 'react';

const SearchInput = ({ onSearch, className, inputStyle, filter, setFilter }) => {

    const handleInputChange = (event) => {
        setFilter(event.target.value);
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
