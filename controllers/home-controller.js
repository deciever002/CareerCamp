const Student = require("../models/student");
const { Parser } = require("json2csv");

module.exports.home = function (req, res) {
  //Render the home page
  res.render("home", {
    title: "Home",
  });
};

module.exports.downloadResults = function (req, res) {
  // Download function to download the result in csv format
  const downloadCSV = async () => {
    try {
      // Fetch the data from the model and populate necessary fields required for csv data
      let data = await Student.find({})
        .populate("interviews")
        .populate({
          path: "results",
          populate: {
            path: "interview",
          },
        })
        .populate("courseScores");

      //If the data is empty i.e. if there are no students then prompt the user with error message and return to home page
      if (data.length == 0) {
        req.flash(
          "error",
          "Please add atleast one student to download the results"
        );
        return res.redirect("back");
      }

      //Filtering the data with required data
      let result = [];
      for (let studentData of data) {
        let student = {};
        student["Student Id"] = studentData.id;
        student["Student Name"] = studentData.name;
        student["Student College"] = studentData.college;
        student["Student Status"] = studentData.status;
        student["DSA Score"] = studentData.courseScores.dsaScore;
        student["WebD Final Score"] = studentData.courseScores.webDScore;
        student["React Final Score"] = studentData.courseScores.reactScore;
        if (studentData.interviews.length > 0) {
          for (let resultData of studentData.results) {
            let newStudent = { ...student };
            newStudent["Interview Date"] = resultData.interview.date;
            newStudent["Interview Company"] = resultData.interview.companyName;
            newStudent["Interview Student Result"] = resultData.status;
            result.push(newStudent);
          }
        } else {
          student["Interview Date"] = "No Interviews";
          student["Interview Company"] = "No Interviews";
          student["Interview Student Result"] = "No Interviews";
          result.push(student);
        }
      }

      //Define the fields you want to include in the CSV
      const fields = [
        "Student Id",
        "Student Name",
        "Student College",
        "Student Status",
        "DSA Score",
        "WebD Final Score",
        "React Final Score",
        "Interview Date",
        "Interview Company",
        "Interview Student Result",
      ];

      // Create the JSON to CSV parser
      const json2csvParser = new Parser({ fields });

      // Convert the data to CSV
      const csv = json2csvParser.parse(result);

      // Set the response headers for file download
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=data.csv");

      // Send the CSV data as the response
      return res.send(csv);

    } catch (error) {
      //Incase there is an error while parsing the data
      console.error("Error:", error);
    }
  };

  //call the function to download the data as csv file
  downloadCSV();
};
