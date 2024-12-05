# Firebird Frontend

This repository contains the frontend for the Firebird project. Users can connect their wallets and input crucial details such as the token name, maximum supply, deposit count, DEX selection, token contract address, and sale duration.

## Features

- **Wallet Connection**: Easily connect supported wallets to interact with the Firebird.
- **Token Information Input**: Users can input details like the token name, maximum supply, and deposit count.
- **DEX Selection**: Users can choose a DEX for swapping memecoins with SOL.
- **Contract Integration**: Users input the token contract address and other relevant contract information.
- **Sale Duration Input**: Allows users to define the duration of the token sale.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- npm (comes with Node.js) or yarn (alternative package manager)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/ls-taylor-lee/firebird-fe.git
   cd firebird-fe
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

### Configuration

- You may need to add environment variables like the solana network, and other configuration options in a `.env` file at the root of the project.

  Example `.env` file:

  ```
  REACT_APP_SOLANA_NETWORK=mainnet
  ```

### Running the Project

To start the development server:

```bash
npm start
```

or

```bash
yarn start
```

This will start the application locally at `http://localhost:3000`.

### Building for Production

To create a production build:

```bash
npm run build
```

or

```bash
yarn build
```

This will create a `build` folder with the production-ready version of your application.

### Deployment

You can deploy this frontend to platforms like [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or any static site hosting provider.

---

## Usage

1. **Connect Wallet**: Use the "Connect Wallet" button in the UI to link your crypto wallet.
2. **Input Token Information**: Fill out details such as:
   - Token Name
   - Maximum Supply
   - Deposit Count
   - DEX Selection (e.g., Raydium)
   - Token Contract Address
   - Sale Duration (in days)
3. **Submit**: After inputting the information, submit the data to interact with the contract.

---

## Technologies Used

- **React.js**: Frontend framework for building the UI.
- **Wallet Integration**: Supports connecting crypto wallets using libraries like `@solana/wallet-adapter`.
- **Web3.js**: For interacting with the blockchain and smart contracts.
- **CSS/Styling**: TailwindCSS with DaisyUI theme for styling the frontend.

---

## Future Enhancements

- **Real-Time Data**: Enhance the frontend to display real-time contract data and token sale progress once the contract is deployed.

---
