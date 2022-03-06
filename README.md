# Revoke.Finance

  ##### March 05, 2022&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;By [Jonathan Becker](https://jbecker.dev) 
  
  ![OpenSea](./assets/images/preview.png?fw)

  <a href="https://revoke.finance">Revoke.finance</a> is a simple DApp which allows users to see all open token approvals on their Ethereum account and manage them in an elegant React UI. I made this project after witnessing the DDoSing of <a href="https://revoke.cash">revoke.cash</a> as well as <a href="https://etherscan.io">etherscan.io</a> during the February 19 OpenSea phishing attack.

  This project will be deployed to IPFS and will be DDoS proof as long as one node is hosting the file. All valid IPFS CIDs can be found on <a href="https://revoke.finance">Revoke.finance</a>, which will be updated as the project recieves further updates.

  # 0x01. Features

  ### ERC20 Approval List
  The main feature of this project is the approval list, which will show all active approvals from supported ERC-20 tokens. This allows users to view the `Token`, `Contract Address`, `Spender Address`, and `Allowance Amount` for each approval, and give them the option to edit or revoke this approval.

  ### Incident Feed
  Another valuable feature of this DApp is the incident feed, which will allow users to see in real-time incidents that are ongoing within the cryptospace. This includes hacks, exploits, or bugs, and will allow users on the application to see which approvals may be risked due to an ongoing incident.

  ### Open Source
  This entire project is open-source and crowdsourced. If you have an ERC-20 token you want supported, or want to report an incident, all you have to do is open a pull-request and it will be added to the DApp. For more information on contributing, see the next section. 

  # 0x02. Contributing

  ### Adding support for a token
  If you want to add support for a token or change token information, follow these steps:

  - 1. Fork this repository
  - 2. Add or edit the token within <a href="https://github.com/Jon-Becker/revoke-finance/tree/main/public/assets/json/erc20.json">public/assets/json/erc20.json</a>.
    - In order to be accepted, follow the JSON format below:
      ```
      {
        chainId: number,         // Chain ID 
        address: string,         // Contract address
        name: string,            // Name of token, 40 chars max
        symbol: string,          // Symbol of token, 20 chars max
        decimals: number,        // Number of decimals token uses
        logoURI: string | null,  // URI / URL for token logo 
        extensions: {
          link: string | null,        // URL of token's website
          description: string | null, // Short description of token (1000 chars max)
          ogImage: string | null      // URL of Open Graph image of token website 
        }
      }
      ```
    - Fields that do not exist should be marked `null`.
  - 3. Open a pull request to the main branch.
    - If you are updating a token, explain why within your PR.

  ### Reporting an Incident
  If you are reporting an incident that is ongoing or has happened in the past, follow these steps:

  - 1. Fork this repository
  - 2. Add or edit the incident within <a href="https://github.com/Jon-Becker/revoke-finance/tree/main/public/assets/json/incidents.json">public/assets/json/incidents.json</a>.
    - In order to be accepted, follow the JSON format below:
      ```
      {
        severity: string ,           // high, medium, or low
        platform: {
          name: string,              // Name of platform
          address: string | null,    // Contract address of platform
          logoURI: string | null,    // Link to platform Logo
        },
        description: string,         // Detailed description of incident (50 char min, 1000 max)
        source: string | null,       // Valid source regarding incident
        date: string,                // Date of incident, YYYY-MM-DD HH24:MM:SS (2022-03-05 23:59:59)
      }
      ```
    - Fields that do not exist should be marked `null`.
  - 3. Open a pull request to the main branch.
    - If you are updating an incident, explain why within your PR.

  # 0x03 Resources & Citations

  - ERC20 token directory: [0xSequence/token-directory](hhttps://github.com/0xsequence/token-directory)