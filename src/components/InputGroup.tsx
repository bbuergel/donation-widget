import React from "react"

const InputGroup = (props: React.PropsWithChildren) => {
    return(
        <div className='input-group'>
            {props.children}
        </div>
    )
}

export default InputGroup