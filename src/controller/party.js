import Party from "../models/party.js";

// Function to get all parties by organization
const getAllPartiesByOrganization = async (req,res) => {
  try {
    // Query the database to get all parties by organization
    const organizationId=req.user.organization;
    console.log({organizationId});
    const parties = await Party.find({ organization: organizationId });
    console.log(parties);
    // Return the parties
    return res.status(200).json({ parties });
  } catch (error) {
    // Handle any errors
    console.error('Error getting parties by organization:');
    throw error;
  }
};

// Export the function
export { getAllPartiesByOrganization };