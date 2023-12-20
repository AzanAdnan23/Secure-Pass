// sample testing code

async function main() {
  const DContract = await ethers.getContractFactory("SecurePass");

  const dContract = DContract.attach(
    "0xA4223a37a33BF51A2368A9621aD5d3ADa7A9365D"
  );

  //let amount = ethers.utils.parseEther("61000");
  let tx1 = await dContract.isTicketValid(4,1001);

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
