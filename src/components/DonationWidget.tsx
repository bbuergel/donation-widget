import React, { useState } from 'react'
import ProgressCard from './ProgressCard'
import InputGroup from './InputGroup'
import Button from './Button'
import Tooltip from './Tooltip'

interface Donation {
    donorId: string
    donationAmount: number
}

interface DonationWidgetProps {
    donationGoal: number
    minDonation: number
}

const DonationWidget: React.FC<DonationWidgetProps> = ({donationGoal, minDonation}) => {
    const [donations, setDonations] = useState<Donation[]>([
        {
            donorId: Math.random().toString(),
            donationAmount: 3600
        },
        {
            donorId: Math.random().toString(),
            donationAmount: 150
        }
    ])
    const [enteredDonation, setEnteredDonation] = useState<string>('50')
    const [donationSubmitted, setDonationSubmitted] = useState<boolean>(false)
    const [donationIsInvalid, setDonationIsInvalid] = useState<boolean>(false)

    const donationChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        setDonationSubmitted(false)
        setDonationIsInvalid(false)
        const currencyRegex = /^\d+(\.\d{0,2})?$/
        if(currencyRegex.test(e.currentTarget.value) || e.currentTarget.value.length === 0)
            setEnteredDonation(e.currentTarget.value)
    }

    const donationSubmitHandler = () => {
        const donationValue = parseFloat(enteredDonation)
        if(donationValue >= 5) {
            const newDonation: Donation = {
                donorId: Math.random().toString(), // random for now, could be a userId or something
                donationAmount: donationValue
            }
            setDonations(prevState => {
                return [...prevState, newDonation]
            })
            setDonationSubmitted(true)
            setEnteredDonation('')
        }
        else{
            setDonationIsInvalid(true)
        }
    }
    
    const calculateRemaining = (): number => {
        const totalDonationAmount = donations.reduce((a, b) => a + b['donationAmount'], 0)
        return donationGoal - totalDonationAmount >= 0 ? donationGoal - totalDonationAmount : 0
    }

    return(
        <div style={{maxWidth: '360px'}}>
            <Tooltip>
                {calculateRemaining() > 0 ? (
                    <><b data-testid='remaining'>${calculateRemaining().toLocaleString()}</b> still needed to fund this project</>
                ) : (
                    <>This project met its <b>${donationGoal.toLocaleString()}</b> goal!</>
                )}
            </Tooltip>
            <ProgressCard percentProgress={100 - (calculateRemaining() / donationGoal) * 100}>
                <h2>Only four days left to fund this project</h2> {/* "four" in this string would probably need to be a var result of a date comparison and number-to-word package/function */}
                {donations.length > 0 ? (
                    <p>Join the <b data-testid='donors'>{donations.length}</b> other donor{donations.length > 1 ? 's' : ''} who {donations.length === 1 ? 'has' : 'have'} already supported this project.</p>
                ) : (
                    <p>Be the first donor to support this project.</p>
                )}
                <InputGroup>
                    <div className='input-prefix'>$</div>
                    <input data-testid='donation' className='input-field' type='text' value={enteredDonation} onChange={donationChangeHandler} />
                    <Button className='input-field button-primary' onClick={donationSubmitHandler}>Give Now</Button>
                </InputGroup>
                {donationIsInvalid ? <p data-testid='error' className='error'>Minimum donation is ${minDonation}</p> : null}
                {donationSubmitted ? <p data-testid='thank-you' className='success'>Thank you for your donation!</p> : null}
            </ProgressCard>
        </div>
    )
}

export default DonationWidget