import { PropsWithChildren } from 'react'

interface ProgressCardProps {
    percentProgress: number
}

const ProgressCard = (props: PropsWithChildren<ProgressCardProps>) => {
    return(
        <div className='card progress-card'>
            <div className='progress-indicator'>
                <span className='progress-amount' style={{width: `${props.percentProgress}%`}}></span>
            </div>
            <div className='card-inner'>
                {props.children}
            </div>
        </div>
    )
}

export default ProgressCard