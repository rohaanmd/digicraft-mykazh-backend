const Team = require('../models/teams');


const getAllTeams = async (req, res, next) => {
    const team = await Team.find({})
        .populate("createdBy")
    if (!team)
        return res.send({
            success: false,
            message: "team not found",
        });

    return res.send({
        success: true,
        message: " team Found successfull",
        responseData: team,
    });
};

const createTeam = async (req, res, next) => {
    try {
        const teamDetails = req.body
        const team = new Team(teamDetails, (err) => {
            if (err)
                return res.send({
                    success: false,
                    message: "Request not found",
                    responseData: err,
                });
        });
        
  
        await team.save();
        
        return res.send({
            success: true,
            message: "team successfully created",
            responseData: {
                team,
            }
        });
    } catch (err) {
        return res.send({
            success: false,
            message: "something wrong happend",
            responseData: err,
        });
    }
}
const deleteTeamById = async (req, res, next) => {
    const team = await Team.findByIdAndDelete(req.params.teamsId)
    if (team)
        return res.send({
            success: true,
            message: "team Delete Successfully",
            responseData: team,
        });
    else
        return res.send({
            success: false,
            message: "team not found",
        });
};

const updateTeam = async (req, res, next) => {
    try {
        const team = await Team.findById(req.params.teamsId)
       
        
            if (!team) {
                return res.send({
                    success: false,
                    message: "Team not found",
                });
            }


            const teamDetails = req.body

            const GetTeam = await Team.findOneAndUpdate({
                _id: req.params.teamsId
            }, teamDetails)
if(GetTeam)
            return res.send({
                success: true,
                message: "team Updated Successfull",
                responseData: GetTeam,
            });
else{
    return res.send({
        success: true,
        message: "team Update fail",
        responseData: GetTeam,
    });
}
     

    } catch (error) {
        console.log(error);
        return res.send({
            success: false,
            message: "something wrong happened",
            responseData: error,
        });
    }
};


module.exports = {
    deleteTeamById,
    createTeam,
    updateTeam,
    getAllTeams
}