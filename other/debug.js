const { ethers } = require("hardhat");



async function asyncCall() {
    const [owner,_1,_2,_3,_4,_5,_6,_7,_8,_9,_10,_11,_12,_13,_14,_15,_16,_17,_18,_19,_20] = await ethers.getSigners();

    let message = '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC';//'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' // '0x079f1BaC0025ad71Ab16253271ceCA92b222C614';

    console.log("Address " + _2.address);
    let messageHash = ethers.utils.solidityKeccak256(['string'], [message]);
    let signature = await _2.signMessage(ethers.utils.arrayify(messageHash));
   
    console.log(messageHash);
    console.log(signature);
    // expected output: "resolved"
  }

  asyncCall() 