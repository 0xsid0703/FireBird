import { FirebirdContract, IDL } from "@/types/firebird_contract";
import { AnchorProvider, BN, Program } from "@project-serum/anchor";
import {
  MARKET_STATE_LAYOUT_V3,
  findProgramAddress,
  getAssociatedPoolKeys,
  getLiquidityAssociatedAuthority,
  liquidityStateV4Layout,
} from "@raydium-io/raydium-sdk-v2";
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from "@solana/spl-token";
import { Commitment, Connection, PublicKey, SystemProgram } from "@solana/web3.js";

const constants = {
  devnet: {
    PROGRAM_ID: "FSH9An6asnz4m4WdhUkmsCjTWh4Q3ytoa6mcEva6xYqZ", // Replace with your program ID
    SOLANA_NETWORK: "https://api.devnet.solana.com",
    SERUM_PROGRAM_ID: "EoTcMgcDRTJVZDMZWBoU6rhYHZfkNTVEAfz3uUJRcYGj",
    RAYIDUM_PROGRAM_ID: "HWy1jotHpo6UqeQxx49dpYYdQB8wj9Qk9MdxwjLvDHB8",
    WSolAddress: "So11111111111111111111111111111111111111112",
  },
  mainnet: {
    PROGRAM_ID: "3RwDKKPMkNJw2FEviNoDqBtCiDSY2dZa6xawQWhHe6ag", // Replace with your program ID
    SOLANA_NETWORK: "https://mainnet.helius-rpc.com/?api-key=ea0e2e29-0b78-4998-abb0-412dd137bd6f",
    SERUM_PROGRAM_ID: "srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX",
    RAYIDUM_PROGRAM_ID: "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8",
    WSolAddress: "So11111111111111111111111111111111111111112",
  },
}["devnet"];

// const TokenAddress = 'G5PgRdKbbMtndr9b2Vh1qedoEGLvdofg8uWckyGpump';

// deposit(userPublicKey, 'BjbHyQEUQU6asDVDnSRk4xhvcN4cvwWuWJsxmRRPQXoP', 100 * 10 ** 9);

export const deposit = async (userAddress: string, tokenAddress: string, amount: number): Promise<string | null> => {
  const connection = new Connection(constants.SOLANA_NETWORK, "confirmed");

  const provider = new AnchorProvider(connection, window.solana, {
    commitment: "confirmed",
  });
  const program = new Program(IDL, constants.PROGRAM_ID, provider) as Program<FirebirdContract>; // Use the IDL of the program

  // Define all the necessary accounts for the transaction
  const userPublicKey = new PublicKey(userAddress);
  const tokenMintPublicKey = new PublicKey(tokenAddress);

  // Create the deposit transaction
  try {
    const userTokenAccount = await getAssociatedTokenAddress(tokenMintPublicKey, userPublicKey);
    const { publicKey: dcaDataPublicKey } = await findProgramAddress(
      [Buffer.from("dca_data"), tokenMintPublicKey.toBuffer()],
      program.programId
    );
    const { publicKey: pdaTokenAccount } = await findProgramAddress(
      [Buffer.from("vault"), tokenMintPublicKey.toBuffer()],
      program.programId
    );

    const tx = await program.rpc.deposit(
      new BN(amount), // Amount to deposit in token's smallest denomination
      {
        accounts: {
          userAuthority: userPublicKey,
          userTokenAccount: userTokenAccount,
          pdaTokenAccount: pdaTokenAccount,
          dcaData: dcaDataPublicKey,
          tokenMint: tokenMintPublicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        },
        signers: [],
      }
    );
    console.log("Deposit Transaction Signature:", tx);
    return tx;
  } catch (error) {
    console.error("Error while depositing tokens:", error);
    return null;
  }
};

