import DonationWidget from './components/DonationWidget'

function App() {
  return (
    <div className="App">
      <DonationWidget donationGoal={5000} minDonation={5} />
    </div>
  )
}

export default App
