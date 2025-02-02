import { ethers } from "hardhat";
import { StudentManagement } from "../typechain-types";

async function main() {
  // Get the deployed contract instance
  const contractFactory = await ethers.getContractFactory("StudentManagement");
  const contract = (await contractFactory.attach(
    "DEPLOYED_CONTRACT_ADDRESS"
  )) as StudentManagement;

  // Get the signer (owner of the contract)
  const [owner] = await ethers.getSigners();

  console.log("Interacting with the StudentManagement contract...");

  // function 1: Register a new student
  console.log("Registering a new student...");
  const tx1 = await contract.connect(owner).registerStudent(
    "Alice",
    20,
    "Class A",
    0 // Gender.Male = 0, Gender.Female = 1
  );
  await tx1.wait();
  console.log("Student registered successfully.");

  // function 2: Get a student by ID
  console.log("Retrieving student with ID 1...");
  const studentId = 1;
  const student = await contract.getStudent(studentId);
  console.log(`Student Details: Name=${student.name}, Age=${student.age}, Class=${student.class}, Gender=${student.gender}`);

  // Example 3: Get all students
  console.log("Retrieving all students...");
  const allStudents = await contract.getStudents();
  console.log("All Students:");
  allStudents.forEach((s, index) => {
    console.log(
      `Student ${index + 1}: Name=${s.name}, Age=${s.age}, Class=${s.class}, Gender=${s.gender}`
    );
  });

  // function 4: Edit a student's details
  console.log("Editing student with ID 1...");
  const tx2 = await contract.connect(owner).editStudent(
    1,
    "Alice Updated",
    21,
    "Class B",
    1 // Gender.Female = 1
  );
  await tx2.wait();
  console.log("Student details updated successfully.");

  // function 5: Get the updated student details
  console.log("Retrieving updated student with ID 1...");
  const updatedStudent = await contract.getStudent(1);
  console.log(`Updated Student Details: Name=${updatedStudent.name}, Age=${updatedStudent.age}, Class=${updatedStudent.class}, Gender=${updatedStudent.gender}`);

  // function 6: Delete a student
  console.log("Deleting student with ID 1...");
  const tx3 = await contract.connect(owner).deleteStudent(1);
  await tx3.wait();
  console.log("Student deleted successfully.");

//   Verify deletion
  console.log("Verifying deletion of student with ID 1...");
  try {
    const deletedStudent = await contract.getStudent(1);
    if (deletedStudent.name === "") {
      console.log("Student with ID 1 has been deleted.");
    } else {
      console.log("Deletion failed. Student still exists.");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error while retrieving deleted student:", error.message);
    } else {
      console.log("Unknown error occurred.");
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });