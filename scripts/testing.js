// sample testing code

async function main() {
    const DContract = await ethers.getContractFactory("SecurePass");
  
    const dContract = DContract.attach(
      "0x663eF3A502A5C3c20A789859a4d490f089833bD3"
    );
  
    // let amount = ethers.utils.parseEther('5');
     let tx1= await dContract.buyTicket(1001);
    console.log(tx1);
  
  
 //   console.log(ethers.utils.formatEther(tx));
 //   console.log(typeof tx);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  