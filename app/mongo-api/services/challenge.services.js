const httpStatus = require("http-status");
const Challenge = require("../models/challenge.model");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");

/**
 * Create a challenge
 * @param {Object} challengeBody
 * @returns {Promise<Challenge>}
 */
const createChallenge = async (challengeBody, ID) => {
  const data = 
  {
    name: challengeBody.name,
    creator: ID,
    tags: challengeBody.tags,
    description: challengeBody.description,
    summary: challengeBody.summary,
    location: challengeBody.location,
    timestamp: challengeBody.timestamp,
    start_date: challengeBody.start_date,
    end_date: challengeBody.end_date,
    //participants: challengeBody.participants
  };
  const creator = await User.findOne({ _id: ID });
  console.log(ID);
  console.log(creator);
 
  return Challenge.create(data);

  //return Challenge.create(challengeBody);
};

/**
 * Query for challenges
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryChallenges = async (filter, options) => {
  const challenges = await Challenge.paginate(filter, options);
  return challenges;
};

/**
 * Get challenge by id
 * @param {string} Id
 * @returns {Promise<Challenge>}
 */
const getChallengeById = async (challengeId) => {
  
  
  return Challenge.findOne({ _id: challengeId });


};

/**
 * Get challenge by challenge name
 * @param {string} name
 * @returns {Promise<Challenge>}
 */
const getChallengeByName = async (name) => {
  return Challenge.findOne({ name });
};

/**
 * Update challenge by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Challenge>}
 */
const updateChallengeById = async (id, updateBody) => {
  const challenge = await getChallengeById({ _id: id });
  if (!challenge) {
    throw new ApiError(httpStatus.NOT_FOUND, "Challenge not found");
  }
  if (
    updateBody.email &&
    (await Challenge.isEmailTaken(updateBody.email, id))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    Object.assign(challenge, updateBody);
    await challenge.save();
    return challenge;
  }
};

/**
 * Delete challenge by id
 * @param {ObjectId} Id
 * @returns {Promise<Challenge>}
 */
const deleteChallengeById = async (id) => {
  const challenge = await getChallengeById({ _id: id });
  if (!challenge) {
    throw new ApiError(httpStatus.NOT_FOUND, "Challenge not found");
  }
  await challenge.remove();
  return challenge;
};

/**
 * Filter challenges with start date > today
 * and end date < today
 * @param {ObjectStart} Start
 * @returns {Promise<Challenge>}
 */
const activeChallenges = async () => {
  const timeElasped = Date.now();
  const today = new Date(timeElasped);
  rn = today.toISOString();
  const challenges = await Challenge.find(
    { end_date: { $gte: rn } } && { start_date: { $lte: rn } }
  );
  return challenges;
};

const pastChallenges = async () => {
  const timeElasped = Date.now();
  const today = new Date(timeElasped);
  rn = today.toISOString();
  const challenges = await Challenge.find({ end_date: { $lte: rn } });
  return challenges;
};

const allChallenges = async () => {
  const timeElasped = Date.now();
  const today = new Date(timeElasped);
  rn = today.toISOString();
  const challenges = await Challenge.find({} || { end_date: { $gte: rn } });
  return challenges;
};

/**
 * Filter challenges with start date > today
 * and end date < today
 * @param {ObjectStart} Start
 * @returns {Promise<Challenge>}
 */

module.exports = {
  createChallenge,
  queryChallenges,
  getChallengeById,
  getChallengeByName,
  updateChallengeById,
  deleteChallengeById,
  activeChallenges,
  pastChallenges,
  allChallenges,
};
