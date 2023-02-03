import { PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
    className?: string
    onClick?(): void
}

const Button = (props: ButtonProps) => {
    const classes = 'button ' + props.className
    return(
        <button className={classes} onClick={props.onClick}>{props.children}</button>
    )
}

export default Button