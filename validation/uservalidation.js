
import Joi from "@hapi/joi";

//const name = Joi.string().max(255).required().label('Name');
const authSchema=Joi.object({
email : Joi.string().email().required(),
username : Joi.string().max(255).min(3).required(),
password : Joi.string().max(30).min(4).required(),
})
