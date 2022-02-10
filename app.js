//let web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/2ff10f83a74943d9861720160bcddf45'));
//let web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/2ff10f83a74943d9861720160bcddf45'));

const ABI = [
		{
			"inputs": [],
			"stateMutability": "payable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "NewKing",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "Winner",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "BID_INCRASE",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "MIN_BLOCK_DISTANCE",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "OWNER_REVENUE_PERCENT",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "PR_REVENUE_PERCENT",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "REFERRAL_REVENUE_PERCENT",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "START_BLOCK_DISTANCE",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "blockDistance",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "blocksRemain",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "claim",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "currentBalance",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "currentKing",
			"outputs": [
				{
					"internalType": "address payable",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "lastKingBlock",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "minBid",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address payable",
					"name": "referralAddress",
					"type": "address"
				}
			],
			"name": "placeABid",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"stateMutability": "payable",
			"type": "receive"
		}
	];



//***************************

let ethconnected = false;


let contract;// = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

const CONTRACT_ADDRESSES = {'0x61': '0xeB047DDad3C87efBc30AD129becCfE6820C986c9', '0x38': '0xb7d994AB92B55ff44c96c0bbaF9f43fD8dc3D736'}; ///web3.eth.net.getNetworkType()
const ETHERSCAN_URLS = {'0x38': 'https://bscscan.com', '0x61': 'https://testnet.bscscan.com'};

async function init() {

	if(window.location.hash){
		localStorage.referral = window.location.hash.substr(1);
	}

	if(!CONTRACT_ADDRESSES[ethereum.chainId]){
		alert('Seems you use not a Binance Smart Chain blockchain. BSC King of the Hill requires BSC network.')
	}

	$('#referral').val(`https://${window.location.host}${window.location.pathname}#${ethereum.selectedAddress}`);

    setInterval(async function update() {

        contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESSES[ethereum.chainId]);

        /*if(ethereum.chainId !== 'main') {
            $('#header').text('King of the ' + (ethereum.chainId).toUpperCase());
        }else{
            $('#header').text('King of the Hill');
        }*/



        let blocksRemain = await contract.methods.blocksRemain().call();
        $('.blocksRemain').text(blocksRemain + ' BLOCKS');


        let minBid = await contract.methods.minBid().call();
        window.minBid = minBid;
        $('.minBid').text(Number(minBid / 10e18) + ' BNB');


        let currentKing = await contract.methods.currentKing().call();
        $('.currentKing').text(currentKing);

        let treasury = await contract.methods.currentBalance().call();
        $('#treasury').text(Number(treasury / 10e18) + '');


        if(Number(blocksRemain) > 0 && currentKing.toLowerCase() === window.ethaddress.toLowerCase()) {
            $('.currentKing').addClass('red-button');
        } else {
            $('.currentKing').removeClass('red-button');
        }

        if(Number(blocksRemain) < 1 && currentKing.toLowerCase() === window.ethaddress.toLowerCase()) {
            $('#claim').addClass('red-button');
        } else {
            $('#claim').removeClass('red-button');
        }

        if(/*Number(blocksRemain) < 1 &&*/ currentKing.toLowerCase() !== window.ethaddress.toLowerCase()) {
            $('#makeBid').addClass('red-button');
        } else {
            $('#makeBid').removeClass('red-button');
        }


    }, 1000);

    $('#makeBid').click(async function makeBid() {
        console.log('MAKE BID');
//window.ethaddress
        let txHash = await contract.methods.placeABid(localStorage.referral?localStorage.referral:ethereum.selectedAddress).send({from: window.ethaddress, value: window.minBid});
    })

    $('#claim').click(async function claim() {
        let tx = await contract.methods.claim().send({from: window.ethaddress});
        console.log(tx)
        window.open(ETHERSCAN_URLS[ethereum.chainId] + "/tx/" + tx.transactionHash);
    })


}


async function connectWeb3() {
    if(window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.conn = await window.ethereum.enable();
        //console.log(conn.length)

        ethconnected = conn.length > 0
        if(ethconnected) {
            window.ethaddress = conn[0]
        }
        //updateConnectStatus()
        console.log(await web3.eth.getAccounts());

        await init();

        return true;
    } else {
        alert('Hi. It looks like your browser does not support Web3. Please install a MetaMask or a similar product to connect to the BSC network');
        return false;
    }
}

connectWeb3();