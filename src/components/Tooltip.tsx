import { PropsWithChildren } from "react";

const Tooltip = (props: PropsWithChildren) => {
    return(
        <div className='tooltip'>
            {props.children}
        </div>
    )
}

export default Tooltip