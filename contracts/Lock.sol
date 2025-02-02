// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "hardhat/console.sol";

contract StudentManagement {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the admin");
        _;
    }

    enum Gender{ Male, Female }

    mapping (uint256 => string) name;
    mapping(uint8 => Student) students;

    // Events
    event CreatedStudent(
        string indexed  name,
        string indexed class,
        uint8 indexed age
    );


    struct Student {
        string name;
        uint8 age;
        string class;
        Gender gender;
    }

    uint8 studentId = 0;
    // Student[] allStudents;
    
    modifier validateId (uint8 studentId_) {
        require(studentId_ <= studentId && studentId_ > 0, "Provide a valid student Id");
        _;
    }

    function registerStudent(
        string memory _name,
        uint8 _age,
        string memory _class,
        Gender _gender
    ) external onlyOwner {

        Student memory student = Student({
            name: _name,
            age: _age,
            class: _class,
            gender: _gender
        });

        
        studentId++;
        students[studentId] = student;

        console.log("Student registered with id: %s", studentId);

        emit CreatedStudent(_name, _class, _age);
    }


    function getStudent(uint8 studentId_) public view  returns (Student memory student_) {
        student_ = students[studentId_];
    }

    function getStudents() public view  returns (Student[] memory students_) {
        students_ = new Student[](studentId);

       for (uint8 i = 1; i <= studentId; i++) {
        students_[i - 1] = students[i];
       }

       students_;
    }

    function deleteStudent(uint8 studentId_) public onlyOwner validateId(studentId_) {
        delete students[studentId_];
    }

    function editStudent(
        uint8 studentId_,
        string memory _name,
        uint8 _age,
        string memory _class,
        Gender _gender
        ) public onlyOwner validateId(studentId_) {
            students[studentId_] = Student({ 
                name: _name,
                age: _age,
                class: _class,
                gender: _gender
             });
    }

    
}
