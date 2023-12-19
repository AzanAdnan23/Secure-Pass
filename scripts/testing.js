// sample testing code

async function main() {
  const DContract = await ethers.getContractFactory("SecurePass");

  const dContract = DContract.attach(
    "0x304E99B1dc69431878A3cec83320445d08aEE7f5"
  );

  let amount = ethers.utils.parseEther("61000");
  let tx1 = await dContract.buyTicket(1001, { value: amount });

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