export const sell = async (userPublicKey: PublicKey, tokenAddress: string) => {
  const connection = new Connection(constants.SOLANA_NETWORK, "confirmed");
  const provider = new AnchorProvider(connection, window.solana, {
    commitment: "confirmed",
  });
  const program = new Program(IDL, constants.PROGRAM_ID, provider) as Program<FirebirdContract>; // Use the IDL of the program

  const tokenMintPublicKey = new PublicKey(tokenAddress);

  const { publicKey: dcaDataPublicKey } = await findProgramAddress(
    [Buffer.from("dca_data"), tokenMintPublicKey.toBuffer()],
    program.programId
  );
  const { publicKey: pdaTokenAccount } = await findProgramAddress(
    [Buffer.from("vault"), tokenMintPublicKey.toBuffer()],
    program.programId
  );
  const { publicKey: pdaWsolAccount } = await findProgramAddress(
    [Buffer.from("vault-wsol"), tokenMintPublicKey.toBuffer()],
    program.programId
  );

  const openBookAccounts = await fetchOpenBookAccounts(
    connection,
    tokenMintPublicKey,
    new PublicKey(constants.WSolAddress),
    "confirmed"
  );
  const associatedPoolKeys = getAssociatedPoolKeys({
    version: 4,
    marketVersion: 3,
    baseDecimals: openBookAccounts[0].baseDecimal,
    quoteDecimals: openBookAccounts[0].quoteDecimal,
    baseMint: openBookAccounts[0].baseMint,
    quoteMint: openBookAccounts[0].quoteMint,
    marketId: openBookAccounts[0].marketId,
    marketProgramId: openBookAccounts[0].marketProgramId,
    programId: new PublicKey(constants.SERUM_PROGRAM_ID),
  });
  const ammAuthority = getLiquidityAssociatedAuthority({ programId: new PublicKey(constants.RAYIDUM_PROGRAM_ID) });
  const marketAccounts = await fetchMarketAccounts(
    connection,
    tokenMintPublicKey,
    new PublicKey(constants.WSolAddress),
    "confirmed"
  );

  console.log("Raydium Program: ", new PublicKey(constants.RAYIDUM_PROGRAM_ID).toString());
  console.log("#1 Token Program: ", TOKEN_PROGRAM_ID.toString());
  console.log("#2 Amm", new PublicKey(openBookAccounts[0].id).toString());
  console.log("#3 Amm Authority", ammAuthority.publicKey.toString());
  console.log("#4 Amm Open Orders", openBookAccounts[0].openOrders.toString());
  console.log("#5 Amm Target Orders", openBookAccounts[0].targetOrders.toString());
  console.log("#6 Pool Coin Token Account", openBookAccounts[0].baseVault.toString());
  console.log("#7 Pool Pc Token Account", openBookAccounts[0].quoteVault.toString());
  console.log("#8 Serum Program", new PublicKey(constants.SERUM_PROGRAM_ID).toString());
  console.log("#9 Serum Market", marketAccounts[0].ownAddress.toString());
  console.log("#10 Serum Bids", marketAccounts[0].bids.toString());
  console.log("#11 Serum Asks", marketAccounts[0].asks.toString());
  console.log("#12 Serum Event Queue", marketAccounts[0].eventQueue.toString());
  console.log("#13 Serum Coin Vault Account", marketAccounts[0].baseVault.toString());
  console.log("#14 Serum Pc Vault Account", marketAccounts[0].quoteVault.toString());
  console.log("#15 Serum Vault Signer", associatedPoolKeys.marketAuthority.toString());
  console.log("#16 User Source Token Account", pdaTokenAccount.toString());
  console.log("#17 User Destination Token Account", pdaWsolAccount.toString());

  // Create the sell transaction
  try {
    const tx = await program.rpc.sell(new PublicKey(tokenAddress), {
      accounts: {
        pdaTokenAccount,
        pdaWsolAccount,
        dcaData: dcaDataPublicKey,
        poolTokenB: new PublicKey(constants.WSolAddress),
        tokenMint: tokenMintPublicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        raydiumProgram: new PublicKey(constants.RAYIDUM_PROGRAM_ID),
        userAuthority: userPublicKey,
        systemProgram: SystemProgram.programId,
      },
      remainingAccounts: [
        { pubkey: new PublicKey(openBookAccounts[0].id), isWritable: true, isSigner: false }, // #2 amm
        { pubkey: ammAuthority.publicKey, isWritable: false, isSigner: false }, // #3 ammAuthority
        { pubkey: openBookAccounts[0].openOrders, isWritable: true, isSigner: false }, // #4 openOrders
        { pubkey: openBookAccounts[0].targetOrders, isWritable: true, isSigner: false }, // #5 targetOrders
        { pubkey: openBookAccounts[0].baseVault, isWritable: true, isSigner: false }, // #6 poolCoinTokenAccount
        { pubkey: openBookAccounts[0].quoteVault, isWritable: true, isSigner: false }, // #7 poolPcTokenAccount
        { pubkey: new PublicKey(constants.SERUM_PROGRAM_ID), isWritable: false, isSigner: false }, // #8 serumProgram
        { pubkey: marketAccounts[0].ownAddress, isWritable: true, isSigner: false }, // #9 serumMarket
        { pubkey: marketAccounts[0].bids, isWritable: true, isSigner: false }, // #10 serumBids
        { pubkey: marketAccounts[0].asks, isWritable: true, isSigner: false }, // #11 serumAsks
        { pubkey: marketAccounts[0].eventQueue, isWritable: true, isSigner: false }, // #12 serumEventQueue
        { pubkey: marketAccounts[0].baseVault, isWritable: true, isSigner: false }, // #13 serumCoinVaultAccount
        { pubkey: marketAccounts[0].quoteVault, isWritable: true, isSigner: false }, // #14 serumPcVaultAccount
        { pubkey: associatedPoolKeys.marketAuthority, isWritable: false, isSigner: false }, // #15 serumVaultSigner
      ],
      signers: [],
    });
    console.log("Sell Transaction Signature:", tx);
  } catch (error) {
    console.error("Error while selling tokens:", error);
  }
};

