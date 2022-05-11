const { expect } = require("chai");
const { ethers } = require("hardhat");


let currentToken;
let message1 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';// '0x079f1BaC0025ad71Ab16253271ceCA92b222C614';
let message2 = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

let messageHash1 = ethers.utils.solidityKeccak256(['string'], [message1]);
let messageHash2 = ethers.utils.solidityKeccak256(['string'], [message2]);

let whitelistClaimPass = [{
    r: '0xaba336e1347616cd15fd44720fd4bb9faaf3e3cf4fe653915b4dc57229264807',
    s: '0x17eb41b6419bcd8f02e80ee9731a62eb4f073a227c088ab5010da8349eb350b3',
    v: 27
}, {
    r: '0x9b66010cdc6f118c81483c6c6179c9c1d81278c83c6e643c17bf984fdcd6b23f',
    s: '0x31c0be7e59acc24ecfea78b59996b1642891370ffd9ab5840ec877cac1286364',
    v: 27
}, {
    r: '0x76cb241964b3b20ef678aeaeccbbca0a0fba271e03c4cbf1bee3b7bcac0f1c28',
    s: '0x50499e74dc33a7d2e7eaa2f151d68e8db176fefdd266dad2c7908893fc151dc1',
    v: 27
}]

if (true == true)
    describe("NFT Pump Tests", function () {
        let buyer, owner, hashValue;

        // beforeEach(async function () {
        //     await hre.network.provider.send("hardhat_reset")
        //   })

        before(async () => {

            const [owner, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20] = await ethers.getSigners();
            console.log("Owner Address: " + owner.address);
            console.log("Owner Address: " + _1.address);
            let ethBalance = ethers.utils.formatEther(await ethers.provider.getBalance(owner.address));
            console.log("Start Balance: " + ethBalance);

            const currentContract = await ethers.getContractFactory("GenericNFTPumpContract");
            currentToken = await currentContract.deploy(
                'Test Contract',
                'Test',
                '0xf5e3D593FC734b267b313240A0FcE8E0edEBD69a',
                '0xf5e3D593FC734b267b313240A0FcE8E0edEBD69a',
                'https://tmc-suits.s3.us-west-1.amazonaws.com/assets/json/',
                'https://tmc-suits.s3.us-west-1.amazonaws.com/assets/general/reveal.json',
                [
                    ethers.utils.getAddress('0x9C3f261e2cc4C88DfaC56A5B46cdbf767eE2f231'),
                    ethers.utils.getAddress('0x608328a456D3205fFBAcD2E00AaFE2eE2471dd17'),
                    ethers.utils.getAddress('0x9EF4c075E19ed467813aCA21A23c6aF309B6D236'),
                    ethers.utils.getAddress('0xf886B127d4E381E7619d2Af1617476fef0d04F8c'),
                    ethers.utils.getAddress('0x36Fa3E52D58A7401Be46353F50667FBf931e4F42'),
                    ethers.utils.getAddress('0x96353d42d88e8a9945cdc8308592f4853f39e114'),
                    ethers.utils.getAddress('0x109094D990aDbdfC97c5c9Ea5F5bcE54f4EB1BDB'),
                    ethers.utils.getAddress('0x4aC5d838Cc15686f45fB8BAF54e519B8388914f0'),
                    ethers.utils.getAddress('0x27a25E7d890F656cD508173A9E16369B5A29108C'),
                    ethers.utils.getAddress('0xC7b8822E1eEAd4Cd1Fb3ae33f34Daf694DBA6B23'),
                    ethers.utils.getAddress('0x317C315056fF37F9A74256Ff5345a95915673B88'),
                    ethers.utils.getAddress('0x5d2eCEDDc74D1675Ce6934AB364b01799F40F644')
                ],
                [
                    30,
                    25,
                    10,
                    7,
                    7,
                    3,
                    2,
                    3,
                    3,
                    1,
                    8,
                    1
                ]);

            console.log("Deploy");
            await currentToken.deployed();

            console.log("ToggleMint");
            await currentToken.togglePublicMint();

            ethBalance = ethers.utils.formatEther(await ethers.provider.getBalance(owner.address));
            console.log("After Deploy Balance" + ethBalance);

            // // Include process module
            // const process = require('process');

            // // Printing process.env property value
            // console.log(process.env);
        });

        if (true) {
            it("Update Vault", async function () {
                await currentToken.setVaultAddress('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
            });

            it("Get Signature", async function () {
                const [adminWallet, userWallet] = await ethers.getSigners();
                let message = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

                let messageHash = ethers.utils.solidityKeccak256(['string'], [message]);
                let signature = await adminWallet.signMessage(ethers.utils.arrayify(messageHash2));

                // console.log("Address")
                // console.log(adminWallet.address)
                // console.log("Message Hash")
                // console.log(messageHash)
                // console.log("Signature")
                // console.log(signature)
            });

            it("Mints a token from Dapp", async function () {

                const PurchaseArray = [
                    { amount: 10, value: "5" },
                    { amount: 50, value: "5" },
                    { amount: 50, value: "5" },
                    { amount: 50, value: "5" },
                    { amount: 50, value: "5" },
                    { amount: 50, value: "5" },
                    { amount: 50, value: "5" },
                    { amount: 50, value: "5" },
                    { amount: 50, value: "5" },
                    { amount: 50, value: "5" }
                    // { amount: 5, value: "0.35" },
                    // { amount: 10, value: "0.7" },
                    //{ amount: 100, value: "7" }
                ];

                const [adminWallet, userWallet] = await ethers.getSigners();
                const timestamp = Date.now();

                //Step 4: Turn on Sales
                const PreMintCount = await currentToken.balanceOf(adminWallet.address)
                const totalSupply = await currentToken.totalSupply();

                TotalAmount = +PreMintCount;

                for (let index = 0; index < PurchaseArray.length; index++) {
                    const element = PurchaseArray[index];
                    await currentToken.openMint(element.amount, { value: ethers.utils.parseEther(element.value) });
                    TotalAmount = TotalAmount + element.amount;
                }

                const PostMintCount = await currentToken.balanceOf(adminWallet.address);
                const totalSupply2 = await currentToken.totalSupply();

                expect(parseInt(totalSupply)).to.lessThan(parseInt(totalSupply2));
            });

            it("Mints a presale token from Dapp", async function () {

                const PurchaseArray = [
                    { amount: 50, value: "0" },
                    { amount: 50, value: "0" },
                    { amount: 50, value: "0" },
                    { amount: 50, value: "0" }
                ];

                //Enable Mint Whitelist
                await currentToken.togglePresaleMint();
                await currentToken.togglePresaleMint();

                const totalSupply = await currentToken.totalSupply();

                for (let index = 0; index < PurchaseArray.length; index++) {
                    const element = PurchaseArray[index];
                    await currentToken.whitelistClaimMint(element.amount, 255,
                        whitelistClaimPass[1], { value: ethers.utils.parseEther("0.0") });
                }

                // await currentToken.whitelistClaimMint(
                //     1,
                //     1,
                //     whitelistClaimPass[0]
                //     , { value: ethers.utils.parseEther("0.0") });
                const totalSupply2 = await currentToken.totalSupply();
                expect(parseInt(totalSupply)).to.lessThan(parseInt(totalSupply2));
            });

            if (false) {
                it("Not enough free mints remaining", async function () {

                    await expect(currentToken.whitelistClaimMint(100, 255,
                        whitelistClaimPass[1], { value: ethers.utils.parseEther("0.0") })).to.be.revertedWith("Not enough free mints remaining");
                });
            }

            it("New Signer", async function () {
                const [adminWallet, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20] = await ethers.getSigners();

                let signature = await currentToken.setSignerAddress(adminWallet.address);
            });

            it("Can't Mint with Claim off", async function () {

                //Disable Mint Whitelist
                await currentToken.togglePresaleMint();

                await expect(currentToken.whitelistClaimMint(1, 1,
                    whitelistClaimPass[0]
                    , {
                        value: ethers.utils.parseEther("0.55")
                    })).to.be.revertedWith("Claim Mint Closed");
            });

            it("Can't Mint with Public off", async function () {

                //Disable Mint Whitelist
                await currentToken.togglePublicMint();

                await expect(currentToken.openMint(1,
                    {
                        value: ethers.utils.parseEther("0.55")
                    })).to.be.revertedWith("Public Mint Closed");
            });

            it("Stops Mint of a presale token from Dapp due to Mint quantity can't be greater than claimable", async function () {

                //Enable Mint Whitelist
                //await currentToken.togglePresaleMint();
                await currentToken.togglePresaleMint();

                await expect(currentToken.whitelistClaimMint(2, 1,
                    whitelistClaimPass[0]
                    , {
                        value: ethers.utils.parseEther("0.55")
                    })).to.be.revertedWith("Mint quantity can't be greater than claimable");
            });

            it("Stops Mint of a presale token from Dapp due to invalid Claim Amount", async function () {

                //Enable Mint Whitelist
                //await currentToken.togglePresaleMint();
                // await currentToken.togglePresaleMint();

                await expect(currentToken.whitelistClaimMint(1, 5,
                    whitelistClaimPass[0]
                    , {
                        value: ethers.utils.parseEther("0.55")
                    })).to.be.revertedWith("Invalid Pass");
            });

            it("Stops Mint of a presale token from Dapp due to invalid Pass", async function () {

                //Enable Mint Whitelist
                //await currentToken.togglePresaleMint();
                // await currentToken.togglePresaleMint();

                await expect(currentToken.whitelistClaimMint(1, 5,
                    whitelistClaimPass[1]
                    , {
                        value: ethers.utils.parseEther("0.55")
                    })).to.be.revertedWith("Invalid Pass");
            });

            it("Will not allow mint over threshold", async function () {


                await currentToken.togglePublicMint();

                const PurchaseArray = [
                    { amount: 101, value: "7.07" }
                ];

                const [adminWallet, userWallet] = await ethers.getSigners();

                let signature1 = await adminWallet.signMessage(ethers.utils.arrayify(messageHash1));
                let signature2 = await userWallet.signMessage(ethers.utils.arrayify(messageHash2));
                let messageHash3 = ethers.utils.solidityKeccak256(['string'], [message1]);
                //Step 4: Turn on Sales
                //    const PreMintCount = await currentToken.balanceOf(adminWallet.address)
                //      const totalSupply = await currentToken.totalSupply();

                //  TotalAmount = +PreMintCount;

                for (let index = 0; index < PurchaseArray.length; index++) {
                    const element = PurchaseArray[index];
                    await expect(currentToken.openMint(element.amount, { value: ethers.utils.parseEther(element.value) })).to.be.revertedWith('Mint amount too large');
                    TotalAmount = TotalAmount + element.amount;
                }

                //        const PostMintCount = await currentToken.balanceOf(adminWallet.address)
                //          const totalSupply2 = await currentToken.totalSupply()4

                //            expect(parseInt(totalSupply)).to.lessThan(parseInt(totalSupply2));
            });

            it("Mints free token", async function () {

                const PurchaseArray = [
                    { amount: 1, value: "0.07" },
                    { amount: 2, value: "0.14" },
                    { amount: 100, value: "7" },
                    // { amount: 5, value: "0.35" },
                    // { amount: 10, value: "0.7" },
                    //{ amount: 100, value: "7" }                
                ];

                const [adminWallet, userWallet] = await ethers.getSigners();

                const totalSupply = await currentToken.totalSupply();

                for (let index = 0; index < PurchaseArray.length; index++) {
                    const element = PurchaseArray[index];
                    await currentToken.teamMint(userWallet.address, element.amount);
                    TotalAmount = TotalAmount + element.amount;
                }
                ;
                const totalSupply2 = await currentToken.totalSupply();

                expect(parseInt(totalSupply)).to.lessThan(parseInt(totalSupply2));
            });

            if (false)
                it("Mints remaining tokens from Dapp", async function () {

                    const totalSupply = await currentToken.totalSupply();

                    RemainingMints = 3333 - totalSupply;

                    const [adminWallet, userWallet] = await ethers.getSigners();

                    //Step 4: Turn on Sales
                    const PreMintCount = await currentToken.balanceOf(adminWallet.address)

                    TotalAmount = +PreMintCount;

                    for (let index = 0; index < RemainingMints; index++) {
                        await currentToken.openMint(1, { value: ethers.utils.parseEther("0.05") });
                        TotalAmount = TotalAmount + 1;
                    }

                    const PostMintCount = await currentToken.balanceOf(adminWallet.address);
                    const totalSupply2 = await currentToken.totalSupply();

                    expect(parseInt(totalSupply)).to.lessThan(parseInt(totalSupply2));
                });

            // it("Can't mint over quantity", async function () {

            //     await expect(currentToken.openMint(1, { value: ethers.utils.parseEther("0.05") })).to.be.revertedWith("Not enough tokens remaining");
            // });


            it('Transfer four tokens to destination account', async () => {
                const [adminWallet, userWallet] = await ethers.getSigners();

                const howManyToTransfer = 5;
                const FirstBalance = await currentToken.balanceOf(adminWallet.address);
                const SecondBalance = await currentToken.balanceOf(userWallet.address);

                for (let index = 1; index <= howManyToTransfer; index++) {
                    await currentToken.transferFrom(adminWallet.address, userWallet.address, index);
                }

                // expect(await currentToken.balanceOf(adminWallet.address)).to.eq(FirstBalance - howManyToTransfer);
                // expect(await currentToken.balanceOf(userWallet.address)).to.eq(SecondBalance + howManyToTransfer);
            });

            it('Set reveal address', async () => {
                const hiddenMetadataUri = await currentToken.setHiddenMetadataUri(1);
            });

            it('Will set Base URI and check the first token', async () => {
                const [adminWallet, userWallet] = await ethers.getSigners();

                await currentToken.setBaseURI("ipfs://google.com/");
                await currentToken.setRevealed(true);
                const tokenURI = await currentToken.tokenURI(1);
                expect(tokenURI).to.eq("ipfs://google.com/1.json");
            });

            it("Burn Token", async function () {

                //Enable Mint Whitelist
                await currentToken.togglePresaleMint();

                const [adminWallet, userWallet] = await ethers.getSigners();

                let signature = await adminWallet.signMessage(ethers.utils.arrayify(messageHash1));

                const totalSupply = await currentToken.totalSupply();
                await currentToken.burn(1);
                const totalSupply2 = await currentToken.totalSupply();
                //expect(parseInt(totalSupply)).to.greaterThan(parseInt(totalSupply2));
            });

            it("Set Multiple Parameters", async function () {
                await currentToken.setParams('70000000000000000', '50000000000000000', '20', '5', true, true);
            });

            it("Gets Total Supply", async function () {
                const [adminWallet, userWallet] = await ethers.getSigners();

                const totalSupply = await currentToken.totalSupply();

                expect(parseInt(totalSupply)).to.greaterThan(0);

                console.log("Total Supply: " + parseInt(totalSupply))
            });


            it("Get Money Withdraw", async function () {
                const [owner, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20] = await ethers.getSigners();

                let ethBalance = ethers.utils.formatEther(await ethers.provider.getBalance(owner.address));

                console.log("Pre Withdrawal Balance: " + ethBalance);

                let contractEthBalance = ethers.utils.formatEther(await ethers.provider.getBalance(currentToken.address));
                console.log("Contract Balance: " + contractEthBalance);

                await currentToken.withdraw();

                ethBalance = ethers.utils.formatEther(await ethers.provider.getBalance(owner.address));

                console.log("Final Balance: " + ethBalance);

                contractEthBalance = ethers.utils.formatEther(await ethers.provider.getBalance(currentToken.address));
                console.log("Contract Balance: " + contractEthBalance);
            });
        }
    })
