/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/zexxcoin_presale.json`.
 */
export type ZexxcoinPresale = {
  "address": "88uaiF6Lqq3id6idy6zMv8Pfc4sXb3gvQNLCMWWQHHCL",
  "metadata": {
    "name": "zexxcoinPresale",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "buyToken",
      "discriminator": [
        138,
        127,
        14,
        91,
        38,
        87,
        115,
        105
      ],
      "accounts": [
        {
          "name": "presaleInfo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  101,
                  115,
                  97,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "presale_info.authority",
                "account": "presaleInfo"
              }
            ]
          }
        },
        {
          "name": "userInfo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "presaleInfo"
              },
              {
                "kind": "account",
                "path": "buyer"
              }
            ]
          }
        },
        {
          "name": "presaleVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "buyer",
          "writable": true,
          "signer": true
        },
        {
          "name": "buyerTokenAccount",
          "writable": true
        },
        {
          "name": "presaleTokenAccount",
          "writable": true
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimToken",
      "discriminator": [
        116,
        206,
        27,
        191,
        166,
        19,
        0,
        73
      ],
      "accounts": [
        {
          "name": "tokenMint",
          "writable": true
        },
        {
          "name": "tokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "buyer"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "presaleAssociatedTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "presaleInfo"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "userInfo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "presaleInfo"
              },
              {
                "kind": "account",
                "path": "buyer"
              }
            ]
          }
        },
        {
          "name": "presaleInfo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  101,
                  115,
                  97,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "presale_info.authority",
                "account": "presaleInfo"
              }
            ]
          }
        },
        {
          "name": "buyer",
          "writable": true,
          "signer": true
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "phaseToClaim",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createPresale",
      "discriminator": [
        176,
        144,
        197,
        158,
        61,
        119,
        75,
        135
      ],
      "accounts": [
        {
          "name": "presaleInfo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  101,
                  115,
                  97,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tokenMintAddress",
          "type": "pubkey"
        },
        {
          "name": "maxTokenAmountPerAddress",
          "type": "u64"
        },
        {
          "name": "displayEndTime",
          "type": "i64"
        }
      ]
    },
    {
      "name": "depositToken",
      "discriminator": [
        11,
        156,
        96,
        218,
        39,
        163,
        180,
        19
      ],
      "accounts": [
        {
          "name": "mintAccount",
          "writable": true
        },
        {
          "name": "tokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "admin"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mintAccount"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "toAssociatedTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "presaleInfo"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mintAccount"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "presaleVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "presaleInfo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  101,
                  115,
                  97,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "presale_info.authority",
                "account": "presaleInfo"
              }
            ]
          }
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "emergencyStop",
      "discriminator": [
        179,
        143,
        200,
        137,
        108,
        245,
        248,
        35
      ],
      "accounts": [
        {
          "name": "presaleInfo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  101,
                  115,
                  97,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "presale_info.authority",
                "account": "presaleInfo"
              }
            ]
          }
        },
        {
          "name": "authority",
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "resumePresale",
      "discriminator": [
        34,
        45,
        30,
        147,
        226,
        254,
        42,
        152
      ],
      "accounts": [
        {
          "name": "presaleInfo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  101,
                  115,
                  97,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "presale_info.authority",
                "account": "presaleInfo"
              }
            ]
          }
        },
        {
          "name": "authority",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "displayEndTime",
          "type": "i64"
        }
      ]
    },
    {
      "name": "withdrawSol",
      "discriminator": [
        145,
        131,
        74,
        136,
        65,
        137,
        42,
        38
      ],
      "accounts": [
        {
          "name": "presaleInfo",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  101,
                  115,
                  97,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "presale_info.authority",
                "account": "presaleInfo"
              }
            ]
          }
        },
        {
          "name": "presaleVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "presaleInfo",
      "discriminator": [
        11,
        19,
        36,
        47,
        79,
        104,
        214,
        40
      ]
    },
    {
      "name": "userInfo",
      "discriminator": [
        83,
        134,
        200,
        56,
        144,
        56,
        10,
        62
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "belowSoftcap",
      "msg": "Amount below soft cap"
    },
    {
      "code": 6001,
      "name": "aboveHardcap",
      "msg": "Amount above hard cap"
    },
    {
      "code": 6002,
      "name": "invalidPrice",
      "msg": "Invalid price"
    },
    {
      "code": 6003,
      "name": "insufficientFunds",
      "msg": "Insufficient funds"
    },
    {
      "code": 6004,
      "name": "presaleNotInitialized",
      "msg": "Presale not initialized"
    },
    {
      "code": 6005,
      "name": "presaleNotActive",
      "msg": "Presale not active"
    },
    {
      "code": 6006,
      "name": "presaleEnded",
      "msg": "Presale has ended"
    },
    {
      "code": 6007,
      "name": "invalidPhase",
      "msg": "Invalid phase"
    },
    {
      "code": 6008,
      "name": "phaseNotActive",
      "msg": "Phase not active"
    },
    {
      "code": 6009,
      "name": "insufficientTokens",
      "msg": "Insufficient tokens in current phase"
    },
    {
      "code": 6010,
      "name": "exceedsMaxAmount",
      "msg": "Exceeds maximum tokens per address"
    },
    {
      "code": 6011,
      "name": "overflow",
      "msg": "Arithmetic overflow"
    },
    {
      "code": 6012,
      "name": "invalidPhaseAllocation",
      "msg": "Invalid phase allocation"
    },
    {
      "code": 6013,
      "name": "userAlreadyClaimed",
      "msg": "User has already claimed the tokens"
    },
    {
      "code": 6014,
      "name": "invalidAuthority",
      "msg": "Invalid authority"
    },
    {
      "code": 6015,
      "name": "invalidTokenAccount",
      "msg": "Invalid token account"
    },
    {
      "code": 6016,
      "name": "emptyVault",
      "msg": "Empty vault"
    },
    {
      "code": 6017,
      "name": "insufficientDeposit",
      "msg": "Insufficient deposited tokens"
    },
    {
      "code": 6018,
      "name": "invalidAmount",
      "msg": "Invalid amount"
    },
    {
      "code": 6019,
      "name": "presalePaused",
      "msg": "Presale is paused"
    },
    {
      "code": 6020,
      "name": "presaleTimeExpired",
      "msg": "Presale time window has expired"
    }
  ],
  "types": [
    {
      "name": "phase",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "phaseNumber",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "percentage",
            "type": "u8"
          },
          {
            "name": "tokensSold",
            "type": "u64"
          },
          {
            "name": "tokensAvailable",
            "type": "u64"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "phaseStatus"
              }
            }
          },
          {
            "name": "softcap",
            "type": "u64"
          },
          {
            "name": "hardcap",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "phaseStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "upcoming"
          },
          {
            "name": "active"
          },
          {
            "name": "ended"
          }
        ]
      }
    },
    {
      "name": "presaleInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMintAddress",
            "type": "pubkey"
          },
          {
            "name": "totalTokenSupply",
            "type": "u64"
          },
          {
            "name": "remainingTokens",
            "type": "u64"
          },
          {
            "name": "currentPhase",
            "type": "u8"
          },
          {
            "name": "phases",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "phase"
                  }
                },
                5
              ]
            }
          },
          {
            "name": "totalTokensSold",
            "type": "u64"
          },
          {
            "name": "totalTokensDeposited",
            "type": "u64"
          },
          {
            "name": "maxTokenAmountPerAddress",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "isActive",
            "type": "bool"
          },
          {
            "name": "isEnded",
            "type": "bool"
          },
          {
            "name": "isPaused",
            "type": "bool"
          },
          {
            "name": "displayEndTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "userInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokensBought",
            "type": "u64"
          },
          {
            "name": "phasePurchases",
            "type": {
              "array": [
                "u64",
                5
              ]
            }
          },
          {
            "name": "lastPurchaseTime",
            "type": "i64"
          },
          {
            "name": "phaseClaims",
            "type": {
              "array": [
                "bool",
                5
              ]
            }
          },
          {
            "name": "wallet",
            "type": "pubkey"
          },
          {
            "name": "totalPaid",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "constants": [
    {
      "name": "presaleSeed",
      "type": "bytes",
      "value": "[80, 82, 69, 83, 65, 76, 69, 95, 83, 69, 69, 68]"
    }
  ]
};
