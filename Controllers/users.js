import User from "../models/User.js";

//---------------------READ -------------------
export const getUser = async (req, res) => {
  try {
    console.log("here")
    const { id } = req.query;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user=await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//--------------------UPDATE--------------------

export const addRemovefriend = async (req, res) => {
  console.log("Add user")
  try {
    const { id, friendId } = req.body ;
    console.log("id",id)
    console.log("friendid",friendId)
    // console.log(req.query)
    const user = await User.findById(id);
    console.log("user",user)
    const friend = await User.findById(friendId);
    console.log("friend",friend)

    if (user.friends.includes(friendId)) {

      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
      const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
          return { _id, firstName, lastName, occupation, location, picturePath };
        }
      );

     res.status(200).json(); 
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
