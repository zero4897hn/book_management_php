import React from 'react';

const Border = (props) => {
    return (
        <div className="row mt-3 mb-3 p-3 border border-secondary rounded">
            {props.children}
        </div>
    );
}

export default Border;
