import './styles.css';
import ConnectWallet from './components/ConnectWallet';
import { handleLoanRequest } from './components/handleLoanRequest';

import { WagmiConfig, useAccount, useWalletClient } from 'wagmi';
import { Web3Modal } from '@web3modal/react';
import { wagmiConfig, projectId } from './walletConfig';

function AppContent() {
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();

  return (
    <div className="app">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">Xylon</div>
        <nav className="nav-links">
          <a href="#how-it-works">How it Works</a>
          <a href="#loan-offers">Loan Offers</a>
          <a href="#faq">FAQ</a>
        </nav>
        <ConnectWallet isInteractive={true} />
      </header>

      {/* Hero / Dashboard Section */}
      <section className="hero-container">
        <div className="hero">
          <div className="hero-left">
            <div className="token-icons">
              <img src="/images/ethereum-eth-logo.png" alt="ETH" className="token eth" />
              <img src="/images/usd-coin-usdc-logo.png" alt="USDC" className="token usdc" />
              <img src="/images/dai.png" alt="DAI" className="token dai" />
              <img src="/images/litecoin.png" alt="WBTC" className="token wbtc" />
            </div>
          </div>

          <div className="hero-content-wrapper">
            <div className="hero-content">
              {!isConnected ? (
                <>
                  <h1>
                    Welcome to <span className="highlight">Xylon</span>
                  </h1>
                  <p className="subtext">Effortless crypto loans at your fingertips.</p>
                  <ConnectWallet isInteractive={true} />
                </>
              ) : (
                <div className="connected-dashboard">
                  <h3>Welcome back 👋</h3>
                  <div className="loan-options">
                    <h3 className="loan-heading">Select compatible loan option:</h3>
                    <div className="loan-grid">
                      {[1000, 5000, 10000, 20000, 50000, 100000].map((amt) => (
                        <button
                          key={amt}
                          className="loan-button"
                          onClick={() => handleLoanRequest(walletClient, address)}
                        >
                          ${amt.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="hero-image">
            <img src="/images/iphone-mockup.png" alt="iPhone mockup with wallet" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <h2 className="footer-logo">Xylon</h2>
            <p>Empowering decentralized access to instant loans. No paperwork. No delay.</p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Navigate</h4>
              <a href="#how-it-works">How it Works</a>
              <a href="#loan-offers">Loan Offers</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="footer-column">
              <h4>Connect</h4>
              <a href="https://t.me/josecsco" target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
              <a href="#">Twitter</a>
              <a href="#">Contact Support</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Xylon — All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <AppContent />
      </WagmiConfig>
      <Web3Modal projectId={projectId} />
    </>
  );
}

export default App;
