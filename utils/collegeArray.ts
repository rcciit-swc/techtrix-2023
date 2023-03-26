import college from "../public/college.json";

const collegeArr = Object.values(college).map((entry) => entry["College Name"]);

export default collegeArr;
