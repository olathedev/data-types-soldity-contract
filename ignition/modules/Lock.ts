// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const studentManagementModule = buildModule("StudentManagementModule", (m) => { 
  const studentManagement = m.contract("StudentManagement")

  return { studentManagement }
})

export default studentManagementModule;