// Define a function to fetch and decode OpenBook accounts
async function fetchMarketAccounts(
  connection: Connection,
  baseMint: PublicKey,
  quoteMint: PublicKey,
  commitment: Commitment
) {
  const accounts = await connection.getProgramAccounts(new PublicKey(constants.SERUM_PROGRAM_ID), {
    commitment,
    filters: [
      { dataSize: MARKET_STATE_LAYOUT_V3.span },
      {
        memcmp: {
          offset: MARKET_STATE_LAYOUT_V3.offsetOf("baseMint"),
          bytes: baseMint.toBase58(),
        },
      },
      {
        memcmp: {
          offset: MARKET_STATE_LAYOUT_V3.offsetOf("quoteMint"),
          bytes: quoteMint.toBase58(),
        },
      },
    ],
  });

  return accounts.map(({ account }) => MARKET_STATE_LAYOUT_V3.decode(account.data));
}

// Define a function to fetch and decode Market accounts
async function fetchOpenBookAccounts(
  connection: Connection,
  base: PublicKey,
  quote: PublicKey,
  commitment: Commitment
) {
  const accounts = await connection.getProgramAccounts(new PublicKey(constants.RAYIDUM_PROGRAM_ID), {
    commitment,
    filters: [
      { dataSize: liquidityStateV4Layout.span },
      {
        memcmp: {
          offset: liquidityStateV4Layout.offsetOf("baseMint"),
          bytes: base.toBase58(),
        },
      },
      {
        memcmp: {
          offset: liquidityStateV4Layout.offsetOf("quoteMint"),
          bytes: quote.toBase58(),
        },
      },
    ],
  });

  return accounts.map(({ pubkey, account }) => ({
    id: pubkey.toString(),
    ...liquidityStateV4Layout.decode(account.data),
  }));
}
