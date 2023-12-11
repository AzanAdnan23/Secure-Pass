async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Scontract = await ethers.deployContract("SecurePass");

  await Scontract.waitForDeployment();

  console.log("Contract address:", Scontract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
