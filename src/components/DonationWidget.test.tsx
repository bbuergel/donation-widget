import { render, fireEvent } from '@testing-library/react'
import DonationWidget from './DonationWidget'

// in a real project, we'd probably need to provide initial state with mock data

it('should render a widget with tooltip and card', () => {
    const {getByText, queryByTestId} = render(<DonationWidget minDonation={5} donationGoal={5000} />)
    expect(getByText("still needed to fund this project")).toBeTruthy()
    expect(getByText("Only four days left to fund this project")).toBeTruthy()
    expect(getByText("Give Now")).toBeTruthy()
    expect(queryByTestId('error')).toBeFalsy()
    expect(queryByTestId('thank-you')).toBeFalsy()
})

it('should correctly calculate remaining goal', () => {
    const {getByTestId} = render(<DonationWidget minDonation={5} donationGoal={5000} />)
    expect(getByTestId('remaining')?.textContent).toEqual('$1,250')
})

it('should update remaining goal and donor count after donation', () => {
    const {getByTestId, getByText} = render(<DonationWidget minDonation={5} donationGoal={5000} />)
    const input = getByTestId('donation')
    const button = getByText('Give Now')
    fireEvent.change(input, {target: {value: 500}})
    fireEvent.click(button)
    expect(getByTestId('remaining')?.textContent).toEqual('$750')
    expect(getByTestId('donors').textContent).toEqual('3')
    expect(getByTestId('thank-you')).toBeTruthy()
})

it('should show error if donation is below the minimum', () => {
    const {getByTestId, getByText} = render(<DonationWidget minDonation={5} donationGoal={5000} />)
    const input = getByTestId('donation')
    const button = getByText('Give Now')
    fireEvent.change(input, {target: {value: 2}})
    fireEvent.click(button)
    expect(getByTestId('remaining')?.textContent).toEqual('$1,250')
    expect(getByTestId('donors').textContent).toEqual('2')
    expect(getByTestId('error')).toBeTruthy()
})