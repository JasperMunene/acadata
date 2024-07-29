// Import necessary modules
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import xlsx from 'node-xlsx';

// Define the POST handler for the file upload
export const POST = async (req: Request) => {
  try {
    // Parse the incoming form data
    const formData = await req.formData();
    console.log("Form data parsed successfully.");

    // Get the file from the form data
    const file = formData.get("file") as File | null;
    console.log("File retrieved from form data:", file);

    // Check if a file is received
    if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv"
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only Excel and CSV files are allowed." }, { status: 400 });
    }

    console.log("File type validated:", file.type);

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size exceeds 10MB." }, { status: 400 });
    }

    console.log("File size validated:", file.size);

    // Convert the file data to a Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("File converted to buffer.");

    // Replace spaces in the file name with underscores
    let filename = file.name.replace(/ /g, "_");
    console.log("Filename after replacing spaces:", filename);

    // Process the file
    if (file.type !== "text/csv") {
      const workSheets = xlsx.parse(buffer);
      console.log("Excel file parsed successfully.");

      let rows: any[][] = [];
      let writeStr = "";

      // Loop through all sheets
      for (let i = 0; i < workSheets.length; i++) {
        const sheet = workSheets[i];
        // Loop through all rows in the sheet
        for (let j = 0; j < (sheet.data as any[][]).length; j++) {
          // Add the row to the rows array
          rows.push(sheet.data[j]);
        }
      }

      // Create the CSV string to write it to a file
      for (let i = 0; i < rows.length; i++) {
        writeStr += rows[i].join(",") + "\n";
      }

      // Save the CSV data
      filename = filename.replace(/\.[^/.]+$/, ".csv"); // Change the file extension to .csv
      await writeFile(path.join(process.cwd(), "public/assets", filename), writeStr);
      console.log("CSV file saved successfully.");
    } else {
      // If the file is already a CSV, save it directly
      await writeFile(path.join(process.cwd(), "public/assets", filename), buffer);
      console.log("CSV file saved directly.");
    }

    // Return a JSON response with a success message and a 201 status code
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
    console.error("Error occurred:", error);
    return NextResponse.json({ error: "Failed to process the file." }, { status: 500 });
  }
};
