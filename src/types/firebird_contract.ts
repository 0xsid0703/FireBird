export type FirebirdContract = {
  version: "0.1.0";
  name: "firebird_contract";
  instructions: [
    {
      name: "deposit";
      accounts: [
        {
          name: "tokenMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "dcaData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "pdaTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "userAuthority";
          isMut: true;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "sell";
      accounts: [
        {
          name: "tokenMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "dcaData";
          isMut: false;
          isSigner: false;
        },
        {
          name: "raydiumProgram";
          isMut: true;
          isSigner: false;
        },
        {
          name: "pdaTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "pdaWsolAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "poolTokenB";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "userAuthority";
          isMut: true;
          isSigner: true;
        }
      ];
      args: [];
    },
    {
      name: "buyBack";
      accounts: [
        {
          name: "tokenMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "raydiumProgram";
          isMut: true;
          isSigner: false;
        },
        {
          name: "pdaTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "poolTokenB";
          isMut: false;
          isSigner: false;
        },
        {
          name: "pdaWsolAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "userAuthority";
          isMut: true;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "dcaData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "tokenAddress";
            type: "publicKey";
          },
          {
            name: "piece";
            type: "u64";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "InvalidTrigger";
      msg: "Invalid trigger";
    },
    {
      code: 6001;
      name: "TokenAlreadyDeposited";
      msg: "The token is already deposited";
    },
    {
      code: 6002;
      name: "InvalidTokenAddress";
      msg: "Invalid token address";
    },
    {
      code: 6003;
      name: "InsufficientFunds";
      msg: "Insufficient funds to sell";
    }
  ];
};

export const IDL: FirebirdContract = {
  version: "0.1.0",
  name: "firebird_contract",
  instructions: [
    {
      name: "deposit",
      accounts: [
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "dcaData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pdaTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userAuthority",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "sell",
      accounts: [
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "dcaData",
          isMut: false,
          isSigner: false,
        },
        {
          name: "raydiumProgram",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pdaTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pdaWsolAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenB",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userAuthority",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "buyBack",
      accounts: [
        {
          name: "tokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "raydiumProgram",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pdaTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenB",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pdaWsolAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userAuthority",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "dcaData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "tokenAddress",
            type: "publicKey",
          },
          {
            name: "piece",
            type: "u64",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidTrigger",
      msg: "Invalid trigger",
    },
    {
      code: 6001,
      name: "TokenAlreadyDeposited",
      msg: "The token is already deposited",
    },
    {
      code: 6002,
      name: "InvalidTokenAddress",
      msg: "Invalid token address",
    },
    {
      code: 6003,
      name: "InsufficientFunds",
      msg: "Insufficient funds to sell",
    },
  ],
};
