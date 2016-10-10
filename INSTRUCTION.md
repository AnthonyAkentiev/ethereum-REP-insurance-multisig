# How to 

## Step 1 - Find the Augur contract address

PartyB should have REP tokens held by Augur contract.
The official Augur contract address is [0x48c80F1f4D53D5951e5D5438B54Cba84f29F32a5](https://etherscan.io/address/0x48c80F1f4D53D5951e5D5438B54Cba84f29F32a5).

## Step 2 - Prepare PartyA, PartyB, Arbiter addresses

**PartyA** is who sends the ETH.
**PartyB** is who sends REP tokens.
**Arbiter** is the third party. Please use Anthony Akentiev address **0xbD997Cd2513c5f031b889d968de071eeaFE07130**.

## Step 3 - Prepare 3 Rescuers addresses

**Rescuers** allow anything in the contract to be recovered in the event that something unforseen (like code bug) happens. Requires at least 2 (out of 3) signatures in order to return back ETH and tokens.

**Rescuer1** - please use Anthony Akentiev address - **0xbD997Cd2513c5f031b889d968de071eeaFE07130**.
**Rescuer2** - please use Joshua Davis address - **TODO**.
**Rescuer3** - please use Piper Merriam address - **TODO**.

## Step 4 - Start your Etherum Wallet

1. Go to **Contracts**:
[![1.jpg](https://s18.postimg.org/a7o3avn1l/image.jpg)](https://postimg.org/image/gld6e4rxh/)
2. Click on **Deploy New Contract**:
[![2.jpg](https://s21.postimg.org/h5rp42ibb/image.jpg)](https://postimg.org/image/kcm8np2r7/)

## Step 5 - 




For each "escrow" operation:

1. Deploy MultiSig.sol contract. 
     For example - lets set **ethDepositMinimum = 0.5** and **tokenDepositMinimum = 100**
2. User1 should send 0.5 Eth to contract by calling **depositEther** function.
3. User2 should call **depositToken** function. This will transfer his 100 REP tokens to current contract.
4. Arbiter should call **lock** function.
5. Wait until 
