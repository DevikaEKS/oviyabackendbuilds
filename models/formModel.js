const db = require('../config/db');

// Create a function to insert form data
const createForm = async (formData) => {
  try {
    const { name, designation, organization, email, phone_number, message, form_id } = formData;
    
    // Determine form_id based on form_type
    

    // SQL query to insert form data into the oviya_form table
    const query = `INSERT INTO oviya_form (name, designation, organization, email, phone_number, message, form_id)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

    // Execute the query using the promise pool
    const [rows] = await db.query(query, [name, designation, organization, email, phone_number, message, form_id]);

    return rows;
  } catch (error) {
    throw new Error('Error inserting form data: ' + error.message);
  }
};


// Fetch all forms
const getAllForms = async () => {
  try {
    const query = `SELECT id,name,designation,organization,email,phone_number,message,timestamp FROM oviya_form where form_id=1`;
    const [rows] = await db.query(query);
    return rows;
  } catch (error) {
    throw new Error('Error fetching forms: ' + error.message);
  }
};
const getAllFormsdownload = async () => {
  try {
    const query = `SELECT id,name,designation,organization,email,phone_number,timestamp FROM oviya_form where form_id=2`;
    const [rows] = await db.query(query);
    return rows;
  } catch (error) {
    throw new Error('Error fetching forms: ' + error.message);
  }
};
// Fetch a form by ID
const getFormById = async (id) => {
  try {
    const query = `SELECT * FROM oviya_form WHERE id = ?`;
    const [rows] = await db.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw new Error('Error fetching form by ID: ' + error.message);
  }
};

module.exports = { createForm, getAllForms, getFormById,getAllFormsdownload };



