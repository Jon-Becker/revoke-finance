var tokenList = [];
var nftList = [];
var mixList = [];
var incidents = [];
var library;

var erc20Approvals = [];
var erc721Approvals = [];
var erc1155Approvals = [];

var erc20ABI = [
  {
      "constant": true,
      "inputs": [
          {
              "name": "_owner",
              "type": "address"
          },
          {
              "name": "_spender",
              "type": "address"
          }
      ],
      "name": "allowance",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
    "constant": false,
    "inputs": [
        {
            "name": "_spender",
            "type": "address"
        },
        {
            "name": "_value",
            "type": "uint256"
        }
    ],
    "name": "approve",
    "outputs": [
        {
            "name": "",
            "type": "bool"
        }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "owner",
              "type": "address"
          },
          {
              "indexed": true,
              "name": "spender",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "Approval",
      "type": "event"
  }
]


//Util Setters
export function resetERC20Approvals() {
  erc20Approvals = [];
}
export function resetERC721Approvals() {
  erc721Approvals = [];
}
export function resetERC1155Approvals() {
  erc1155Approvals = [];
}


// Util Loaders
export function loadLibrary(lib) {
  library = lib;
}


//Exported calls
export function editAllowance(address, token, spender, callback) {
  var value = document.getElementById(`edit_amount_${token}${spender}`).value;
  updateAllowance(address, token, spender, value, callback)
}
export function updateAllowance(address, token, spender, value, callback) {
  var BN = library.utils.BN;
  var tokenContract = new library.eth.Contract(erc20ABI, token);
  tokenContract.methods.approve(spender, new BN(value)).estimateGas((err, gas) => {
    if(!err){
      tokenContract.methods.approve(spender, new BN(value)).send({
        from: address,
        gasLimit: gas+1000
      })
      .on('transactionHash', function(hash){
        console.log(hash);
      })
      .on('confirmation', function(confirmationNumber, receipt){
        if(confirmationNumber == 1){
          callback(receipt)
        }
      })
    }
  });
}

//exported views
export function fetchApprovals(address, callback) {
  library.eth.getBlockNumber(function(err, blockNumber){
    tokenList.forEach(token => {
      var tokenContract = new library.eth.Contract(erc20ABI, token.address);
      tokenContract.getPastEvents("Approval", {filter: {owner: address} ,fromBlock: 0, toBlock: blockNumber}, function(err, response){
        if(response.length > 0){
          response.forEach(approval => {
            tokenContract.methods.allowance(approval.returnValues.owner, approval.returnValues.spender).call().then(function(result){
              if(result > 0){
                erc20Approvals.push(
                  {
                    token: approval.address,
                    owner: approval.returnValues.owner,
                    spender: approval.returnValues.spender,
                    value: approval.returnValues.value
                  }
                )
                callback(erc20Approvals.sort((a,b) => a.token > b.token))
              }
            });
            //console.log(approval.returnValues.spender, approval.returnValues.value)
          });
        }
      });
    });
  });
}
export function getToken(address) {
  for(let token of tokenList){
    try {
      if(token.address.toLowerCase() == address.toLowerCase()){
        return token;
      }
    }
    catch(e){}
    
  }
  for(let token of nftList){
    try {
      if(token.address.toLowerCase() == address.toLowerCase()){
        return token;
      }
    }
    catch(e){}
  }
  for(let token of mixList){
    try {
      if(token.address.toLowerCase() == address.toLowerCase()){
        return token;
      }
    }
    catch(e){}
  }
  return;
}
export function fetchTokens(callback) {
  callback(true, tokenList)
  getERC20()
  getERC721()
  getERC1155()
  loadIncidents()
}
function getERC20() {
  fetch('https://raw.githubusercontent.com/Jon-Becker/revoke-finance/main/public/assets/json/erc20.json').then(response => response.json()).then(data => {
    tokenList = data.tokens;
  });
}
function getERC721(callback) {
  fetch('https://raw.githubusercontent.com/Jon-Becker/revoke-finance/main/public/assets/json/erc721.json').then(response => response.json()).then(data => {
    nftList = data.tokens;
  });
}
function getERC1155(callback) {
  fetch('https://raw.githubusercontent.com/Jon-Becker/revoke-finance/main/public/assets/json/erc1155.json').then(response => response.json()).then(data => {
    
  });
}
export function loadIncidents() {
  fetch('https://raw.githubusercontent.com/Jon-Becker/revoke-finance/main/public/assets/json/incidents.json').then(response => response.json()).then(data => {
    incidents = data.incidents;
  });
}
export function getTokenList() {
  return tokenList;
}
export function getIncidents() {
  return incidents.sort((a,b) => new Date(a.date) > new Date(b.date));
}
export function getNFTList() {
  return tokenList;
}
export function getMixList() {
  return mixList;
}
export function getERC20Approvals() {
  return erc20Approvals;
}
export function handleSearch(search) {
  var matches = [];

  if(search.length > 0){
    
    for(let token of tokenList){
      if(
        token.address.toLowerCase().startsWith(search.toLowerCase())
        || token.symbol.toLowerCase().startsWith(search.toLowerCase())
        || token.name.toLowerCase().startsWith(search.toLowerCase())
        || token.name.toLowerCase().includes(search.toLowerCase())
      ){
        matches.push(token)
      }
    }

    for(let token of nftList){
      if(
        token.address.toLowerCase().startsWith(search.toLowerCase())
        || token.name.toLowerCase().startsWith(search.toLowerCase())
        || token.name.toLowerCase().includes(search.toLowerCase())
      ){
        matches.push(token)
      }
    }

    for(let token of mixList){
      if(
        token.address.toLowerCase().startsWith(search.toLowerCase())
        || token.name.toLowerCase().startsWith(search.toLowerCase())
        || token.name.toLowerCase().includes(search.toLowerCase())
      ){
        matches.push(token)
      }
    }

  }
  
  return matches;
}