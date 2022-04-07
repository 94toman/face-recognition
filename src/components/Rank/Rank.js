import React from "react";

const Rank = ({name, entries}) =>{
    // To display a number of user entries from the db
    return (
        <div>
            <div className='white f3'>
                {`${name}, your current entry count is:`}
            </div>            
            <div className='white f1'>
                {entries}
            </div>            
        </div>
    )
}

export default Rank;