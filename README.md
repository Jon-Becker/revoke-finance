# Revoke.Finance

  ##### March 05, 2022&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;By [Jonathan Becker](https://jbecker.dev) 
  
  ![OpenSea](./assets/images/preview.png?fw)

  <a href="https://revoke.finance">Revoke.finance</a> is a simple DApp which allows users to see all open token approvals on their Ethereum account and manage them in an elegant React UI. I made this project after witnessing the DDoSing of <a href="https://revoke.cash">revoke.cash</a> as well as <a href="https://etherscan.io">etherscan.io</a> during the February 19 OpenSea phishing attack.

  This project will also be deployed to IPFS

  # 0x01. Technical Breakdown

  The transaction I am going to break down can be found on <a href="https://etherscan.io/tx/0x12906e3623d1c211ac4af750b1987ae61671c5e61fcc01dbf8bdcb1513e13d5a">Etherscan</a>. In order to get a better look at what's happening behind the scenes, I'll also use <a href="https://ethtx.info/mainnet/0x12906e3623d1c211ac4af750b1987ae61671c5e61fcc01dbf8bdcb1513e13d5a/">ethtx.info</a>.

  - The transaction begins with <a href="https://etherscan.io/address/0x3e0defb880cd8e163bad68abe66437f99a7a8a74">the attacker</a> interacting with his contract with some calldata, which appears to be a signature for a token sale. At this time, I believe that this signature was somehow phished and stored from the victims in this attack. 

    ~~When taking a look at the decompiled bytecode, this assumption of a phishing attack is strengthened, as it appears to be a targeted attack with a switch case for each victim built into the smart contract.~~

     ![Switch Cases](https://raw.githubusercontent.com/Jon-Becker/research/main/papers/opensea-attack/1.png)

     After speaking with the CTO of OpenSea, <a href="https://twitter.com/NadavAHollander">Nadav Hollander</a>, we concluded that this idea of a switch case was not accurate. As of 03/02/2022, the above code structure is believed to parse the calldata and build the ``WyvernExchange.atomicMatch_`` call, using *pre-signed, valid calldata* that was phished from targets.

  - This fallback function builds a staticcall to ``WyvernExchange.atomicMatch_`` , which essentially begins the transfer process from the victim, ``janclarin.eth``, to the attacker, all for a cost of 0 ETH. 

    Since the attacker's contract is calling this function, providing the calldata for both ``calldataBuy``, ``calldataSell``, which came directly from ``msg.data``, we can conclude that this was indeed a targeted phishing attack.

    The events emitted by this transaction tell the same story: The attacker was able to call WyvernExchange.atomicMatch_ on behalf of the victims, transferring NFTs to himself for a grand total of 0 ETH.

    ![Events Emitted](https://raw.githubusercontent.com/Jon-Becker/research/main/papers/opensea-attack/2.png?fw)

  - After further investigation, it appears the calldata also included the address of ``WyvernExchange``, so this malicious contract *could* be used on forks or future updates of ``WyvernExchange``.

  # 0x02. Future Prevention

  Phishing attacks will be around forever as long as there are people who fall for it. In order to stop these attacks, people need to know more about how these attacks work, how to spot them, and how to report them.

  ### Protecting Users Against Phishing

  One approach to preventing phishing on your platform is an anti-phishing code. This code is set by the user, and can be used to verify that all emails are completely real and from your website. If an email doesn't contain that code, it's not a safe email. Nobody but you should know your anti-phishing code, which would be hashed and salted and stored in a database.

  ### Spotting Phishing Scams

  In order to spot phishing scams and keep yourself safe, heres a few tips you should follow when reading emails:

  - Always check that the sender comes from the real domain.
    - If an address contains typos, or a domain that's not associated with the real entity, its fake.

      For example: security@opensea.ml , security@opensea.co aren't associated with the real domain, opensea.io.

  - Check if the email was sent securely.
    - Nowadays, this is less important since most spoofed emails are automatically sent to spam. However, it's always good practice to check to see if an email was sent securely, because anyone with an IMAP server can spoof an email address.

      In order to check if an email was spoofed, just make sure it has a valid certificate attached.

      ![TLS](https://raw.githubusercontent.com/Jon-Becker/research/main/papers/opensea-attack/3.png)
  
  - Don't click links without checking them first.
    - In all modern browsers, hovering over a link will give you the ability to check where you're being taken. If this domain isn't familiar to you, don't click the link. If something is urgent, go log-in to your account and check there.

  ### Reporting Phishing Scams

  You can use the following links to report phishing scams:

  - https://www.cisa.gov/uscert/report-phishing
  - https://safebrowsing.google.com/safebrowsing/report_phish/?hl=en

  # 0x03 Resources & Citations

  - OpenSea article image [https://www.ultcube88.com/](https://www.ultcube88.com/wp-content/uploads/2021/10/20210915_OpenSea.jpg)
  - Solidity Decompiler [https://ethervm.io/decompile/](https://ethervm.io/decompile/)
  - Detailed transaction viewer [[https://ethtx.info/mainnet/](https://ethtx.info/mainnet/), [https://etherscan.io](https://etherscan.io)]
